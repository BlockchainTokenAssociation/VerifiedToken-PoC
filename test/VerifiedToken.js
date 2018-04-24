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

  before(async function () {
    this.registry = await Registry.new();
    this.cntlr = await Controller.new([this.registry.address], 1);
    this.otherCntlr = await Controller.new([this.registry.address], 1);
    this.token = await Token.new(this.cntlr.address);
    await this.token.giveMeCoins(deployer, 100*10**18);
    (await this.token.balanceOf(deployer)).should.be.bignumber.equal(100*10**18);
  });

  describe('transfer()', function () {
    it('should success for known receiver', async function () {
      await this.registry.updateAddress(knownReceiver, "age group", "18+").should.be.fulfilled;
      await this.cntlr.updateRequiredData(["age group"],["18+"]).should.be.fulfilled;
      expect(await this.cntlr.isVerified(knownReceiver)).to.be.true;
      await this.token.transfer(knownReceiver, 10*10**18, {from: deployer}).should.be.fulfilled;
      (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(10*10**18);
    });

    it('should fail for unknown address', async function () {
      await this.token.transfer(stranger, 10*10**18, {from: deployer}).should.be.rejectedWith(EVMThrow);
      (await this.token.balanceOf(stranger)).should.be.bignumber.equal(0);
    });
  });

  describe('transferFrom()', function () {
    it('should fail for unknown address', async function () {
      (await this.cntlr.isVerified(stranger)).should.be.false;
      await this.token.transferFrom(deployer, stranger, 10*10**18).should.be.rejectedWith(EVMThrow);
      (await this.token.balanceOf(deployer)).should.be.bignumber.equal(90*10**18);
    });

    it('should success for known receiver', async function () {
      await this.registry.updateAddress(stranger, "age group", "18+");
      await this.token.approve(stranger, 10*10**18, {from: deployer});
      (await this.token.allowance(deployer, stranger)).should.be.bignumber.equal(10*10**18);
      (await this.cntlr.isVerified(stranger)).should.be.true;
      await this.token.transferFrom(deployer, stranger, 5*10**18,{from: stranger});
      (await this.token.balanceOf(deployer)).should.be.bignumber.equal(85*10**18);
      (await this.token.balanceOf(stranger)).should.be.bignumber.equal(5*10**18);
    });
  });

  describe('getController()', function () {
    it('should return the controller address', async function () {
      (await this.token.getController()).should.equal(this.cntlr.address);
    });
  });

  describe('changeController()', function () {
    it('should fail if non-owner trying to change controller', async function () {
      await this.token.changeController(this.otherCntlr.address, {from: stranger}).should.be.rejectedWith(EVMThrow);
      (await this.token.getController()).should.equal(this.cntlr.address);
    });

    it('owner should be able to change controller', async function () {
      await this.token.changeController(this.otherCntlr.address, {from: deployer}).should.be.fulfilled;
      (await this.token.getController()).should.equal(this.otherCntlr.address);
    });

    it('should fire an event on changing controller', async function () {
      const {logs} = await this.token.changeController(this.cntlr.address, {from: deployer}).should.be.fulfilled;
      const event = logs.find(e => e.event === 'ControllerChanged');
      should.exist(event);
      event.args.controller.should.equal(this.cntlr.address);
    });
  });
});
