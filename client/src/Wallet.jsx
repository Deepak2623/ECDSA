import React, { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";

function Wallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");

  async function onChange(evt) {
    const newPrivateKey = evt.target.value;
    setPrivateKey(newPrivateKey);

    try {
      const publicKey = secp.getPublicKey(newPrivateKey);
      const newAddress = toHex(publicKey);
      setAddress(newAddress);

      if (newAddress) {
        const response = await server.get(`balance/${newAddress}`);
        const {
          data: { balance },
        } = response;
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input
          placeholder="Type a private key"
          value={privateKey}
          onChange={onChange}
        />
      </label>
      <div>Address: {address.slice(0, 10)}...</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
