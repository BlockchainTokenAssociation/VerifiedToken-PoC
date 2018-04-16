module.exports = {
    norpc: true,
    copyNodeModules: false,
    compileCommand: '../node_modules/.bin/truffle compile',
    testCommand: '../node_modules/.bin/truffle test --network coverage',
    copyPackages: ['zeppelin-solidity']
}