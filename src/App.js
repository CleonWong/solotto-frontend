import React, { Component } from "react";
import "./dist/style.css";

import PokerChipLogo from "./poker-chip.svg";

import TitleDesc from "./titleDesc.js";
import Content from "./content.js";
import BuyButton from "./buyButton.js";
import { setupConnection } from "./utils/prog.js";

// ----------

class App extends Component {
  state = [];

  render() {
    return (
      <div className="container">
        <img className="logo" src={PokerChipLogo} alt="Poker chip logo" />
        <TitleDesc />
        <Content />
        <BuyButton />
      </div>
    );
  }
}

export default App;
