import React from "react";
import { ItemTypes } from "./Constants";
import { DragSource } from "react-dnd";
import dotImage from './dot.png'

const PinneSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Pinne extends React.Component {

  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div
        className="Pinne"
        style={{
          opacity: isDragging ? 0.0 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        <img src={dotImage} className="dot"/>
      </div>
    );
  }
}

export default DragSource(ItemTypes.PINNE, PinneSource, collect)(Pinne);
