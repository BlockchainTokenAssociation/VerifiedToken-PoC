import UIkit from './../node_modules/uikit/dist/js/uikit.min'

let localWeb3
let registry, controller, token

const INFURA_TOKEN = ""

const registryABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "keys",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "registry",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "RecordUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "registry",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "AddressDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_receiver",
        "type": "address"
      },
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "bytes32"
      }
    ],
    "name": "updateRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "deleteAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_receiver",
        "type": "address"
      },
      {
        "name": "_key",
        "type": "bytes32"
      },
      {
        "name": "_value",
        "type": "bytes32"
      }
    ],
    "name": "findAddress",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "isExist",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "getAddressPairs",
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
const controllerABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registries",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_registries",
        "type": "address[]"
      },
      {
        "name": "_confirmationsRequired",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "confirmations",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "RequiredConfirmationsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "value",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "RequiredDataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "registries",
        "type": "address[]"
      },
      {
        "indexed": false,
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "name": "AcceptedRegistriesUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_registries",
        "type": "address[]"
      }
    ],
    "name": "updateRegistries",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_confirmationsRequired",
        "type": "uint256"
      }
    ],
    "name": "updateRequiredConfirmations",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_keys",
        "type": "bytes32[]"
      },
      {
        "name": "_values",
        "type": "bytes32[]"
      }
    ],
    "name": "updateRequiredData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "isVerified",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "isContract",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNumberOfConfirmationsRequired",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getRequiredData",
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getRegistries",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
const tokenABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseApproval",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseApproval",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_controller",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const registryContract = '0x2b3c48eA74374380eDF3F5ee0199154B30DbfBc8'
const controllerContract = '0xCbA69FC3B63e009e2a6E86A1108C86d61828c923'
const tokenContract = '0xdb879f2fb7444321b592f679d5123E867b838d33'

document.getElementById("verify").addEventListener("click", verify)
document.getElementById("registries").addEventListener("click", registries)
document.getElementById("confirmations").addEventListener("click", confirmations)
document.getElementById("requirements").addEventListener("click", requirements)

window.onload = main()

async function main() {
  await init()

  registry = await deploy(registryABI, registryContract)
  controller = await deploy(controllerABI, controllerContract)
  token = await deploy(tokenABI, tokenContract)

  UIkit.notification('Blockchain connected.')
}

function init() {
  const Web3 = require('web3')

  if (typeof(window.web3) === "undefined") {
    UIkit.notification('No Web3 provider found. Connecting to Ropsten testnet.')
    localWeb3 = new Web3('https://kovan.infura.io/' + INFURA_TOKEN)
  } else {
    UIkit.notification('Web3 initialized.')
    localWeb3 = new Web3(window.web3.currentProvider)
  }
}

function deploy(abi, address) {
  return new localWeb3.eth.Contract(abi, address)
}

async function verify() {
  let address = await document.querySelector('#addressToCheck').value
  let result = await controller.methods.isVerified(address).call()
  if (result === true)
    UIkit.notification({message: 'Verified', status: 'default'})
  else
    UIkit.notification({message: 'Not verified', status: 'warning'})
}

async function registries() {
  let result = await controller.methods.getRegistries().call()
  for( let i = 0; i < result.length; i++) {
    UIkit.notification({message: result[i], timeout: 7000});
  }
}

async function confirmations() {
  let result = await controller.methods.getNumberOfConfirmationsRequired().call()
  UIkit.notification("Confirmations needed: " + result);
}

async function requirements() {
  let result = await controller.methods.getRequiredData().call()
  console.log("result: " + result);
  let pairs = []

  for (let i = 0; i < result[0].length; i++) {
    let pair = {
      key:  result[0][i],
      value: result[1][i],
    }
    UIkit.notification(localWeb3.utils.hexToAscii(pair.key) + " => " + localWeb3.utils.hexToAscii(pair.value))
  }
}




