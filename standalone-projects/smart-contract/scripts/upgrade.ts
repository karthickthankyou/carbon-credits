const { ethers, upgrades } = require('hardhat')
const { contractAddress } = require('../contractAddress.json')

async function upgrade() {
  const [deployer] = await ethers.getSigners()
  console.log('Upgrading CarbonCredits with account:', deployer.address)

  const CarbonCredits = await ethers.getContractFactory('CarbonCredits')
  const carbonCredits = await upgrades.upgradeProxy(
    contractAddress,
    CarbonCredits,
  )
  console.log('CarbonCredits upgraded at:', carbonCredits.address)
}

upgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
