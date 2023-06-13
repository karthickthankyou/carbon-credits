import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'

export type ActionType<T = string> = {
  contract: Contract
  account: string
  payload: T
}

export type CreateProjectPayload = {
  name: string
  about: string
  images: string[]
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
  payload: { name, lat, lng, about, images },
}: ActionType<CreateProjectPayload>): Promise<boolean> {
  try {
    const result = await contract.methods
      .createProject(name, about, images, lat, lng)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function addVerifier({
  contract,
  account,
  payload: { walletAddress, name, imageUrl },
}: ActionType<{
  walletAddress: string
  name: string
  imageUrl: string
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .addVerifier(walletAddress, name, imageUrl)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function addCredits({
  contract,
  account,
  payload: { projectId, quantity, price },
}: ActionType<{
  projectId: number
  quantity: number
  price: number
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .addCredits(projectId, quantity, price)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function verifyProject({
  contract,
  account,
  payload: { projectId },
}: ActionType<{ projectId: number }>): Promise<boolean> {
  try {
    const result = await contract.methods
      .verifyProject(projectId)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function buyCredits({
  contract,
  account,
  payload: { projectId, quantity, price },
}: ActionType<BuyCreditsPayload>): Promise<boolean> {
  try {
    const totalCost = Web3.utils.toWei((quantity * price).toString(), 'kwei')

    const result = await contract.methods
      .buyCredits(projectId, account, quantity)
      .send({ from: account, value: totalCost })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}
