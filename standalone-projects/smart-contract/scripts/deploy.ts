const { ethers, upgrades, artifacts } = require('hardhat')
const { saveContractInfo } = require('../util/saveContractInfo')
const fs = require('fs')
const path = require('path')

const deploy = async () => {
  const CarbonCredits = await ethers.getContractFactory('CarbonCredits')
  console.log('Deploying CarbonCredits...')
  const carbonCredits = await upgrades.deployProxy(CarbonCredits, [])
  console.log('CarbonCredits deployed to:', carbonCredits.address)

  const ContractArtifact = await artifacts.readArtifact('SustainabilityProject')

  saveContractInfo(carbonCredits.address, ContractArtifact.abi)
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
