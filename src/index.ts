import express from "express";
const app = express();

app.use(express.json());

let ETH_BALANCE = 1000;
let USDC_BALANCE = 3117000;

app.post("/buy", (req, res) => {
  const quantity = req.body.quantity;

  const updateEthQuantity = ETH_BALANCE - quantity; // 1000 - 1 = 999
  const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updateEthQuantity; // 1000 * 3117000 / 999 = 3120120.1201201203
  const paidAmount = updatedUsdcBalance - USDC_BALANCE; // 3120120.1201201203 - 3117000 = 3120.1201201203
  ETH_BALANCE = updateEthQuantity;
  USDC_BALANCE = updatedUsdcBalance;
  res.json({
    message: `You bought ${quantity} ETH for ${paidAmount} USDC`,
  });
});

app.post("/sell", (req, res) => {
  const quantity = req.body.quantity;

  const updateEthQuantity = ETH_BALANCE + quantity; // 1000 + 1 = 1001
  const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updateEthQuantity; // 1000 * 3117000 / 1001 = 3113886.1138861137
  const gottenAmount = USDC_BALANCE - updatedUsdcBalance; // 3113886.1138861137 - 3117000 = -3113.8861138863
  ETH_BALANCE = updateEthQuantity;
  USDC_BALANCE = updatedUsdcBalance;
  res.json({
    message: `You sold ${quantity} ETH for ${gottenAmount} USDC`,
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
