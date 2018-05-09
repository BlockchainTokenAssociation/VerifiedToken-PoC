# Gas consumption report
performed by Blockchain Labs, May 9, 2018


```

  Contract: Attribute.sol
    attributeExists()
      ✓ should return FALSE if the attribute does not exist
      ✓ should return TRUE if the attribute does exist
    addAttribute()
      ✓ should return true on adding new attribute (67972 gas)
      ✓ should fail if called by non-operator (22741 gas)

  Contract: Controller.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event (28413 gas)
    updateReceiverRequirements()
      ✓ should fail if number of keys not the same as the number of values (25725 gas)
      ✓ should update attribute => value pairs and fire an event for each pair (141195 gas)
      ✓ should update ZERO attribute => value pairs and fire an event for each pair (25268 gas)
    updateSenderRequirements()
      ✓ should fail if number of keys not the same as the number of values (24787 gas)
      ✓ should update attribute => value pairs and fire an event for each pair (140397 gas)
    updateRegistries()
      ✓ should fail if registry1 address is not a contract (23654 gas)
      ✓ should fail if a proposed registry is not a registry contract (26886 gas)
      ✓ should fail if zero address (23590 gas)
      ✓ otherwise, should update list of registries and fire an event (66230 gas)
    getRegistries()
      ✓ should return the list of registries
    getNumberOfConfirmationsRequired()
      ✓ should return the number (28413 gas)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    getReceiverRequirements()
      ✓ should return the data (attribute => value pairs) (141195 gas)
      ✓ should return empty arrays if requirements are empty (166463 gas)
    getSenderRequirements()
      ✓ should return the data (attribute => value pairs) (85686 gas)
      ✓ should return empty arrays if requirements are empty (165676 gas)
    isReceiverVerified()
      ✓ should return TRUE for verified receiver (187274 gas)
      ✓ should return FALSE for receiver verified by lesser number of registries than it required (65879 gas)
      ✓ should return FALSE for partially verified receiver (93477 gas)
      ✓ should return TRUE for receiver verified more than 1 registry (93797 gas)
      ✓ should return FALSE for unknown receiver (49410 gas)
      ✓ should return FALSE if no receiver requirements were set (124088 gas)
    isSenderVerified()
      ✓ should return TRUE for verified sender (214855 gas)
      ✓ should return FALSE for sender verified by lesser number of registries than it required (77823 gas)
      ✓ should return FALSE for partially verified sender (93285 gas)
      ✓ should return FALSE for unknown sender (61354 gas)
      ✓ should return TRUE for sender verified more than 1 registry (93157 gas)
      ✓ should return FALSE if no sender requirements were set (147987 gas)
    isTransferAllowed()
      ✓ should return TRUE if confirmations required == 0 (14175 gas)

  Contract: Operator.sol
    isOperator()
      ✓ should return FALSE if address is non-listed
      ✓ should return TRUE if address is listed (45618 gas)
    updateOperator()
      ✓ owner should be able to add address to the list of operators (45618 gas)
      ✓ non-owner should fail to add address to the list of operators (23400 gas)
      ✓ event should be fired on adding the new operator (30618 gas)
    modifier onlyOperator()
      ✓ should fail when called by non-operator
      ✓ should return TRUE if called by operator

  Contract: Registry.sol
    hasAttribute()
      ✓ should return TRUE if key is exist
    update()
      ✓ should add a new attribute if it does not exist yet (93307 gas)
      ✓ should update record (32428 gas)
      ✓ should fire an event (93499 gas)
      ✓ should fail if called by non-operator (24282 gas)
    verify()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the ATTRIBUTE => VALUE pair
    remove()
      ✓ should fire an event (24705 gas)
      ✓ record should be deleted
    expose()
      ✓ should return attribute=>value pairs for given address (186230 gas)

  Contract: Token.sol
    transfer()
      ✓ should succeed for known receiver and sender (435677 gas)
      ✓ should fail when transfer to non-verified receiver (37106 gas)
      ✓ should fail if send by non-authorized sender (31833 gas)
    transferFrom()
      ✓ should succeed for known receiver and sender (282364 gas)
      ✓ should fail when transfer to non-verified receiver (83976 gas)
      ✓ should fail if send by non-authorized sender (128265 gas)
    getController()
      ✓ should return the controller address
    changeController()
      ✓ should fail if non-owner trying to change controller (23309 gas)
      ✓ owner should be able to change controller (30395 gas)
      ✓ should fire an event on changing controller (30395 gas)
      ✓ should fail if new controller is the same as an old one (23736 gas)

·---------------------------------------------------------------------------------|-----------------------------------·
│                                       Gas                                       ·  Block limit: 17592186044415 gas  │
·················································|································|····································
│  Methods                                       ·          21 gwei/gas           ·          723.57 usd/eth           │
·················|·······························|··········|··········|··········|··················|·················
│  Contract      ·  Method                       ·  Min     ·  Max     ·  Avg     ·  # calls         ·  usd (avg)     │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateReceiverRequirements   ·   25268  ·  141195  ·   81035  ·               8  ·          1.23  │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateRegistries             ·       -  ·       -  ·   66230  ·               1  ·          1.01  │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateRequiredConfirmations  ·   14175  ·   28413  ·   26040  ·               6  ·          0.40  │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateSenderRequirements     ·   25279  ·  140397  ·   80910  ·               7  ·          1.23  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  remove                       ·   24705  ·   61354  ·   47828  ·              10  ·          0.73  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  update                       ·   32214  ·   93797  ·   82582  ·              17  ·          1.25  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  updateOperator               ·   30618  ·   45618  ·   40618  ·               3  ·          0.62  │
·················|·······························|··········|··········|··········|··················|·················
│  RegistryMock  ·  testAddAttribute             ·       -  ·       -  ·   67972  ·               1  ·          1.03  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  approve                      ·   15152  ·   45600  ·   37988  ·               4  ·          0.58  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  changeController             ·       -  ·       -  ·   30395  ·               2  ·          0.46  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  decreaseApproval             ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  increaseApproval             ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transfer                     ·       -  ·       -  ·   65413  ·               1  ·          0.99  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transferFrom                 ·       -  ·       -  ·   57802  ·               1  ·          0.88  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transferOwnership            ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  TokenMock     ·  giveMeCoins                  ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Deployments                                   ·                                ·  % of limit      ·                │
·················································|··········|··········|··········|··················|·················
│  IController                                   ·  260848  ·  955874  ·  772428  ·             0 %  ·         11.74  │
·------------------------------------------------|----------|----------|----------|------------------|----------------·

  64 passing (2m)

```