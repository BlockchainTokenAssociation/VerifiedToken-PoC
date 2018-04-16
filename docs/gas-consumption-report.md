# Gas consumption report
performed by Blockchain Labs, April 16, 2018


```
  Contract: VerifiedTokenRegistry.sol
    isExist()
      ✓ should return TRUE if key is exist
      ✓ should return FALSE if key is not exist
    addNewKey()
      ✓ should return true on adding new key (83127 gas)
    updateRecord()
      ✓ should add a new key if it does not exist yet (93497 gas)
      ✓ should update record (32452 gas)
      ✓ should fire an event (93689 gas)
    findAddress()
      ✓ should return TRUE if address was found
      ✓ should return FALSE if ADDRESS was not found
      ✓ should return FALSE if address was NOT found in the KEY => VALUE pair
    deleteAddress()
      ✓ should fire an event (21687 gas)
      ✓ record should be deleted

  Contract: VerifiedTokenController.sol
    updateRequiredConfirmations()
      ✓ should update confirmations number and fire an event (28027 gas)
    updateRequiredData()
      ✓ should fail if number of keys not the same as the number of values (25501 gas)
      ✓ should update key => value pairs and fire an event for each pair (136532 gas)
    isVerified()
      ✓ should return TRUE if required number of confirmations = 0 (13982 gas)
      ✓ should return FALSE if required number of confirmations > 0 (43027 gas)
    isContract()
      ✓ should return FALSE if address is not a contract
      ✓ should return TRUE if address is a contract
    updateRegistries()
      ✓ should fail if registry address is not a contract (23109 gas)
      ✓ should fail if zero address (23045 gas)
      ✓ otherwise, should update list of registries and fire an event (81542 gas)

  Contract: VerifiedToken.sol
    transfer()
      ✓ should success for known receiver (255092 gas)
      ✓ should fail for unknown address (31192 gas)
    transferFrom()
      ✓ should fail for unknown address (32527 gas)
      ✓ should success for known receiver (159945 gas)


·---------------------------------------------------------------------------------------------|-----------------------------------·
│                                             Gas                                             ·  Block limit: 17592186044415 gas  │
······························································|·······························|····································
│  Methods                                                    ·          21 gwei/gas          ·          498.50 usd/eth           │
······························|·······························|·········|··········|··········|··················|·················
│  Contract                   ·  Method                       ·  Min    ·  Max     ·  Avg     ·  # calls         ·  chf (avg)     │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedToken              ·  approve                      ·      -  ·       -  ·   45588  ·               1  ·          0.48  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedToken              ·  decreaseApproval             ·      -  ·       -  ·       -  ·               0  ·             -  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedToken              ·  increaseApproval             ·      -  ·       -  ·       -  ·               0  ·             -  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedToken              ·  transfer                     ·      -  ·       -  ·   59685  ·               1  ·          0.62  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedToken              ·  transferFrom                 ·      -  ·       -  ·   66927  ·               1  ·          0.70  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenController    ·  updateRegistries             ·      -  ·       -  ·   81542  ·               1  ·          0.85  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenController    ·  updateRequiredConfirmations  ·  13982  ·   43027  ·   28345  ·               3  ·          0.30  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenController    ·  updateRequiredData           ·  86932  ·  136532  ·  111732  ·               2  ·          1.17  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenMock          ·  giveMeCoins                  ·      -  ·       -  ·       -  ·               0  ·             -  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenRegistry      ·  deleteAddress                ·      -  ·       -  ·   21687  ·               1  ·          0.23  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenRegistry      ·  transferOwnership            ·      -  ·       -  ·       -  ·               0  ·             -  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenRegistry      ·  updateRecord                 ·  32452  ·  108475  ·   75109  ·               5  ·          0.79  │
······························|·······························|·········|··········|··········|··················|·················
│  VerifiedTokenRegistryMock  ·  testAddNewKey                ·      -  ·       -  ·   83127  ·               1  ·          0.87  │
······························|·······························|·········|··········|··········|··················|·················
│  Deployments                                                ·                               ·  % of limit      ·                │
······························································|·········|··········|··········|··················|·················
│  VerifiedTokenMock                                          ·      -  ·       -  ·  639541  ·             0 %  ·          6.70  │
······························································|·········|··········|··········|··················|·················
│  VerifiedTokenRegistryMock                                  ·      -  ·       -  ·  415165  ·             0 %  ·          4.35  │
·-------------------------------------------------------------|---------|----------|----------|------------------|----------------·

  25 passing (39s)