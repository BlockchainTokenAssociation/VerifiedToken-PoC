
// https://github.com/ethereum/web3.js/issues/337#issuecomment-197750774

export const toUtf8 = function(hex) {
    return web3.toAscii(hex).replace(/\u0000/g, '');
};