import React, { Component } from "react";
import { gameStateToDisplay, hashToDisplay } from "./interface/utils";

const Status = (props) => {
  return (
    <div className="content__item">
      <p className="bodyStrong">Status:</p>
      <p>{props.gameState}</p>
    </div>
  );
};

const NumPlayers = (props) => {
  const MAX_PLAYERS = 32;

  return (
    <div className="content__item">
      <p className="bodyStrong">Number of players in this game:</p>
      <p>{props.numPlayers} / {MAX_PLAYERS}</p>
    </div>
  );
};

const Commit = (props) => {
  return (
    <div className="content__item">
      <p className="bodyStrong">Committed Hash:</p>
      <p>{props.hash}</p>
    </div>
  );
};

class Content extends Component {
  render() {
    let state = localStorage.getItem("progState");
    try {
      state = JSON.parse(state);
      // in case users fk with local storage
    } catch(e) {
      console.log(e);
      state = null;
    }

    const gameState = state ? gameStateToDisplay(state.gameState) : "fetching...";
    const numPlayers = state ? state.nPlayers : 0;
    const hash = (state && state.gameState.ongoing) ? hashToDisplay(state.commit).substr(0, 8) : "fetching...";

    return (
      <div className="content">
        <Status gameState={gameState}/>
        <NumPlayers numPlayers={numPlayers}/>
        <Commit hash={hash}/>
      </div>
    );
  }
}

export default Content;
