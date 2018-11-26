import React from "react";

export default class Square extends React.Component {
  render() {
    let child = this.props.children;
    let squareStyle = this.props.color;

    if (child) {
      if (!child.type) {
        squareStyle = child;
        child = "";
      }
    }
    return <div className={squareStyle}>{child}</div>;
  }
}
