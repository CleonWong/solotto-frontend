import * as anchor from "@project-serum/anchor";
import * as solanaWeb3 from "@solana/web3.js";
import idl from "./solotto.json";

// ----------

const progID = "ARYHVFKNcRdZ8jUWkSCRCMoCx9wSH71S2PA14GAqyCap";

export function setupConnection(network) {
  // `network`  is the URL to the fullnode JSON RPC endpoint.

  const connection = new solanaWeb3.Connection(network);

  return connection;
}

export function setTransactionInstruction(data, keys, programId) {
  // keys = [isSigner, isWritable, pubkey]

  const transInstruct = new solanaWeb3.TransactionInstruction(
    data,
    keys,
    programId
  );

  const trans = new solanaWeb3.Transaction(transInstruct);

  return trans;
}

// Read the generated IDL.
// const idl = JSON.parse(
//   require("fs").readFileSync("../solotto/target/idl/solotto.json", "utf8")
// );

// Address of the deployed program.
const programId = new anchor.web3.PublicKey(progID);

// Generate the program client from IDL.
// const solotto = new anchor.Program(idl, programId);

// export default solotto;
// export default programId;
