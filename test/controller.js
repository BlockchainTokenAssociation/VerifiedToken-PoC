import EVMThrow from './helpers/EVMThrow';
import { toUtf8 } from './helpers/asciiConverter';

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Token = artifacts.require('TokenMock');
const Controller = artifacts.require('Controller');
const Registry = artifacts.require('Registry');


contract('Controller.sol', function ([deployer, receiver, sender, stranger]) {

    before(async function () {
        this.registry1 = await Registry.new();
        this.registry2 = await Registry.new();
        this.cntlr = await Controller.new([this.registry1.address], 1);
        this.token = await Token.new(this.cntlr.address);
    });

    describe('updateRequiredConfirmations()', function () {
        it('should update confirmations number and fire an event', async function () {
            const {logs} = await this.cntlr.updateRequiredConfirmations(5).should.be.fulfilled;
            const event = logs.find(e => e.event === 'RequiredConfirmationsUpdated');
            should.exist(event);
            event.args.confirmations.toNumber().should.equal(5);
        });
    });

    describe('updateReceiverRequirements()', function () {
        it('should fail if number of keys not the same as the number of values', async function () {
            await this.cntlr.updateReceiverRequirements(["token address","allowed age group"],["18+"]).should.be.rejectedWith(EVMThrow);
        });

        it('should update attribute => value pairs and fire an event for each pair', async function () {
            const {logs} = await this.cntlr.updateReceiverRequirements(["id type","allowed age group"],["passport","18+"]).should.be.fulfilled;
            const event = logs.filter(e => e.event === 'ReceiverRequirementsUpdated');
            should.exist(event);
            event.length.should.equal(2);
            toUtf8(event[0].args.key).should.equal("id type");
            toUtf8(event[0].args.value).should.equal("passport");
            toUtf8(event[1].args.key).should.equal("allowed age group");
            toUtf8(event[1].args.value).should.equal("18+");
        });

        it('should update ZERO attribute => value pairs and fire an event for each pair', async function () {
            const {logs} = await this.cntlr.updateReceiverRequirements([],[]).should.be.fulfilled;
            const event = logs.find(e => e.event === 'ReceiverRequirementsUpdated');
            should.exist(event);
            toUtf8(event.args.key).should.equal("no requirements");
            toUtf8(event.args.value).should.equal("no requirements");
        });
    });

    describe('updateSenderRequirements()', function () {
        it('should fail if number of keys not the same as the number of values', async function () {
            await this.cntlr.updateSenderRequirements(["Exchange","Broker"],["true"]).should.be.rejectedWith(EVMThrow);
        });

        it('should update attribute => value pairs and fire an event for each pair', async function () {
            const {logs} = await this.cntlr.updateSenderRequirements(["Exchange","Broker"],["true","true"]).should.be.fulfilled;
            const event = logs.filter(e => e.event === 'SenderRequirementsUpdated');
            should.exist(event);
            event.length.should.equal(2);
            toUtf8(event[0].args.key).should.equal("Exchange");
            toUtf8(event[0].args.value).should.equal("true");
            toUtf8(event[1].args.key).should.equal("Broker");
            toUtf8(event[1].args.value).should.equal("true");
        });
    });

    describe('updateRegistries()', function () {
        it('should fail if registry1 address is not a contract', async function () {
            await this.cntlr.updateRegistries([0x1]).should.be.rejectedWith(EVMThrow);
        });

        it('should fail if a proposed registry is not a registry contract', async function () {
            let res = await this.cntlr.updateRegistries([this.token.address]).should.be.rejectedWith(EVMThrow);
        });

        it('should fail if zero address', async function () {
            await this.cntlr.updateRegistries([0x0]).should.be.rejectedWith(EVMThrow);
        });

        it('otherwise, should update list of registries and fire an event', async function () {
            const {logs} = await this.cntlr.updateRegistries([this.registry1.address, this.registry2.address]).should.be.fulfilled;
            const event = logs.find(e => e.event === 'AcceptedRegistriesUpdated');
            should.exist(event);
            event.args.registries.length.should.equal(2);
            event.args.registries[0].should.equal(this.registry1.address);
            event.args.registries[1].should.equal(this.registry2.address);
        });
    });

    describe('getRegistries()', function () {
      it('should return the list of registries', async function () {
        let result = await this.cntlr.getRegistries();
        result.length.should.equal(2);
        result[0].should.equal(this.registry1.address);
        result[1].should.equal(this.registry2.address);
      });
    });

    describe('getNumberOfConfirmationsRequired()', function () {
        it('should return the number', async function () {
            (await this.cntlr.getNumberOfConfirmationsRequired()).toNumber().should.equal(5);
            await this.cntlr.updateRequiredConfirmations(1);
            (await this.cntlr.getNumberOfConfirmationsRequired()).toNumber().should.equal(1);
        });
    });

    describe('isContract()', function () {
        it('should return FALSE if address is not a contract', async function () {
            (await this.cntlr.isContract(stranger)).should.be.false;
        });

        it('should return TRUE if address is a contract', async function () {
            (await this.cntlr.isContract(this.registry1.address)).should.be.true;
        });
    });

    describe('getReceiverRequirements()', function () {
        it('should return the data (attribute => value pairs)', async function () {
            await this.cntlr.updateReceiverRequirements(["id type","allowed age group"],["passport","18+"]).should.be.fulfilled;
            let result = await this.cntlr.getReceiverRequirements();
            let pairs = [];
            for (let i = 0; i < result[0].length; i++) {
                let pair = {
                    attribute:  result[0][i],
                    value: result[1][i],
                }
                pairs.push(pair);
            }
            expect(toUtf8(pairs[0].attribute)).to.be.equal("id type");
            expect(toUtf8(pairs[0].value)).to.be.equal("passport");
            expect(toUtf8(pairs[1].attribute)).to.be.equal("allowed age group");
            expect(toUtf8(pairs[1].value)).to.be.equal("18+");
        });

        it('should return empty arrays if requirements are empty', async function() {
            await this.cntlr.updateReceiverRequirements([],[]).should.be.fulfilled;
            let result = await this.cntlr.getReceiverRequirements().should.be.fulfilled;
            result[0].length.should.be.equal(0);
            await this.cntlr.updateReceiverRequirements(["id type","allowed age group"],["passport","18+"]).should.be.fulfilled;
        });
    });

    describe('getSenderRequirements()', function () {
        it('should return the data (attribute => value pairs)', async function () {
            await this.cntlr.updateSenderRequirements(["Exchange","Broker"],["true","true"]).should.be.fulfilled;
            let result = await this.cntlr.getSenderRequirements();
            let pairs = [];
            for (let i = 0; i < result[0].length; i++) {
                let pair = {
                    attribute: result[0][i],
                    value: result[1][i],
                }
                pairs.push(pair);
            }
            expect(toUtf8(pairs[0].attribute)).to.be.equal("Exchange");
            expect(toUtf8(pairs[0].value)).to.be.equal("true");
            expect(toUtf8(pairs[1].attribute)).to.be.equal("Broker");
            expect(toUtf8(pairs[1].value)).to.be.equal("true");
        });

        it('should return empty arrays if requirements are empty', async function() {
            await this.cntlr.updateSenderRequirements([],[]).should.be.fulfilled;
            let result = await this.cntlr.getSenderRequirements().should.be.fulfilled;
            result[0].length.should.be.equal(0);
            await this.cntlr.updateSenderRequirements(["Exchange","Broker"],["true","true"]).should.be.fulfilled;
        });
    });

    describe('isReceiverVerified()', function () {
        it('should return TRUE for verified receiver', async function () {
            await this.registry1.update(receiver, "id type", "passport").should.be.fulfilled;
            await this.registry1.update(receiver, "allowed age group", "18+").should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(receiver)).should.be.true;
        });

        it('should return FALSE for receiver verified by lesser number of registries than it required', async function () {
            await this.cntlr.updateRequiredConfirmations(2).should.be.fulfilled;
            await this.registry2.remove(receiver).should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(receiver)).should.be.false;
        });

        it('should return FALSE for partially verified receiver', async function () {
            await this.registry2.update(receiver, "id type", "passport").should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(receiver)).should.be.false;
        });

        it('should return TRUE for receiver verified more than 1 registry', async function () {
            await this.registry2.update(receiver, "allowed age group", "18+").should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(receiver)).should.be.true;
        });

        it('should return FALSE for unknown receiver', async function () {
            await this.registry1.remove(stranger).should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(stranger)).should.be.false;
        });

        it('should return FALSE if no receiver requirements were set', async function () {
            await this.registry1.remove(stranger).should.be.fulfilled;
            await this.registry2.remove(stranger).should.be.fulfilled;
            await this.cntlr.updateReceiverRequirements([],[]).should.be.fulfilled;
            (await this.cntlr.isReceiverVerified(stranger)).should.be.false;
        });
    });

    describe('isSenderVerified()', function () {
        it('should return TRUE for verified sender', async function () {
            await this.cntlr.updateRequiredConfirmations(1).should.be.fulfilled;
            await this.registry1.update(sender, "Exchange", "true").should.be.fulfilled;
            await this.registry1.update(sender, "Broker", "true").should.be.fulfilled;
            (await this.cntlr.isSenderVerified(sender)).should.be.true;
        });

        it('should return FALSE for sender verified by lesser number of registries than it required', async function () {
            await this.cntlr.updateRequiredConfirmations(2).should.be.fulfilled
            await this.registry2.remove(sender).should.be.fulfilled;
            (await this.cntlr.isSenderVerified(sender)).should.be.false;
        });

        it('should return FALSE for partially verified sender', async function () {
            await this.registry2.update(sender, "Exchange", "true").should.be.fulfilled;
            (await this.cntlr.isSenderVerified(sender)).should.be.false;
        });

        it('should return FALSE for unknown sender', async function () {
            await this.registry1.remove(stranger).should.be.fulfilled;
            (await this.cntlr.isSenderVerified(stranger)).should.be.false;
        });

        it('should return TRUE for sender verified more than 1 registry', async function () {
            await this.registry2.update(sender, "Broker", "true").should.be.fulfilled;
            (await this.cntlr.isSenderVerified(sender)).should.be.true;
        });

        it('should return FALSE if no sender requirements were set', async function () {
            await this.registry1.remove(stranger).should.be.fulfilled;
            await this.registry2.remove(stranger).should.be.fulfilled;
            await this.cntlr.updateSenderRequirements([],[]).should.be.fulfilled;
            (await this.cntlr.isSenderVerified(stranger)).should.be.false;
        });
    });

    describe('isTransferAllowed()', function () {
        it('should return TRUE if confirmations required == 0', async function () {
            await this.cntlr.updateRequiredConfirmations(0).should.be.fulfilled;
            (await this.cntlr.isTransferAllowed(receiver, sender)).should.equal(true);
        });
    });
});

