# Test coverage report
performed by Blockchain Labs, April 16, 2018

```

  Contract: VerifiedToken.sol
    transfer()
      ✓ should success for known receiver (420ms)
      ✓ should fail for unknown address (114ms)
    transferFrom()
      ✓ should fail for unknown address (183ms)
      ✓ should success for known receiver (314ms)

  Contract: VerifiedTokenController.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event (47ms)
    updateRequiredData()
      ✓ should fail if number of keys not the same as the number of values (39ms)
      ✓ should update key => value pairs and fire an event for each pair (93ms)
    isVerified()
      ✓ should return TRUE if required number of confirmations = 0 (59ms)
      ✓ should return FALSE if required number of confirmations > 0 (124ms)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    updateRegistries()
      ✓ should fail if registry address is not a contract
      ✓ should fail if zero address (41ms)
      ✓ otherwise, should update list of registries and fire an event (80ms)
    getNumberOfConfirmationsRequired()
      ✓ should return the number (67ms)
    getRequiredData()
      ✓ should return the data (key=>value pairs) (57ms)
    getRegistries()
      ✓ should return the list of registries

  Contract: VerifiedTokenRegistry.sol
    isExist()
      ✓ should return TRUE if key is exist
    addNewKey()
      ✓ should return true on adding new key (80ms)
    updateRecord()
      ✓ should add a new key if it does not exist yet (101ms)
      ✓ should update record (73ms)
      ✓ should fire an event (58ms)
    findAddress()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the KEY => VALUE pair
    deleteAddress()
      ✓ should fire an event (50ms)
      ✓ record should be deleted
    getAddressPairs()
      ✓ should return key=>value pairs for given address (245ms)


  28 passing (3s)

```

<br><br>

File                            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------------------|----------|----------|----------|----------|----------------|
 contracts/                     |      100 |      100 |      100 |      100 |                |
  VerifiedToken.sol             |      100 |      100 |      100 |      100 |                |
  VerifiedTokenController.sol   |      100 |      100 |      100 |      100 |                |
  VerifiedTokenRegistry.sol     |      100 |      100 |      100 |      100 |                |
 contracts/mocks/               |      100 |      100 |      100 |      100 |                |
  VerifiedTokenMock.sol         |      100 |      100 |      100 |      100 |                |
  VerifiedTokenRegistryMock.sol |      100 |      100 |      100 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
All files                       |      100 |      100 |      100 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
