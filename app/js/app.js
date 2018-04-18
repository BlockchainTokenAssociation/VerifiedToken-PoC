import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

require('dotenv').config();

const Web3 = require('web3');
const testnet = 'https://kovan.infura.io/${process.env.INFURA_ACCESS_TOKEN}';
let localWeb3 = new Web3(web3.currentProvider);
localWeb3.eth.defaultAccount = process.env.WALLET_ADDRESS;

let registry, controller, token;

const registryABI = [{"constant":true,"inputs":[{"name":"_receiver","type":"address"},{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"findAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"keys","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"}],"name":"deleteAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"isExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"updateRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registry","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"key","type":"bytes32"},{"indexed":false,"name":"value","type":"bytes32"},{"indexed":false,"name":"updatedAt","type":"uint256"}],"name":"RecordUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registry","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"updatedAt","type":"uint256"}],"name":"AddressDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
const controllerABI = [{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"isContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registries","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"informationRequired","outputs":[{"name":"key","type":"bytes32"},{"name":"value","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_keys","type":"bytes32[]"},{"name":"_values","type":"bytes32[]"}],"name":"updateRequiredData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_confirmationsRequired","type":"uint256"}],"name":"updateRequiredConfirmations","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_registries","type":"address[]"}],"name":"updateRegistries","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_receiver","type":"address"}],"name":"isVerified","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_registries","type":"address[]"},{"name":"_confirmationsRequired","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"confirmations","type":"uint256"},{"indexed":false,"name":"updatedAt","type":"uint256"}],"name":"RequiredConfirmationsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"key","type":"bytes32"},{"indexed":true,"name":"value","type":"bytes32"},{"indexed":false,"name":"updatedAt","type":"uint256"}],"name":"RequiredDataUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"registries","type":"address[]"},{"indexed":false,"name":"updatedAt","type":"uint256"}],"name":"AcceptedRegistriesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
const tokenABI = [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

const registryContract = '0xaFFC460463B1e18846D4CEf0ED4AB65420A82C48';
const controllerContract = '0x2E4bbea265835442724ab04B686fEdc2b22C7c67';
const tokenContract = '0x4ed5AFcbE003F4DB3f9778ba3D52469f2bEaCB31';



init();
main();

document.getElementById("addressButton").addEventListener("click", findAddress);



async function init() {
    await deployer();
    registry = await deploy(registryABI, registryContract, "Registry");
    controller = await deploy(controllerABI, controllerContract, "Controller");
    token = await deploy(tokenABI, tokenContract, "Token");
    UIkit.notification('Blockchain connected.');
}


function deployer() {
    if (typeof(web3) === "undefined") {
        UIkit.notification('No Metamask found. Connecting to testnet.');
        localWeb3 = new Web3( new Web3.providers.HttpProvider(testnet));
    } else {
        UIkit.notification('Web3 initialized.');
        localWeb3 = new Web3(window.web3.currentProvider);
    }
}


function deploy(abi, address, contractName) {
    let contract = new localWeb3.eth.Contract(abi, address);
    return contract;
}


function main() {

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function findAddress() {
    let address = document.querySelector('#addressToCheck').value;
    let result = (controller.methods.isVerified(address)== true) ? "Transfer granted." : "Transfer declined.";
    UIkit.notification(result);
}



