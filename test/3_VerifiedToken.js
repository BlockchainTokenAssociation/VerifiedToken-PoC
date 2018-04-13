import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Token = artifacts.require('VerifiedTokenMock');
const Registry = artifacts.require('VerifiedTokenRegistry');
const Controller = artifacts.require('VerifiedTokenController');


contract('VerifiedToken.sol', function ([deployer, registry, stranger, knownReceiver]) {

    let balance;

    before(async function () {
        this.registry = await Registry.new();
        this.token = await Token.new();
        this.cntlr = await Controller.new([this.registry.address], 1);
    });

    describe('Token preparation', function () {
        it('should mint tokens', async function () {
            await this.token.giveMeCoins(deployer, 100*10**18)
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });
    });

    describe('transfer()', function () {

        it('should success for known receiver', async function () {
            await this.token.transfer(knownReceiver, 10*10**18, {from: deployer}).should.be.fulfilled;
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

        it('should fail for unknown address', async function () {
            await this.token.transfer(stranger, 10*10**18, {from: deployer}).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

    });

    describe('transferFrom()', function () {

        it('should success for known receiver', async function () {
            await this.token.transferFrom(deployer, knownReceiver, 10*10**18).should.be.fulfilled;
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

        it('should fail for unknown address', async function () {
            await this.token.transferFrom(deployer, stranger, 10*10**18).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

    });

});
