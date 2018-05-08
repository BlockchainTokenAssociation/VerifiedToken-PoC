import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Token = artifacts.require('TokenMock');
const Registry = artifacts.require('Registry');
const Controller = artifacts.require('Controller');


contract('Token.sol', function ([deployer, registry, stranger, guest, knownReceiver, sender]) {

    before(async function () {
        this.registry = await Registry.new();
        this.cntlr = await Controller.new([this.registry.address], 1);
        this.otherCntlr = await Controller.new([this.registry.address], 1);
        this.token = await Token.new(this.cntlr.address);
        await this.token.giveMeCoins(deployer, 100*10**18);
        (await this.token.balanceOf(deployer)).should.be.bignumber.equal(100*10**18);
    });

    describe('transfer()', function () {
        it('should succeed for known receiver', async function () {
            await this.registry.update(knownReceiver, "age group", "18+").should.be.fulfilled;
            await this.cntlr.updateReceiverRequirements(["age group"],["18+"]).should.be.fulfilled;
            expect(await this.cntlr.isReceiverVerified(knownReceiver)).to.be.true;
            await this.token.transfer(knownReceiver, 10*10**18, {from: deployer}).should.be.fulfilled;
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(10*10**18);
        });

        it('should fail for unknown address', async function () {
            await this.token.transfer(stranger, 10*10**18, {from: deployer}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(stranger)).should.be.bignumber.equal(0);
        });

        it('should succeed if send by authorized sender', async function () {
            await this.cntlr.updateSenderRequirements(["Type"],["Exchange"]).should.be.fulfilled;
            await this.registry.update(deployer, "Type", "Exchange").should.be.fulfilled;
            await this.token.transfer(knownReceiver, 10*10**18, {from: deployer}).should.be.fulfilled;
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(20*10**18);
        });

        it('should fail if send by non-authorized sender', async function () {
            await this.token.transfer(knownReceiver, 10*10**18, {from: sender}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(20*10**18);
        });
    });

    describe('transferFrom()', function () {
        it('should fail for unknown address', async function () {
            (await this.cntlr.isReceiverVerified(stranger)).should.be.false;
            await this.token.transferFrom(deployer, stranger, 10*10**18).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(deployer)).should.be.bignumber.equal(80*10**18);
        });

        it('should succeed for known receiver if there are no sender requirements', async function () {
            await this.cntlr.updateSenderRequirements([],[]).should.be.fulfilled;
            let result = (await this.cntlr.getSenderRequirements());
            result[0].length.should.be.equal(0);
            await this.token.approve(knownReceiver, 10*10**18, {from: deployer});
            (await this.token.allowance(deployer, knownReceiver)).should.be.bignumber.equal(10*10**18);
            await this.token.transferFrom(deployer, knownReceiver, 5*10**18,{from: knownReceiver}).should.be.fulfilled;
            (await this.token.balanceOf(deployer)).should.be.bignumber.equal(75*10**18);
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(25*10**18);
        });

        it('should fail if send by non-authorized sender', async function () {
            await this.cntlr.updateSenderRequirements(["Type"],["Exchange"]).should.be.fulfilled;
            await this.registry.remove(deployer).should.be.fulfilled;
            (await this.token.allowance(deployer, knownReceiver)).should.be.bignumber.equal(5*10**18);
            await this.token.transferFrom(deployer, knownReceiver, 5*10**18,{from: knownReceiver}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(deployer)).should.be.bignumber.equal(75*10**18);
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(25*10**18);
        });

        it('should succeed if send by authorized sender to verified receiver', async function () {
            await this.registry.update(deployer, "Type", "Exchange").should.be.fulfilled;
            (await this.token.allowance(deployer, knownReceiver)).should.be.bignumber.equal(5*10**18);
            await this.token.transferFrom(deployer, knownReceiver, 5*10**18,{from: knownReceiver}).should.be.fulfilled;
            (await this.token.balanceOf(deployer)).should.be.bignumber.equal(70*10**18);
            (await this.token.balanceOf(knownReceiver)).should.be.bignumber.equal(30*10**18);
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

        it('should fail if new controller is the same as an old one', async function () {
            await this.token.changeController(this.cntlr.address).should.be.rejectedWith(EVMThrow);
            (await this.token.getController()).should.equal(this.cntlr.address);
        });
    });
});
