import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import contractAddressJson from '../../standalone-projects/smart-contract/contractAddress.json'
import abiJson from '../../standalone-projects/smart-contract/artifacts/contracts/CarbonCredits.sol/CarbonCredits.json'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

// Replace with your contract's deployed address

export const useAccount = () => {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState<Contract | null>()
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {
    if (window?.ethereum) {
      window.web3 = new Web3(window.ethereum as any)
      try {
        // Request account access if needed
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xAEF3', // Chain ID for Celo Alfajores in hexadecimal
              chainName: 'Celo Alfajores Testnet',
              nativeCurrency: {
                name: 'CELO',
                symbol: 'CELO',
                decimals: 18,
              },
              rpcUrls: ['https://alfajores-forno.celo-testnet.org'], // RPC URL for Celo Alfajores
            },
          ],
        })
      } catch (error) {
        console.error('User denied account access')
      }
    } else if (window?.web3) {
      window.web3 = new Web3(window?.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window?.web3
    const accounts = await web3?.eth.getAccounts()
    setAccount(accounts[0])

    // Create a new instance of the contract
    const contract = new web3.eth.Contract(
      abiJson.abi,
      contractAddressJson.contractAddress,
    )
    setContract(contract)

    // Check if the user is the owner of the contract
    const contractOwner = await contract?.methods.owner().call()
    setIsOwner(accounts[0] === contractOwner)
  }

  return { account, contract, isOwner }
}
