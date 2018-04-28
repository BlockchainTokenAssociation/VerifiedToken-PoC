import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Operator = artifacts.require('OperatorMock');


contract('Operator.sol', function ([deployer, operator, stranger]) {

    before(async function () {
        this.operator = await Operator.new();
    });

    describe('isOperator()', function () {
        it('should return FALSE if address is non-listed', async function () {
            (await this.operator.isOperator(stranger)).should.be.false;
        });

        it('should return TRUE if address is listed', async function () {
            await this.operator.updateOperator(deployer, true, {from: deployer}).should.be.fulfilled;
            (await this.operator.isOperator(deployer)).should.be.true;
        });
    });

    describe('updateOperator()', function () {
        it('owner should be able to add address to the list of operators', async function () {
            await this.operator.updateOperator(operator, true, {from: deployer}).should.be.fulfilled;
            (await this.operator.isOperator(operator, {from: deployer})).should.be.true;
        });

        it('non-owner should fail to add address to the list of operators', async function () {
            await this.operator.updateOperator(stranger, true, {from: stranger}).should.be.rejectedWith(EVMThrow);
        });

        it('event should be fired on adding the new operator', async function () {
            const {logs} = await this.operator.updateOperator(operator, true, {from: deployer}).should.be.fulfilled;
            const event = logs.find(e => e.event === 'OperatorStatusUpdated');
            should.exist(event);
            event.args.operator.should.equal(operator);
            event.args.status.should.equal(true);
        });
    });

    describe('modifier onlyOperator()', function () {
        it('should fail when called by non-operator', async function () {
            await this.operator.testOnlyOperator({from: stranger}).should.be.rejectedWith(EVMThrow);
        });

        it('should return TRUE if called by operator', async function () {
            (await this.operator.testOnlyOperator({from: operator})).should.be.true;
        });
    });

});
