const { ethers, upgrades, artifacts } = require('hardhat')
const { contractAddress } = require('../contractAddress.json')
const { saveContractInfo } = require('../util/saveContractInfo')

async function upgrade() {
  const [deployer] = await ethers.getSigners()
  console.log('Upgrading CarbonCredits with account:', deployer.address)

  const CarbonCredits = await ethers.getContractFactory('CarbonCredits')
  const carbonCredits = await upgrades.upgradeProxy(
    contractAddress,
    CarbonCredits,
  )
  console.log('CarbonCredits upgraded at:', carbonCredits.address)
  const ContractArtifact = await artifacts.readArtifact('SustainabilityProject')
  saveContractInfo(carbonCredits.address, ContractArtifact.abi)
}

upgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
