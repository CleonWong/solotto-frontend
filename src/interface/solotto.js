import * as anchor from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

import idl from "./solotto.json";

const CLUSTER = "http://localhost:8899";
const PROVIDER_URL = "https://www.sollet.io";
const PROGRAM_ID = "6cARHq7CYbnhyC811wiiVb4deNECobFtTdSB3dJSsgTA";
const PROGRAM_ID_CLEON = "BATC45YywFwWHLK1jm1PVKoWvonXzG3b66nwPB5a6ihp";

async function connectWallet() {
  let wallet = new Wallet(PROVIDER_URL);
  wallet.on("connect", (publicKey) =>
    console.log("Connected to " + publicKey.toBase58())
  );
  wallet.on("disconnect", () => console.log("Disconnected"));
  await wallet.connect();
  return wallet;
}

async function solottoProgram(wallet) {
  const provider = new anchor.Provider(
    new Connection(CLUSTER),
    wallet,
    anchor.Provider.defaultOptions()
  );
  anchor.setProvider(provider);
  const programId = new anchor.web3.PublicKey(PROGRAM_ID_CLEON);
  return new anchor.Program(idl, programId);
}

export { connectWallet, solottoProgram };
