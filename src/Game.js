import React from "react";
import Board from "./Board";
import BoardStatus from "./BoardStatus";
import BoardOptions from "./BoardOptions";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: this.props.value.map(arr => (arr = arr.slice()))
        }
      ],
      stepNumber: 0,
      squareMoves: null,
      boardMoves: this.boardMoves(this.props.value.slice()),
      current: null,
      middle: null
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      current: null,
      squareMoves: null,
      boardMoves: this.boardMoves(this.state.history[step].squares).slice()
    });
  }

  handleClick(square) {
    const squares = this.state.history[this.state.stepNumber].squares.slice();
    const validMove = this.squareMoves(squares, square);

    this.setState({
      squareMoves: validMove
    });
  }

  handleDragStart(square) {
    const squares = this.state.history[this.state.stepNumber].squares.slice();
    // const validMove = squareMoves(squares, square);
    this.setState({
      current: square,
      squareMoves: null
    });
  }

  // ghosts the middle pin.
  handleDragOver(square) {
    const lastSquare = this.state.current;
    const squares = this.state.history[this.state.stepNumber].squares.slice();
    const possibleMoves = this.squareMoves(squares, square);

    // check if this move if in the list of possible moves
    const thisMoveValid = this.containsCoordinate(possibleMoves, lastSquare);

    if (thisMoveValid) {
      const middlePin = this.squareBetween(square, lastSquare);
      this.setState({
        middle: middlePin
      });
    } else {
      this.setState({
        middle: null
      });
    }
  }

  handleDrop(square) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.map(arr => (arr = arr.slice()));
    const lastSquare = this.state.current;
    const possibleMoves = this.squareMoves(squares, square);
    // check if this move if in the list of possible moves
    const thisMoveValid = this.containsCoordinate(possibleMoves, lastSquare);

    if (thisMoveValid) {
      const middlePin = this.squareBetween(square, lastSquare);
      squares[square[0]][square[1]] = squares[lastSquare[0]][lastSquare[1]];
      squares[lastSquare[0]][lastSquare[1]] = null;
      squares[middlePin[0]][middlePin[1]] = null;

      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        middle: null,
        boardMoves: this.boardMoves(squares)
      });
    }
  }

  squareBetween(a, b) {
    const x = a[0] > b[0] ? (a[0] + b[0]) / 2 : a[0] + (b[0] - a[0]) / 2;
    const y = a[1] > b[1] ? (a[1] + b[1]) / 2 : a[1] + (b[1] - a[1]) / 2;
    return [x, y];
  }

  containsCoordinate(array, c) {
    return array
      ? array.filter(array => array[0] === c[0] && array[1] === c[1]).length > 0
      : null;
  }
  /*
    return a list of all the pins that can be moved.
  */
  boardMoves(squares) {
    let moves = [];
    for (let x = 0; x < squares.length; x++) {
      for (let y = 0; y < squares[x].length; y++) {
        if (squares[x][y] == null) {
          moves = moves.concat(this.squareMoves(squares, [x, y]));
        }
      }
    }
    return moves;
  }

  not(x, n) {
    return n ? !x : x;
  }

  /*
    Returns as list of pins, based on the square position, that can be moved.
  */
  squareMoves(squares, move) {
    const [x, y] = move;
    let possibleMoves = [];
    let n = false;

    // To distinguish from moveto and movefrom square at click
    if (squares[x][y] != null && !squares[x][y].type) {
      return null;
    }
    if (squares[x][y]) {
      n = true;
    }
    // left pin
    if (y - 3 >= 0 && this.not(squares[x][y - 2], n) && squares[x][y - 1]) {
      possibleMoves.push([x, y - 2]);
    }
    // right pin
    if (
      y + 3 <= squares[x].length - 1 &&
      this.not(squares[x][y + 2], n) &&
      squares[x][y + 1]
    ) {
      possibleMoves.push([x, y + 2]);
    }
    // above pin
    if (
      x + 3 <= squares.length - 1 &&
      this.not(squares[x + 2][y], n) &&
      squares[x + 1][y]
    ) {
      possibleMoves.push([x + 2, y]);
    }
    // down under pin
    if (x - 3 >= 0 && this.not(squares[x - 2][y], n) && squares[x - 1][y]) {
      possibleMoves.push([x - 2, y]);
    }

    return possibleMoves;
  }

  render() {
    const squares = this.state.history[this.state.stepNumber].squares;
    const middle = this.state.middle;
    const squareMoves = this.state.squareMoves;
    const boardMoves = this.state.boardMoves;

    const previous =
      this.state.stepNumber === 0
        ? this.state.stepNumber
        : this.state.stepNumber - 1;


    return (
      <div className="game-content">
        <BoardOptions
          onRestart={i => this.jumpTo(0)}
          onPrevious={i => this.jumpTo(previous)}
        >
          {this.props.children}
        </BoardOptions>
        <Board
          squares={squares}
          squareMoves={squareMoves}
          middle={middle}
          onDragStart={i => this.handleDragStart(i)}
          onDrop={i => this.handleDrop(i)}
          onDragOver={i => this.handleDragOver(i)}
          onClick={i => this.handleClick(i)}
        />
        <BoardStatus squares={squares} boardMoves={boardMoves} boardId={this.props.boardId}/>
      </div>
    );
  }
}
