import EVMThrow from './helpers/EVMThrow';
import { toUtf8 } from './helpers/asciiConverter';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Registry = artifacts.require('VerifiedTokenRegistryMock');


contract('VerifiedTokenRegistry.sol', function ([deployer, registry, stranger, lawful]) {

    before(async function () {
        this.registry = await Registry.new();
    });

    describe('isExist()', function () {

        it('should return TRUE if key is exist', async function () {
            (await this.registry.isExist("some key")).should.be.false;
        });

    });

    describe('addNewKey()', function () {

        it('should return true on adding new key', async function () {
            (await this.registry.isExist("new key")).should.be.false;
            await this.registry.testAddNewKey("new key").should.be.fulfilled;
            (await this.registry.isExist("new key")).should.be.true;
        });

    });

    describe('updateRecord()', function () {

        it('should add a new key if it does not exist yet', async function () {
            (await this.registry.isExist("age group")).should.be.false;
            await this.registry.updateRecord(lawful, "age group", "10+").should.be.fulfilled;
            (await this.registry.isExist("age group")).should.be.true;
        });

        it('should update record', async function () {
            await this.registry.updateRecord(lawful, "age group", "18+").should.be.fulfilled;
            (await this.registry.findAddress(lawful, "age group", "18+")).should.be.true;
        });

        it('should fire an event', async function () {
            const {logs} = await this.registry.updateRecord(lawful, "id type", "passport").should.be.fulfilled;
            const event = logs.find(e => e.event === 'RecordUpdated');
            should.exist(event);
            let registryValue = web3.fromAscii(toUtf8(event.args.registry.replace(/\u0000/g, '')));
            let receiverValue = web3.fromAscii(toUtf8(event.args.receiver.replace(/\u0000/g, '')));
            registryValue.should.equal(this.registry.address.toString());
            receiverValue.should.equal(lawful.toString());
            toUtf8(event.args.key).should.equal("id type");
            toUtf8(event.args.value).should.equal("passport");
        });

    });

    describe('findAddress()', function () {

        it('should return TRUE if address was found', async function () {
            (await this.registry.findAddress(lawful, "age group", "18+")).should.be.true;
        });

        it('should return FALSE if ADDRESS was not found', async function () {
            (await this.registry.findAddress(stranger, "age group", "18+")).should.be.false;
        });

        it('should return FALSE if address was NOT found in the KEY => VALUE pair', async function () {
            (await this.registry.findAddress(lawful, "age group", "30")).should.be.false;
        });

    });

    describe('deleteAddress()', function () {

        it('should fire an event', async function () {
            const {logs} = await this.registry.deleteAddress(lawful).should.be.fulfilled;
            const event = logs.find(e => e.event === 'AddressDeleted');
            should.exist(event);
            let registryValue = web3.fromAscii(toUtf8(event.args.registry.replace(/\u0000/g, '')));
            let receiverValue = web3.fromAscii(toUtf8(event.args.receiver.replace(/\u0000/g, '')));
            registryValue.should.equal(this.registry.address.toString());
            receiverValue.should.equal(lawful.toString());
        });

        it('record should be deleted', async function () {
            (await this.registry.findAddress(lawful, "id type", "passport")).should.be.false;
        });


    });


});
