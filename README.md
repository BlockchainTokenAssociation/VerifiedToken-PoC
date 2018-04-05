# VerifiedToken

## New Contract  - This may be an intermediary contract that a token will look to

### Intermediary Authority 

setAllowedRegistry - sets an array of ERC780 (or 780 like Smart Contract) contract addresses that this contract will check on transfer
(OnlyOwner)
setAllowedVerifiers - sets an array of Verifiers that the this contract will check on transfer 
(OnlyOwner)
setRequiredClaims - sets an array of key pair mappings that this contract is checking for on transfer
(OnlyOwner)
setClaimsNeeded - sets how many of the AllowedRegistry need to return the RequiredClaim for a transfer to be valid
(Only Owner)

### As Per ERC20:
totalSupply
BalanceOf
Approve ?
Allowance ?

### Modifed ERC20:

setIntermediary - Sets Intermediary for AllowedRegistry, RequiredClaims, AllowedIssuers and ClaimsNeeded

Transfer - check through the AllowedRegistry for all RequiredClaims made by AllowedIssuers for the _to address and counts each entry and transfers only once that count has exceeded ClaimsNeeded

TransferFrom - checks through the AllowedRegistry for all RequiredClaims made by AllowedIssuers for the _to address and counts each entry and transfers only once that count has exceeded ClaimsNeeded

BalanceAtBlockHeight (optional)



Standards that we overlap with in some way - let’s read & learn from the comments refining each of them.
https://github.com/ethereum/EIPs/issues/875
https://github.com/ethereum/EIPs/issues/821
https://github.com/ethereum/EIPs/issues/721 - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md 
https://github.com/ethereum/EIPs/issues/777 (less overlap but I like this one from Jordi)
https://github.com/ethereum/EIPs/issues/827
https://github.com/ethereum/EIPs/issues/223 

My current thinking is that we propose our Verified Token Standard as an extension to ERC #20, #223, & #721
