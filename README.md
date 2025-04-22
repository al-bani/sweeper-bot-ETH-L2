
# Sweeper Bot L2

monitor incoming ETH transactions to a specific wallet address (called the target address) on the Optimism blockchain. Once the bot detects that ETH has been received, it automatically transfers the full balance (minus gas fees) to another secure wallet (called the destination address).

The bot uses a WebSocket RPC connection to listen for new blocks in real-time. For each block, it checks if there are any transactions that send ETH to the target address. If there is, it waits a few seconds, calculates the available balance, estimates the gas fee, and sends the remaining ETH to the destination.


## Tech Stack

**Code:** NodeJS

**API Websocket:** [Ankr](https://www.ankr.com/rpc/?utm_referral=6Suehma3jm)


## Installation

Create Folder `name your project`

```bash
cd my-project
init my-project
```

Install library ethers and dotenv
```bash
npm i ethers@5
npm i dorenv
```

In file `package.json` change `  "type"` to
```bash
"type": "module",
```

Run your Project
```bash
node .
```
## Support

Buy me a Coffe : https://buymeacoffee.com/alcopoune


## Documentation

[Youtube Video ](https://youtu.be/dtFMwGnfHGI)

