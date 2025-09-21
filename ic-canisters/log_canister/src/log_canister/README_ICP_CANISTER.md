# log_canister (ICP) — quick instructions


This canister logs prediction records on-chain for audit and transparency. It is intentionally minimal so it can be deployed quickly.


## Quick local deploy (recommended before mainnet)
1. Install dfx (DFINITY SDK) if not already installed: see https://internetcomputer.org/docs
2. From this folder run:
```bash
dfx start --background
dfx deploy

Place the generated `declarations` (after running `dfx generate`) under your frontend or import directly from the relative path. Example helper you can add to your React app `frontend/src/ic/logActor.js`:


```javascript
// frontend/src/ic/logActor.js
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as log_idl } from '../../../ic-canisters/log_canister/declarations/log_canister/log_canister.did.js';


// Replace with your deployed canister ID (mainnet or local)
export const LOG_CANISTER_ID = process.env.REACT_APP_LOG_CANISTER_ID || '<SAMPLE_CANISTER_ID_PLACEHOLDER>';


// Use mainnet gateway by default (for production)
const agent = new HttpAgent({ host: 'https://ic0.app' });


// For local dev ONLY (uncomment when testing locally):
// await agent.fetchRootKey();


export const logActor = Actor.createActor(log_idl, {
agent,
canisterId: LOG_CANISTER_ID,
});

SAMPLE_CANISTER_ID: ryjl3-tyaaa-aaaaa-aaaba-cai