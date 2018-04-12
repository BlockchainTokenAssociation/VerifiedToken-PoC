import EVMThrow from './helpers/EVMThrow'
const BigNumber = web3.BigNumber

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()


const Token = artifacts.require('VerifiedTokenMock')
const Controller = artifacts.require('VerifiedTokenController')
const Registry = artifacts.require('VerifiedTokenRegistry')

let balance;

contract('Verified Token', function ([deployer, registry, authorizedReceiver, someoneUnknown]) {

    before(async function () {
        this.token = await Token.new()
        console.log("    -> token address: " + this.token.address);
    })


    describe('Token operations', function () {
        it('should mint tokens', async function () {
            await this.token.giveMeCoins(deployer, 100*10**18)
            balance = await this.token.balanceOf(deployer);
            assert(balance == 100*10**18);
        })

        it('should fail on unauthorized transfer', async function () {
            await this.token.transferFrom(deployer, someoneUnknown, 10*10**18).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            assert(balance == 100*10**18);
        })

        it('should fail on unauthorized transferFrom', async function () {
            await this.token.transferFrom(deployer, someoneUnknown, 10*10**18).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            assert(balance == 100*10**18);
        })
    });

})