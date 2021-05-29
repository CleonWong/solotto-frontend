import React, { Component } from "react";
import * as anchor from "@project-serum/anchor";

import { connectWallet, solottoProgram } from "./interface/solotto";

// ----------

class BuyButton extends Component {
  render() {
    return <button className="button__active" onClick={this.buyTicket}>Buy lottery ticket!</button>;
  }

  async buyTicket() {
    const wallet = await connectWallet();
    let solotto = await solottoProgram(wallet);
    const stateAddress = await solotto.state.address();
    const txHash = await solotto.state.rpc.buyTicket({
      accounts: {
        buyer: wallet.publicKey,
        state: stateAddress,
        systemProg: anchor.web3.SystemProgram.programId
      }
    })
    .catch(console.log);
    alert(`Your transaction hash: ${txHash}`);
  }
}

export default BuyButton;
