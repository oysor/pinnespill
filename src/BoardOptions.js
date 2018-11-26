import React from "react";

export default class BoardOptions extends React.Component {
  render() {
    return (
      <div className="BoardOptions">
        {this.props.children}
        <button onClick={this.props.onRestart}>restart</button>
        <button onClick={this.props.onPrevious}>previous</button>
      </div>
    );
  }
}
