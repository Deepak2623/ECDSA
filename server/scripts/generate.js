const secp = require("ethereum-cryptography/secp256k1");
const { toHex, randomPrivateKey } = require("ethereum-cryptography/utils");

const private_key = secp.secp256k1.utils.randomPrivateKey();

console.log("private key", toHex(private_key));
const public_key = toHex(secp.secp256k1.getPublicKey(private_key));
console.log(public_key);
