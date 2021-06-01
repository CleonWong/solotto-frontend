import React, { Component } from "react";
import { preProcessFile } from "typescript";
import { gameStateToDisplay, hashToDisplay } from "./interface/utils";

const Status = (props) => {
  // Text colour based on gameState:
  if (props.gameState === "fetching") {
    var statusClass = "fetching";
  } else {
    var statusClass = "status__" + props.gameState.toLowerCase();
  }
  return (
    <div className="content__item">
      <p className="bodyStrong">Status:</p>
      <p className={statusClass}>{props.gameState}</p>
    </div>
  );
};

const NumPlayers = (props) => {
  if (
    props.gameState.toLowerCase() === "inactive" ||
    props.gameState.toLowerCase() === "unknown"
  ) {
    var numPlayersClass = "numPlayers__na";
  } else {
    var numPlayersClass = null;
  }
  return (
    <div className="content__item">
      <p className="bodyStrong">Number of players in this game:</p>
      <p className={numPlayersClass}>
        {props.numPlayers} / {props.maxPlayers}
      </p>
    </div>
  );
};

const Commit = (props) => {
  // Text colour based on hash:
  if (props.hash === "fetching") {
    var commitClass = "fetching";
  } else if (props.hash === "N/A") {
    var commitClass = "commit__na";
  } else {
    var commitClass = null;
  }
  return (
    <div className="content__item">
      <p className="bodyStrong">Committed Hash:</p>
      <p className={commitClass}>{props.hash}</p>
    </div>
  );
};

class Content extends Component {
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

    // numPlayers
    const numPlayers = state ? state.nPlayers : 0;
    const maxPlayers = state ? state.players.length : 0;

    // Commit hash:
    if (
      gameState.toLowerCase() === "inactive" ||
      gameState.toLowerCase() === "unknown"
    ) {
      var hash = "N/A";
    } else {
      var hash =
        state && state.gameState.ongoing
          ? hashToDisplay(state.commit).substr(0, 8)
          : "fetching";
    }

    return (
      <div className="content">
        <Status gameState={gameState} />
        <NumPlayers
          gameState={gameState}
          numPlayers={numPlayers}
          maxPlayers={maxPlayers}
        />
        <Commit hash={hash} />
      </div>
    );
  }
}

export default Content;
