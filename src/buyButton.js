import React, { Component } from "react";
import * as anchor from "@project-serum/anchor";
import { setupConnection } from "./utils/prog.js";

// ----------

class BuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkConnection: 0,
    };
  }

  sayHello = async (network) => {
    // this.setState({
    //   networkConnection: this.state.networkConnection + 1,
    // });
    // alert(this.state.networkConnection);
    const connection = setupConnection("http://127.0.0.1:8899");
    let recentBlockhash = await connection.getRecentBlockhash(); // Promise object.
    alert(recentBlockhash.blockhash);
  };

  render() {
    return (
      <button className="button__active" onClick={this.sayHello}>
        Buy lottery ticket!
      </button>
    );
  }
}

export default BuyButton;
