# Test coverage report
performed by Blockchain Labs, April 28, 2018

```

  Contract: Attribute.sol
    attributeExists()
      ✓ should return FALSE if the attribute does not exist
      ✓ should return TRUE if the attribute does exist (88ms)
    addAttribute()
      ✓ should return true on adding new attribute (105ms)
      ✓ should fail if called by non-operator (39ms)

  Contract: Operator.sol
    isOperator()
      ✓ should return FALSE if address is non-listed
      ✓ should return TRUE if address is listed (57ms)
    updateOperator()
      ✓ owner should be able to add address to the list of operators (60ms)
      ✓ non-owner should fail to add address to the list of operators
      ✓ event should be fired on adding the new operator
    modifier onlyOperator()
      ✓ should fail when called by non-operator
      ✓ should return TRUE if called by operator

  Contract: Registry.sol
    hasAttribute()
      ✓ should return TRUE if key is exist
    update()
      ✓ should add a new attribute if it does not exist yet (109ms)
      ✓ should update record (75ms)
      ✓ should fire an event (70ms)
      ✓ should fail if called by non-operator
    verify()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the ATTRIBUTE => VALUE pair
    remove()
      ✓ should fire an event (65ms)
      ✓ record should be deleted
    expose()
      ✓ should return attribute=>value pairs for given address (254ms)


  Contract: Controller.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event (41ms)
    updateRequiredData()
      ✓ should fail if number of keys not the same as the number of values
      ✓ should update key => value pairs and fire an event for each pair (90ms)
    isVerified()
      ✓ should return TRUE if required number of confirmations = 0 (57ms)
      ✓ should return FALSE if required number of confirmations > 0 (196ms)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    updateRegistries()
      ✓ should fail if registry address is not a contract (59ms)
      ✓ should fail if registry is not a registry contract (56ms)
      ✓ should fail if zero address (49ms)
      ✓ otherwise, should update list of registries and fire an event (120ms)
    getNumberOfConfirmationsRequired()
      ✓ should return the number (69ms)
    getRequiredData()
      ✓ should return the data (key=>value pairs) (53ms)
    getRegistries()
      ✓ should return the list of registries


  Contract: Token.sol
    transfer()
      ✓ should success for known receiver (289ms)
      ✓ should fail for unknown address (96ms)
    transferFrom()
      ✓ should fail for unknown address (162ms)
      ✓ should success for known receiver (290ms)
    getController()
      ✓ should return the controller address
    changeController()
      ✓ should fail if non-owner trying to change controller (43ms)
      ✓ owner should be able to change controller (60ms)
      ✓ should fire an event on changing controller (42ms)
      ✓ should fail if new controller is the same as an old one (50ms)


  45 passing (5s)


-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
 contracts/            |      100 |      100 |      100 |      100 |                |
  Attribute.sol        |      100 |      100 |      100 |      100 |                |
  Attributes.sol       |      100 |      100 |      100 |      100 |                |
  Controller.sol       |      100 |      100 |      100 |      100 |                |
  Operator.sol         |      100 |      100 |      100 |      100 |                |
  Registry.sol         |      100 |      100 |      100 |      100 |                |
  Token.sol            |      100 |      100 |      100 |      100 |                |
 contracts/interfaces/ |      100 |      100 |      100 |      100 |                |
  IController.sol      |      100 |      100 |      100 |      100 |                |
  IRegistry.sol        |      100 |      100 |      100 |      100 |                |
  IToken.sol           |      100 |      100 |      100 |      100 |                |
 contracts/mocks/      |      100 |      100 |      100 |      100 |                |
  OperatorMock.sol     |      100 |      100 |      100 |      100 |                |
  RegistryMock.sol     |      100 |      100 |      100 |      100 |                |
  TokenMock.sol        |      100 |      100 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|
All files              |      100 |      100 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|

```
