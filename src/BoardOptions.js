import React from "react";

export default class BoardOptions extends React.Component {
  render() {
    return (
      <div className="BoardOptions">
        <div className="OptionButtons">
          {this.props.children}
          <button onClick={this.props.onRestart}>restart</button>
          <button onClick={this.props.onPrevious}>previous</button>
        </div>
      </div>
    );
  }
}
