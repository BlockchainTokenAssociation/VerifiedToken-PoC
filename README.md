# Verified Token

## Purpose
This is a private repo for drafting documentation, code examples, and the EIP specification prior to submission to Ethereum Foundation. A tidy public repo will be created at the time of publication.

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

## Broader Context

There are standards that we overlap with in some way - let’s read & learn from the comments refining each of them. My current thinking is that we propose our Verified Token Standard as an extension to ERC #20, #223, & #721

- https://github.com/ethereum/EIPs/issues/721 - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md 
- https://github.com/ethereum/EIPs/issues/827
- https://github.com/ethereum/EIPs/issues/875
- https://github.com/ethereum/EIPs/issues/821
- https://github.com/ethereum/EIPs/issues/223 
- https://github.com/ethereum/EIPs/issues/777 (less overlap but I like this one from Jordi)

Also read:
https://github.com/ethereum/EIPs/blob/master/ISSUE_TEMPLATE.md


## Front End


### Installation

* Clone / download repo.
* Run npm install
* In terminal run `npm run dev` to run webpack server
* You can run `webpack --watch` in other terminal if you are going to change code in ./app/ folder 
* Open `localhost:8080` in your browser

[Demo](https://blockchainlabsnz.github.io/VerifiedToken/) - if you use Metamask, please switch to Kovan network.

<br>

