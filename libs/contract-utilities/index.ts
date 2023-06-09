import { Contract } from 'web3-eth-contract'

export type ActionType<T = string> = {
  contract: Contract
  account: string
  payload: T
}

export type CreateProjectPayload = {
  name: string
  price: number
  latitude: number
  longitude: number
}

export async function createProject({
  contract,
  account,
  payload: { name, price, latitude, longitude },
}: ActionType<CreateProjectPayload>): Promise<void> {
  try {
    console.log({ name, price, latitude, longitude })
    await contract.methods
      .createProject(name, price, latitude, longitude)
      .send({ from: account })
  } catch (error) {
    console.error(error)
  }
}
