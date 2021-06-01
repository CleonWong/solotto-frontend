import React, { Component } from "react";
import "./dist/style.css";

import { fetchAndCacheProgState } from "./interface/utils";

import PokerChipLogo from "./poker-chip.svg";

import TitleDesc from "./titleDesc.js";
import Content from "./content.js";
import BuyButton from "./buyButton.js";

// ----------

class App extends Component {
  state = [];

  componentDidMount() {
    // forceUpdate() to rerender children with newly fetched game state
    fetchAndCacheProgState().then(() => this.forceUpdate());
    // fetchAndCacheProgState().then(console.log);
  }

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
