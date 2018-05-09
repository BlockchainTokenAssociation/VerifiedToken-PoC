# Test coverage report
performed by Blockchain Labs, May 9, 2018

```

  Contract: Attribute.sol
    attributeExists()
      ✓ should return FALSE if the attribute does not exist
      ✓ should return TRUE if the attribute does exist
    addAttribute()
      ✓ should return true on adding new attribute (118ms)
      ✓ should fail if called by non-operator (54ms)

  Contract: Controller.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event (51ms)
    updateReceiverRequirements()
      ✓ should fail if number of keys not the same as the number of values (47ms)
      ✓ should update attribute => value pairs and fire an event for each pair (117ms)
      ✓ should update ZERO attribute => value pairs and fire an event for each pair (74ms)
    updateSenderRequirements()
      ✓ should fail if number of keys not the same as the number of values (48ms)
      ✓ should update attribute => value pairs and fire an event for each pair (98ms)
    updateRegistries()
      ✓ should fail if registry1 address is not a contract (48ms)
      ✓ should fail if a proposed registry is not a registry contract (64ms)
      ✓ should fail if zero address (50ms)
      ✓ otherwise, should update list of registries and fire an event (113ms)
    getRegistries()
      ✓ should return the list of registries
    getNumberOfConfirmationsRequired()
      ✓ should return the number (74ms)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    getReceiverRequirements()
      ✓ should return the data (attribute => value pairs) (143ms)
      ✓ should return empty arrays if requirements are empty (166ms)
    getSenderRequirements()
      ✓ should return the data (attribute => value pairs) (142ms)
      ✓ should return empty arrays if requirements are empty (169ms)
    isReceiverVerified()
      ✓ should return TRUE for verified receiver (225ms)
      ✓ should return FALSE for receiver verified by lesser number of registries than it required (237ms)
      ✓ should return FALSE for partially verified receiver (218ms)
      ✓ should return TRUE for receiver verified more than 1 registry (289ms)
      ✓ should return FALSE for unknown receiver (199ms)
      ✓ should return FALSE if no receiver requirements were set (199ms)
    isSenderVerified()
      ✓ should return TRUE for verified sender (260ms)
      ✓ should return FALSE for sender verified by lesser number of registries than it required (236ms)
      ✓ should return FALSE for partially verified sender (216ms)
      ✓ should return FALSE for unknown sender (214ms)
      ✓ should return TRUE for sender verified more than 1 registry (204ms)
      ✓ should return FALSE if no sender requirements were set (199ms)
    isTransferAllowed()
      ✓ should return TRUE if confirmations required == 0 (62ms)

  Contract: Operator.sol
    isOperator()
      ✓ should return FALSE if address is non-listed
      ✓ should return TRUE if address is listed (63ms)
    updateOperator()
      ✓ owner should be able to add address to the list of operators (119ms)
      ✓ non-owner should fail to add address to the list of operators
      ✓ event should be fired on adding the new operator (41ms)
    modifier onlyOperator()
      ✓ should fail when called by non-operator
      ✓ should return TRUE if called by operator (43ms)

  Contract: Registry.sol
    hasAttribute()
      ✓ should return TRUE if key is exist
    update()
      ✓ should add a new attribute if it does not exist yet (105ms)
      ✓ should update record (76ms)
      ✓ should fire an event (66ms)
      ✓ should fail if called by non-operator
    verify()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the ATTRIBUTE => VALUE pair
    remove()
      ✓ should fire an event (64ms)
      ✓ record should be deleted
    expose()
      ✓ should return attribute=>value pairs for given address (249ms)

  Contract: Token.sol
    transfer()
      ✓ should succeed for known receiver and sender (520ms)
      ✓ should fail when transfer to non-verified receiver (223ms)
      ✓ should fail if send by non-authorized sender (132ms)
    transferFrom()
      ✓ should succeed for known receiver and sender (513ms)
      ✓ should fail when transfer to non-verified receiver (240ms)
      ✓ should fail if send by non-authorized sender (278ms)
    getController()
      ✓ should return the controller address
    changeController()
      ✓ should fail if non-owner trying to change controller (54ms)
      ✓ owner should be able to change controller (68ms)
      ✓ should fire an event on changing controller (50ms)
      ✓ should fail if new controller is the same as an old one (49ms)


  64 passing (10s)

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
