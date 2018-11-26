import React from "react";
import ReactDOM from "react-dom";
import BoardSquare from "./BoardSquare";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { ItemTypes } from "./Constants";

class Board extends React.Component {
  specialSquareColor(x, y) {
    const squareWitdh = this.props.squares[x].length;
    const index = x * squareWitdh + y;
    let color = "Square ";

    const possibleMoves = this.props.squareMoves
      ? this.props.squareMoves.slice().map(a => a[0] * squareWitdh + a[1])
      : null;

    const middle = this.props.middle
      ? this.props.middle[0] * squareWitdh + this.props.middle[1]
      : null;

    if (possibleMoves && possibleMoves.includes(index)) {
      color += this.props.squares[x][y] === null ? "movesTo" : "movesFrom";
    }

    color = middle === index ? color + "ghost" : color;
    return color;
  }

  renderSquare(x, y) {
    const squareWitdh = this.props.squares[x].length;
    const index = x * squareWitdh + y;
    const color = this.specialSquareColor(x, y);

    return (
      <BoardSquare
        onDragStart={i => this.props.onDragStart(i)}
        onDrop={i => this.props.onDrop(i)}
        onDragOver={i => this.props.onDragOver(i)}
        onClick={i => this.props.onClick(i)}
        key={index}
        color={color}
        x={x}
        y={y}
      >
        {this.props.squares[x][y]}
      </BoardSquare>
    );
  }

  render() {
    const boardHeight = this.props.squares.length - 1;
    let columns = [];
    let index = 0;
    for (let x = 0; x <= boardHeight; x++) {
      let rows = [];
      const boardWidth = this.props.squares[x].length - 1;
      for (let y = 0; y <= boardWidth; y++) {
        rows.push(this.renderSquare(x, y));
      }
      columns.push(
        <div className="Board-row" key={x}>
          {rows}
        </div>
      );
    }
    return <div className="Board">{columns}</div>;
  }
}

export default DragDropContext(HTML5Backend)(Board);
