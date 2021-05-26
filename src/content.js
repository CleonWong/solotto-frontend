import React, { Component } from "react";

// ----------

const Status = () => {
  return (
    <div className="content__item">
      <p className="bodyStrong">Status:</p>
      <p>testing</p>
    </div>
  );
};

const NumPlayers = () => {
  return (
    <div className="content__item">
      <p className="bodyStrong">Number of players in this game:</p>
      <p>testing</p>
    </div>
  );
};

const PrevWinner = (props) => {
  return (
    <div className="content__item">
      <p className="bodyStrong">Previous game's winner:</p>
      <p>testing</p>
    </div>
  );
};

class Content extends Component {
  render() {
    return (
      <div className="content">
        <Status />
        <NumPlayers />
        <PrevWinner />
      </div>
    );
  }
}

export default Content;
