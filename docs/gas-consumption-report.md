# Gas consumption report
performed by Blockchain Labs, April 28, 2018


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
      ✓ should update confirmations number and fire an event (28391 gas)
    updateRequiredData()
      ✓ should fail if number of keys not the same as the number of values (25571 gas)
      ✓ should update key => value pairs and fire an event for each pair (135742 gas)
    isReceiverVerified()
      ✓ should return TRUE if required number of confirmations = 0 (14164 gas)
      ✓ should return FALSE if required number of confirmations > 0 (43391 gas)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    updateRegistries()
      ✓ should fail if registry address is not a contract (23632 gas)
      ✓ should fail if registry is not a registry contract (26864 gas)
      ✓ should fail if zero address (23568 gas)
      ✓ otherwise, should update list of registries and fire an event (66208 gas)
    getNumberOfConfirmationsRequired()
      ✓ should return the number (28391 gas)
    getRequiredData()
      ✓ should return the data (key=>value pairs)
    getRegistries()
      ✓ should return the list of registries

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

  Contract: Token.sol
    transfer()
      ✓ should success for known receiver (239814 gas)
      ✓ should fail for unknown address (31673 gas)
    transferFrom()
      ✓ should fail for unknown address (32942 gas)
      ✓ should success for known receiver (160287 gas)
    getController()
      ✓ should return the controller address
    changeController()
      ✓ should fail if non-owner trying to change controller (23309 gas)
      ✓ owner should be able to change controller (30395 gas)
      ✓ should fire an event on changing controller (30395 gas)
      ✓ should fail if new controller is the same as an old one (23619 gas)

·---------------------------------------------------------------------------------|-----------------------------------·
│                                       Gas                                       ·  Block limit: 17592186044415 gas  │
·················································|································|····································
│  Methods                                       ·          21 gwei/gas           ·          677.29 usd/eth           │
·················|·······························|··········|··········|··········|··················|·················
│  Contract      ·  Method                       ·  Min     ·  Max     ·  Avg     ·  # calls         ·  usd (avg)     │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateRegistries             ·       -  ·       -  ·   66208  ·               1  ·          0.94  │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateRequiredConfirmations  ·   14164  ·   43391  ·   28584  ·               4  ·          0.41  │
·················|·······························|··········|··········|··········|··················|·················
│  IController   ·  updateRequiredData           ·   86572  ·  135742  ·  111157  ·               2  ·          1.58  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  remove                       ·       -  ·       -  ·   24705  ·               1  ·          0.35  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  update                       ·   32428  ·   93499  ·   78022  ·               7  ·          1.11  │
·················|·······························|··········|··········|··········|··················|·················
│  Registry      ·  updateOperator               ·   30618  ·   45618  ·   40618  ·               3  ·          0.58  │
·················|·······························|··········|··········|··········|··················|·················
│  RegistryMock  ·  testAddAttribute             ·       -  ·       -  ·   67972  ·               1  ·          0.97  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  approve                      ·       -  ·       -  ·   45536  ·               1  ·          0.65  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  changeController             ·       -  ·       -  ·   30395  ·               2  ·          0.43  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  decreaseApproval             ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  increaseApproval             ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transfer                     ·       -  ·       -  ·   59957  ·               1  ·          0.85  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transferFrom                 ·       -  ·       -  ·   67345  ·               1  ·          0.96  │
·················|·······························|··········|··········|··········|··················|·················
│  Token         ·  transferOwnership            ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  TokenMock     ·  giveMeCoins                  ·       -  ·       -  ·       -  ·               0  ·             -  │
·················|·······························|··········|··········|··········|··················|·················
│  Deployments                                   ·                                ·  % of limit      ·                │
·················································|··········|··········|··········|··················|·················
│  IController                                   ·  260848  ·  955874  ·  767173  ·             0 %  ·         10.91  │
·------------------------------------------------|----------|----------|----------|------------------|----------------·

  45 passing (1m)
