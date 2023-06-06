const { ethers, upgrades } = require('hardhat')
const fs = require('fs')
const path = require('path')

const deploy = async () => {
  const CarbonCredits = await ethers.getContractFactory('CarbonCredits')
  console.log('Deploying CarbonCredits...')
  const carbonCredits = await upgrades.deployProxy(CarbonCredits, [])
  console.log('CarbonCredits deployed to:', carbonCredits.address)

  fs.writeFileSync(
    path.join(__dirname, '../contractAddress.json'),
    JSON.stringify({ contractAddress: carbonCredits.address }, null, 2),
  )
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
