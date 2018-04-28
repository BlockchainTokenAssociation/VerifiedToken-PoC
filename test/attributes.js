import EVMThrow from './helpers/EVMThrow';
import { toUtf8 } from './helpers/asciiConverter';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Registry = artifacts.require('RegistryMock');


contract('Attribute.sol', function ([deployer, stranger]) {

    before(async function () {
        this.registry = await Registry.new();
    });

    describe('attributeExists()', function () {
        it('should return FALSE if the attribute does not exist', async function () {
            (await this.registry.attributeExists("some key")).should.be.false;
        });

        it('should return TRUE if the attribute does exist', async function () {
            (await this.registry.attributeExists("registry.type")).should.be.true;
        });
    });

    describe('addAttribute()', function () {
        it('should return true on adding new attribute', async function () {
            (await this.registry.attributeExists("new key")).should.be.false;
            await this.registry.testAddAttribute("new key").should.be.fulfilled;
            (await this.registry.attributeExists("new key")).should.be.true;
        });

        it('should fail if called by non-operator', async function () {
            await this.registry.testAddAttribute("malicious key", {from: stranger}).should.be.rejectedWith(EVMThrow);
        });
    });

});