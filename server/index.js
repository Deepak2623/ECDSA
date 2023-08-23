const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "a1e92f9124b40a04888ba6d9ad972102978daef58ca9fa82fe978303d723ec0e": 100,
  "ac69b12427bea4a0c35d895b19a1ddcd0b627aba0f2ab1df61550dd6f6cb42d3": 50,
  "dc1d7f11be95bfcdfd33bcca6ffb7b228d44c15dce2fec9333a48ba5d7d844ef": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
