import React from "react";
import Square from "../Square/Square";

type BoardPropsType = {
  value: string | null;
};

class Board extends React.Component<{}, { squares: any[] }> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  handleClick(i: number) {
    const newSquares = this.state.squares.slice();
    newSquares[i] = "X";
    this.setState({ squares: newSquares });
  }

  renderSquare(id: number) {
    return (
      <Square
        key={id}
        value={this.state.squares[id]}
        onClick={() => this.handleClick(id)}
      />
    );
  }

  render() {
    const status = `Next player: ${""}`;

    return (
      <div>
        <>
          <div className="status">{status}</div>
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
      </div>
    );
  }
}

export default Board;
