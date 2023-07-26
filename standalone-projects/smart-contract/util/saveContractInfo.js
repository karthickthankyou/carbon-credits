const fs = require('fs')
const path = require('path')

module.exports.saveContractInfo = (address, abi) => {
  fs.writeFileSync(
    path.join(__dirname, '../contractInfo.json'),
    JSON.stringify(
      {
        contractAddress: address,
        abi: abi,
      },
      null,
      2,
    ),
  )
}
