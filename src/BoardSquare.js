import React from "react";
import Square from "./Square";
import { ItemTypes } from "./Constants";
import { DropTarget } from "react-dnd";

const squareTarget = {
  // canDrop(props) {
  //   return true;
  // },
  // hover(props) {
  // }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class BoardSquare extends React.Component {
  render() {
    const { x, y, connectDropTarget, color } = this.props;
    const index = [x, y];

    return connectDropTarget(
      <div
        className="BoardSquare"
        onDragStart={() => this.props.onDragStart(index)}
        onDrop={() => this.props.onDrop(index)}
        onDragEnter={() => this.props.onDragOver(index)}
        onClick={() => this.props.onClick(index)}
      >
        <Square color={this.props.color}>{this.props.children}</Square>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.PINNE, squareTarget, collect)(BoardSquare);
