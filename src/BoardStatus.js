import React from "react";
import store from "./Store";

export default class BoardStatus extends React.Component {

  updateStatus(squares, possibleMoves) {
    let status =
      squares.reduce(
        (total, a) => total + a.filter(x => x && x.type).length,
        0
      ) + " left.";
    if (status === "1 left.") {
      status = "You are brilliant!";
      store.dispatch({type: "completed", value: parseInt(this.props.boardId)+1});
    } else if (possibleMoves.length == 0) {
      status = "Press restart to try again!";
    }
    return status;
  }

  render() {
    const status = this.updateStatus(this.props.squares, this.props.boardMoves);
    let completed = store.getState();

    return (
      <div className="game-info">
        <p className="status">{status}</p>
        <ul>
        {completed ? completed.map(b => <li key={b}><p> &#9745; Board {b}</p></li>) : null }
        </ul>
      </div>
    );
  }
}
