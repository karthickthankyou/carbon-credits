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
          const { owner, projectId, name, latitude, longitude, price } =
            event.returnValues
          const project = await this.prisma.project.create({
            data: {
              balance: 0,
              id: +projectId,
              name,
              owner,
              price: +price,
              lat: intToCoords(+latitude),
              lng: intToCoords(+longitude),
            },
          })

          await this.meili.addToIndex([{ id: project.id, name }])
          console.log(event)
        },
      )
      .on('connected', (str) => console.log('ProjectCreated listening...', str))

    this.contract.events
      .ProjectVerified(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log(event)
        },
      )
      .on('connected', (str) =>
        console.log('ProjectVerified listening...', str),
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
          console.log(event)
        },
      )
      .on('connected', () => console.log('CreditsTransferred listening...'))

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
          console.log(event)
        },
      )
      .on('connected', () => console.log('CreditsRetired listening...'))

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
          console.log(event)
        },
      )
      .on('connected', () => console.log('InventoryUpdated listening...'))
  }
}
