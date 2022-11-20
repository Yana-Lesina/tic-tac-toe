import React from "react";
import Square from "../Square/Square";

class Board extends React.Component<{ squares: string[]; onClick: any }> {
  renderSquare(id: number) {
    return (
      <Square
        value={this.props.squares[id]}
        onClick={() => this.props.onClick(id)}
      />
    );
  }

  render() {
    return (
      <>
        {[0, 1, 2].map((_, id) => {
          return (
            <div key={id} className="board-row">
              {this.renderSquare(id)}
              {this.renderSquare(id + 3)}
              {this.renderSquare(id + 3 * 2)}
            </div>
          );
        })}
      </>
    );
  }
}

export default Board;
