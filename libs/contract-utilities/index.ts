import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'

export type ActionType<T = string> = {
  contract: Contract
  account: string
  payload: T
}

export type CreateProjectPayload = {
  name: string
  lat: number
  lng: number
}

export type BuyCreditsPayload = {
  projectId: number
  quantity: number
  price: number
}

export async function createProject({
  contract,
  account,
  payload: { name, lat, lng },
}: ActionType<CreateProjectPayload>): Promise<void> {
  try {
    console.log({ name, lat, lng })
    await contract.methods
      .createProject(account, name, lat, lng)
      .send({ from: account })
  } catch (error) {
    console.error(error)
  }
}

export async function addVerifier({
  contract,
  account,
  payload: { verifier },
}: ActionType<{ verifier: string }>): Promise<void> {
  try {
    console.log({ verifier })
    await contract.methods.addVerifier(verifier).send({ from: account })
  } catch (error) {
    console.error(error)
  }
}

export async function buyCredits({
  contract,
  account,
  payload: { projectId, quantity, price },
}: ActionType<BuyCreditsPayload>): Promise<void> {
  try {
    const totalCost = Web3.utils.toWei((quantity * price).toString(), 'kwei')

    console.log({ projectId, account, quantity })
    await contract.methods
      .buyCredits(projectId, account, quantity)
      .send({ from: account, value: totalCost })
  } catch (error) {
    console.error(error)
  }
}
