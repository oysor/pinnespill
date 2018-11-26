import React from "react";
import Game from "./Game";
import Pinne from "./Pinne";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: this.boards(),
      boardIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  boards(p = <Pinne />) {
    const x = "";
    const b = "b";
    const t = "t";
    const r = "r";
    const l = "l";
    const tr = "tr";
    const br = "br";
    const bl = "bl";
    const tl = "tl";
    return [
      Array(
        [x, b, b, b, b, b, x],
        [r, p, p, p, p, p, l],
        [r, p, p, p, p, p, l],
        [r, p, p, p, p, p, l],
        [r, p, p, null, p, p, l],
        [r, p, p, p, p, p, l],
        [r, p, p, p, p, p, l],
        [r, p, p, p, p, p, l],
        [x, t, t, t, t, t, x]
      ),
      Array(
        [x, x, x, b, b, b, x, x, x],
        [x, x, r, p, p, p, l, x, x],
        [x, b, br, p, p, p, bl, b, x],
        [r, p, p, p, p, p, p, p, l],
        [r, p, p, p, null, p, p, p, l],
        [r, p, p, p, p, p, p, p, l],
        [x, t, tr, p, p, p, tl, t, x],
        [x, x, r, p, p, p, l, x, x],
        [x, x, x, t, t, t, x, x, x]
      ),
      Array(
        [x, x, x, b, b, b, x, x, x],
        [x, x, br, p, p, p, bl, x, x],
        [x, br, p, p, p, p, p, bl, x],
        [r, p, p, p, p, p, p, p, l],
        [r, p, p, p, null, p, p, p, l],
        [r, p, p, p, p, p, p, p, l],
        [x, tr, p, p, p, p, p, tl, x],
        [x, x, tr, p, p, p, tl, x, x],
        [x, x, x, t, t, t, x, x, x]
      ),
      Array(
        [x, x, x, b, b, b, x, x, x, x],
        [x, x, r, p, p, p, l, x, x, x],
        [x, x, r, p, p, p, l, x, x, x],
        [x, b, br, p, p, p, bl, b, b, x],
        [r, p, p, p, p, p, p, p, p, l],
        [r, p, p, p, null, p, p, p, p, l],
        [r, p, p, p, p, p, p, p, p, l],
        [x, t, tr, p, p, p, tl, t, t, x],
        [x, x, r, p, p, p, l, x, x, x],
        [x, x, x, t, t, t, x, x, x, x]
      ),
      Array([x, b, b, b, x], [r, p, p, null, l], [x, t, t, t, x]),
      Array(
        [x, b, b, b, b, b, x],
        [r, p, p, p, p, null, l],
        [r, p, p, p, null, p, l],
        [r, p, p, p, p, p, l],
        [x, t, t, t, t, t, x]
      )
    ];
  }

  // New board
  handleChange(event) {
    let newBoardIndex = event.target.value;
    this.setState(state => {
      return {
        boardIndex: newBoardIndex
      };
    });
  }

  render() {
    const boards = this.state.boards;
    const i = this.state.boardIndex;
    const board = boards[i];

    return (
      <Game value={board} key={i} boardId={i}>
        <select name="choose" value={i} onChange={this.handleChange}>
          <option name="Board1" value="0">
            Board 1
          </option>
          <option name="Board2" value="1">
            Board 2
          </option>
          <option name="Board3" value="2">
            Board 3
          </option>
          <option name="Board4" value="3">
            Board 4
          </option>
          <option name="TestBaord" value="4">
            Board 5 (easy)
          </option>
        </select>
      </Game>
    );
  }
}
