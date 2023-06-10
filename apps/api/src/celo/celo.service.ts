import { Injectable } from '@nestjs/common'
import Web3 from 'web3'
import * as dotenv from 'dotenv'
import { abi, contractAddress } from 'src/util/celo'
import { AbiItem } from 'web3-utils'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { MeilisearchService } from 'src/meilisearch/meilisearch.service'
import { intToCoords } from 'src/util'
dotenv.config()

@Injectable()
export class CeloService {
  private readonly web3: Web3
  private readonly contract: any

  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeilisearchService,
  ) {
    console.log('WSS_URL ', process.env.WSS_CELO)
    this.web3 = new Web3(process.env.WSS_CELO)

    this.contract = new this.web3.eth.Contract(
      abi as AbiItem[],
      contractAddress,
    )

    this.testConnection()
    this.initializeListeners()
  }

  async isOwner(address: string): Promise<boolean> {
    const contractOwner = await this.contract?.methods.owner().call()
    return address === contractOwner
  }

  private async testConnection() {
    console.log('testConnection ')
    try {
      const blockNumber = await this.web3.eth.getBlockNumber()
      console.log('blockNumber ', blockNumber)
      console.log('Connected to blockchain, latest block number:', blockNumber)
    } catch (err) {
      console.log('failed?')
      console.error('Failed to connect to blockchain:', err)
    }
  }

  private initializeListeners() {
    this.contract.events
      .ProjectCreated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { owner, projectId, name, lat, lng } = event.returnValues
          const project = await this.prisma.project.create({
            data: {
              id: +projectId,
              name,
              owner,
              lat: intToCoords(+lat),
              lng: intToCoords(+lng),
            },
          })

          await this.meili.addToIndex([{ id: project.id, name }])
          console.log(event)
        },
      )
      .on('connected', (str) =>
        console.log('📒 ProjectCreated listening...', str),
      )

    this.contract.events
      .VerifierAdded(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { verifier } = event.returnValues
          const newVerifier = await this.prisma.verifier.create({
            data: {
              address: verifier,
            },
          })

          console.log('newVerifier', newVerifier)
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ VerifierAdded listening...', str),
      )

    this.contract.events
      .ProjectVerified(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { projectId, verifier } = event.returnValues
          await this.prisma.project.update({
            where: { id: +projectId },
            data: {
              verifiers: {
                connectOrCreate: {
                  create: { address: verifier },
                  where: { address: verifier },
                },
              },
            },
          })
          console.log(event)
        },
      )
      .on('connected', (str) =>
        console.log('✅ ProjectVerified listening...', str),
      )

    this.contract.events
      .CreditsAdded(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { projectId, owner, quantity } = event.returnValues
          const inventoryUpdate = await this.prisma.inventory.update({
            where: { user_projectId: { projectId, user: owner } },
            data: { balance: { increment: quantity } },
          })
          console.log('CreditsAdded ', inventoryUpdate)
        },
      )
      .on('connected', (str) =>
        console.log('🤑 CreditsAdded listening...', str),
      )

    this.contract.events
      .CreditsTransferred(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (error) {
            console.error('Error on CreditsTransferred event', error)
            return
          }
          const { projectId, from, to, quantity } = event.returnValues
          const block = await this.web3.eth.getBlock(event.blockNumber)
          const timestamp = block.timestamp
          const transfer = await this.prisma.transfer.create({
            data: {
              from,
              quantity,
              timestamp: new Date(timestamp),
              to,
              projectId,
            },
          })
          console.log('Retirement created: ', transfer)
        },
      )
      .on('connected', () => console.log('💌 CreditsTransferred listening...'))

    this.contract.events
      .CreditsRetired(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (error) {
            console.error('Error on CreditsRetired event', error)
            return
          }
          const { projectId, retiree, quantity } = event.returnValues
          const block = await this.web3.eth.getBlock(event.blockNumber)
          const timestamp = block.timestamp
          const retired = await this.prisma.retirement.create({
            data: {
              quantity,
              retiree,
              projectId,
              timestamp: new Date(timestamp),
            },
          })
          console.log('Retirement created: ', retired)
        },
      )
      .on('connected', () => console.log('👴 CreditsRetired listening...'))

    this.contract.events
      .InventoryUpdated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (error) {
            console.error('Error on InventoryUpdated event', error)
            return
          }
          const { projectId, user, price, balance, forSale } =
            event.returnValues
          const inventoryUpdated = await this.prisma.inventory.upsert({
            create: { balance, forSale, price, user, projectId },
            update: { balance, forSale, price },
            where: { user_projectId: { projectId, user } },
          })

          console.log('inventoryUpdated ', inventoryUpdated)
        },
      )
      .on('connected', () => console.log('⚙️ InventoryUpdated listening...'))
  }
}
