import React, { Component } from "react";
import * as anchor from "@project-serum/anchor";

import { connectWallet, solottoProgram } from "./interface/solotto";
import { gameStateToDisplay } from "./interface/utils";

// ----------

class BuyButton extends Component {
  render() {
    let state = localStorage.getItem("progState");
    try {
      state = JSON.parse(state);
      // in case users fk with local storage
    } catch (e) {
      console.log(e);
      state = null;
    }

    // gameState:
    const gameState = state ? gameStateToDisplay(state.gameState) : "fetching";

    if (gameState.toLowerCase() === "ongoing") {
      var buttonClass = "button__active";
      var buttonOnClick = this.buyTicket;
    } else {
      var buttonClass = "button__disabled";
      var buttonOnClick = null;
    }

    return (
      // <button className="button__active" onClick={this.buyTicket}>
      <button className={buttonClass} onClick={buttonOnClick}>
        Buy lottery ticket!
      </button>
    );
  }

  async buyTicket() {
    const wallet = await connectWallet();
    let solotto = await solottoProgram(wallet);
    const stateAddress = await solotto.state.address();
    const txHash = await solotto.state.rpc
      .buyTicket({
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
