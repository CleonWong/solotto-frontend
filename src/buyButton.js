import React, { Component } from "react";
import solottoProgram from "./interface/solotto";

// ----------

class BuyButton extends Component {
  render() {
    return <button className="button__active" onClick={this.buyTicket}>Buy lottery ticket!</button>;
  }

  async buyTicket() {
    let solotto = await solottoProgram();
    // note: you will need to have initialized the state account with solotto.state.rpc.new() separately
    // else this will return "no such account"
    console.log(await solotto.state());
  }
}

export default BuyButton;
