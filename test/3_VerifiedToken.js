import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Token = artifacts.require('VerifiedTokenMock');
const Registry = artifacts.require('VerifiedTokenRegistry');
const Controller = artifacts.require('VerifiedTokenController');


contract('VerifiedToken.sol', function ([deployer, registry, stranger, guest, knownReceiver]) {

    let balance;

    before(async function () {
        this.registry = await Registry.new();
        this.cntlr = await Controller.new([this.registry.address], 1);
        this.token = await Token.new(this.cntlr.address);
        await this.token.giveMeCoins(deployer, 100*10**18);
        balance = await this.token.balanceOf(deployer);
        balance.should.be.bignumber.equal(100*10**18);
    });

    describe('transfer()', function () {

        it('should success for known receiver', async function () {
            await this.registry.updateRecord(knownReceiver, "age group", "18+").should.be.fulfilled;
            await this.cntlr.updateRequiredData(["age group"],["18+"]).should.be.fulfilled;
            assert.isOk(await this.cntlr.isVerified(knownReceiver));
            await this.token.transfer(knownReceiver, 10*10**18, {from: deployer}).should.be.fulfilled;
            balance = await this.token.balanceOf(knownReceiver);
            balance.should.be.bignumber.equal(10*10**18);
        });

        it('should fail for unknown address', async function () {
            await this.token.transfer(stranger, 10*10**18, {from: deployer}).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(stranger);
            balance.should.be.bignumber.equal(0);
        });

    });

    describe('transferFrom()', function () {

        it('should fail for unknown address', async function () {
            assert.isNotOk(await this.cntlr.isVerified(stranger));
            await this.token.transferFrom(deployer, stranger, 10*10**18).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(90*10**18);
        });

        it('should success for known receiver', async function () {
            await this.registry.updateRecord(stranger, "age group", "18+").should.be.fulfilled;
            await this.token.approve(stranger, 10*10**18, {from: deployer}).should.be.fulfilled;
            (await this.token.allowance(deployer, stranger)).should.be.bignumber.equal(10*10**18);
            assert.isOk(await this.cntlr.isVerified(stranger));
            await this.token.transferFrom(deployer, stranger, 5*10**18,{from: stranger}).should.be.fulfilled;
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(85*10**18);
            balance = await this.token.balanceOf(stranger);
            balance.should.be.bignumber.equal(5*10**18);
        });

    });

});
