# Test coverage report
performed by Blockchain Labs, April 16, 2018

```
  Contract: VerifiedTokenRegistry.sol
    isExist()
      ✓ should return TRUE if key is exist
      ✓ should return FALSE if key is not exist
    addNewKey()
      ✓ should return true on adding new key (94ms)
    updateRecord()
      ✓ should add a new key if it does not exist yet (126ms)
      ✓ should update record (149ms)
      ✓ should fire an event (80ms)
    findAddress()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the KEY => VALUE pair
    deleteAddress()
      ✓ should fire an event (64ms)
      ✓ record should be deleted

  Contract: VerifiedToken.sol
    transfer()
      ✓ should success for known receiver (413ms)
      ✓ should fail for unknown address (113ms)
    transferFrom()
      ✓ should fail for unknown address (179ms)
      ✓ should success for known receiver (321ms)

  Contract: VerifiedTokenController.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event
    updateRequiredData()
      ✓ should fail if number of keys not the same as the number of values
      ✓ should update key => value pairs and fire an event for each pair (87ms)
    isVerified()
      ✓ should return TRUE if required number of confirmations = 0 (54ms)
      ✓ should return FALSE if required number of confirmations > 0 (120ms)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    updateRegistries()
      ✓ should fail if registry address is not a contract (39ms)
      ✓ should fail if zero address (42ms)
      ✓ otherwise, should update list of registries and fire an event (85ms)


  25 passing (3s)
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
