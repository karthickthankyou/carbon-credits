import { Contract } from 'web3-eth-contract'

export type ActionType<T = string> = {
  contract: Contract
  account: string
  payload: T
}

export type CreateProjectPayload = {
  name: string
  price: number
}

export async function createProject({
  contract,
  account,
  payload,
}: ActionType<CreateProjectPayload>): Promise<void> {
  try {
    // Check if the project exists using call
    const project = await contract.methods.projects(payload.name).call()

    // Check the length of the project name to verify its existence
    if (project.name) {
      alert('Project already exists!')
      return
    }

    // If the project doesn't exist, then create it using send
    await contract.methods
      .createProject(payload.name, payload.price)
      .send({ from: account })
  } catch (error) {
    console.error(error)
  }
}
