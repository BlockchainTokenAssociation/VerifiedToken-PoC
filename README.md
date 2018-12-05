# Verified Token PoC

## Purpose
This is a Proof of Concept implementation of the Verified Token Framework, as such it reflects the early design thinking and concepts, much of which has evolved over the months following working with issuers, exchanges, lawyers, and regulators.

You can find the most up-to-date information at https://verifiedtokenframework.com/.

### As Per ERC20:
`totalSupply`
`BalanceOf`
`Approve`
`Allowance`

### Modifed ERC20:
`setIntermediary` - Sets Intermediary for AllowedRegistry, RequiredClaims, AllowedIssuers and ClaimsNeeded

`transfer` - check through the AllowedRegistry for all RequiredClaims made by AllowedIssuers for the _to address and counts each entry and transfers only once that count has exceeded ClaimsNeeded

`transferFrom` - checks through the AllowedRegistry for all RequiredClaims made by AllowedIssuers for the _to address and counts each entry and transfers only once that count has exceeded ClaimsNeeded

`balanceAtBlockHeight` (optional)

### Verified Token Interface Contract

`setAllowedRegistry` - sets an array of ERC780 (or 780 like Smart Contract) contract addresses that this contract will check on transfer
(OnlyOwner)

`setAllowedVerifiers` - sets an array of Verifiers that the this contract will check on transfer 
(OnlyOwner)

`setRequiredClaims` - sets an array of key pair mappings that this contract is checking for on transfer
(OnlyOwner)

`setClaimsNeeded` - sets how many of the AllowedRegistry need to return the RequiredClaim for a transfer to be valid
(Only Owner)

## Front End (example)

### Installation

* Clone / download repo.
* Run npm install
* In terminal run `npm run dev` to run webpack server
* You can run `webpack --watch` in other terminal if you are going to change code in ./app/ folder 
* Open `localhost:8080` in your browser

[Demo](https://blockchainlabsnz.github.io/VerifiedToken/) - if you use Metamask, please switch to Ropsten network.

<br>

