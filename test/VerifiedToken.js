import EVMThrow from './helpers/EVMThrow'
const BigNumber = web3.BigNumber

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

const Token = artifacts.require('VerifiedTokenMock')
const Controller = artifacts.require('VerifiedTokenController')
const Registry = artifacts.require('VerifiedTokenRegistry')

contract('Verified Token', function ([deployer, registry, authorizedReceiver, someoneUnknown]) {


    beforeEach(async function () {
        this.token = await Token.new(this.address)
        await token.giveMeCoins(deployer, 100*10e18)
    })


    describe('creating a valid crowdsale', function () {

        it.only('should fail with zero rate', async function () {
            await token.transferFrom(deployer, someoneUnknown, 10*10*e18).should.be.rejectedWith(EVMThrow);
        })

    });

})