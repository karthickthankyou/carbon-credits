import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('@openzeppelin/hardhat-upgrades')

require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'alfajores',
  networks: {
    alfajores: {
      url: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_KEY}`,
      //   url: `https://alien-green-needle.matic-testnet.discover.quiknode.pro/${process.env.QUICKNODE_KEY}/`,
      //   url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
}

export default config
