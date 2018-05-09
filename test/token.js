import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Token = artifacts.require('TokenMock');
const Registry = artifacts.require('Registry');
const Controller = artifacts.require('Controller');


contract('Token.sol', function ([owner, sender, receiver, stranger]) {
    const amount = 10*10**18;
    let balance;

    before(async function () {
        this.registry = await Registry.new();
        this.cntlr = await Controller.new([this.registry.address], 1);
        this.otherCntlr = await Controller.new([this.registry.address], 1);
        this.token = await Token.new(this.cntlr.address);

        await this.token.giveMeCoins(sender, 10*amount);
        await this.token.giveMeCoins(stranger, 10*amount);
        ((await this.token.balanceOf(sender)).toNumber()).should.be.equal(10*amount);
        expect((await this.token.balanceOf(stranger)).toNumber()).equal(10*amount);
    });

    describe('transfer()', function () {
        it('should succeed for known receiver and sender', async function () {
            await this.cntlr.updateReceiverRequirements(["Adult"],["true"]).should.be.fulfilled;
            await this.cntlr.updateSenderRequirements(["Exchange"],["true"]).should.be.fulfilled;
            await this.registry.update(receiver, "Adult", "true").should.be.fulfilled;
            await this.registry.update(sender, "Exchange", "true").should.be.fulfilled;
            await this.token.transfer(receiver, amount, {from: sender}).should.be.fulfilled;
            (await this.token.balanceOf(receiver)).should.be.bignumber.equal(amount);
        });

        it('should fail when transfer to non-verified receiver', async function () {
            balance = await this.token.balanceOf(stranger);
            await this.token.transfer(stranger, amount, {from: sender}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(stranger)).should.be.bignumber.equal(balance);
        });

        it('should fail if send by non-authorized sender', async function () {
            balance = await this.token.balanceOf(receiver);
            await this.token.transfer(receiver, amount, {from: stranger}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(receiver)).should.be.bignumber.equal(balance);
        });
    });

    describe('transferFrom()', function () {
        it('should succeed for known receiver and sender', async function () {
            balance = (await this.token.balanceOf(receiver)).toNumber();
            await this.cntlr.updateReceiverRequirements(["Adult"],["true"]).should.be.fulfilled;
            await this.cntlr.updateSenderRequirements(["Exchange"],["true"]).should.be.fulfilled;
            await this.registry.update(receiver, "Adult", "true").should.be.fulfilled;
            await this.registry.update(sender, "Exchange", "true").should.be.fulfilled;
            await this.token.approve(receiver, amount*2, {from: sender});
            (await this.token.allowance(sender, receiver)).should.be.bignumber.equal(amount*2);
            await this.token.transferFrom(sender, receiver, amount, {from: receiver}).should.be.fulfilled;
            (await this.token.balanceOf(receiver)).should.be.bignumber.equal(balance+amount);
        });

        it('should fail when transfer to non-verified receiver', async function () {
            balance = await this.token.balanceOf(stranger);
            await this.token.approve(stranger, amount*2, {from: sender});
            (await this.token.allowance(sender, stranger)).should.be.bignumber.equal(amount*2);
            await this.token.transferFrom(sender, stranger, amount).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(stranger)).should.be.bignumber.equal(balance);
        });

        it('should fail if send by non-authorized sender', async function () {
            balance = (await this.token.balanceOf(sender)).toNumber();
            await this.registry.remove(sender);
            await this.token.approve(receiver, 0, {from: sender});
            await this.token.approve(receiver, amount*2, {from: sender});
            (await this.token.allowance(sender, receiver)).should.be.bignumber.equal(amount*2);
            await this.token.transferFrom(sender, receiver, amount, {from: receiver}).should.be.rejectedWith(EVMThrow);
            (await this.token.balanceOf(sender)).should.be.bignumber.equal(balance);
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
            await this.token.changeController(this.otherCntlr.address, {from: owner}).should.be.fulfilled;
            (await this.token.getController()).should.equal(this.otherCntlr.address);
        });

        it('should fire an event on changing controller', async function () {
            const {logs} = await this.token.changeController(this.cntlr.address, {from: owner}).should.be.fulfilled;
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
