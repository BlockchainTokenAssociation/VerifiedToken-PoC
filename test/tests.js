import EVMThrow from './helpers/EVMThrow';
const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Token = artifacts.require('VerifiedTokenMock');
const Controller = artifacts.require('VerifiedTokenController');
const Registry = artifacts.require('VerifiedTokenRegistry');

// https://github.com/ethereum/web3.js/issues/337#issuecomment-197750774
var toUtf8 = function(hex) {
    return web3.toAscii(hex).replace(/\u0000/g, '');
};

contract('Verified Token Controller', function ([deployer, registry, stranger, lawful]) {

    before(async function () {
        this.registry = await Registry.new();
        this.token = await Token.new();
        this.cntlr = await Controller.new([this.registry.address]);
        // console.log("    -> controller address: " + this.cntlr.address);
    });

    describe('Updating required confirmations', function () {

        it('should update confirmations and fire an event on each update', async function () {
            const {logs} = await this.cntlr.updateRequiredConfirmations(["token address","allowed age group"],[this.token.address.toString(),"18+"]).should.be.fulfilled;
            const event = logs.filter(e => e.event === 'RequiredConfirmationsUpdated');
            should.exist(event);
            event.length.should.equal(2);
            toUtf8(event[0].args.key).should.equal("token address");
            toUtf8(event[1].args.key).should.equal("allowed age group");
            let myValue = web3.fromAscii(toUtf8(event[0].args.value.replace(/\u0000/g, '')));
            myValue.should.equal(this.token.address.toString());
            toUtf8(event[1].args.value).should.equal("18+");
        });

        it('should fail if number of keys not the same as the number of values', async function () {
            await this.cntlr.updateRequiredConfirmations(["token address","allowed age group"],["18+"]).should.be.rejectedWith(EVMThrow);
        });

    });

    describe('Verification', function () {

        let result;

        it('-', async function () {
            (await this.cntlr.isVerified(stranger)).should.equal(false);
        });
    });


});


contract('Verified Token', function ([deployer, registry, someoneUnknown]) {

    let balance;

    before(async function () {
        this.token = await Token.new();
        // console.log("    -> token address: " + this.token.address);
    });

    describe('Token operations', function () {
        it('should mint tokens', async function () {
            await this.token.giveMeCoins(deployer, 100*10**18)
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

        it('should fail on unauthorized transfer', async function () {
            await this.token.transfer(someoneUnknown, 10*10**18, {from: deployer}).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });

        it('should fail on unauthorized transferFrom', async function () {
            await this.token.transferFrom(deployer, someoneUnknown, 10*10**18).should.be.rejectedWith(EVMThrow);
            balance = await this.token.balanceOf(deployer);
            balance.should.be.bignumber.equal(100*10**18);
        });
    });

});

