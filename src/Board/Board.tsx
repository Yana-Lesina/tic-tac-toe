import React from "react";
import Square from "../Square/Square";

class Board extends React.Component<
  {},
  { squares: string[]; xIsNext: boolean }
> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i: number) {
    const newSquares = this.state.squares.slice();
    newSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: newSquares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(id: number) {
    return (
      <Square
        value={this.state.squares[id]}
        onClick={() => this.handleClick(id)}
      />
    );
  }

  calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    //const status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    const winner = this.calculateWinner(this.state.squares);
    const status = !winner
      ? `Next player: ${this.state.xIsNext ? "X" : "O"}`
      : `We have winner: ${winner}`;
    return (
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
    );
  }
}

export default Board;
