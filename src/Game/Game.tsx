import React from "react";
import Board from "../Board/Board";

class Game extends React.Component<
  {}, // for props description
  { history: { squares: string[] }[]; currentID: number; xIsNext: boolean } // for this.state object description
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      currentID: 0,
      xIsNext: true,
    };
  }

  handleClick(id: number) {
    const historySnapshot = this.state.history.slice(
      0,
      this.state.currentID + 1
    );

    const currentSquaresState =
      historySnapshot[historySnapshot.length - 1].squares.slice();

    if (currentSquaresState[id] || this.calculateWinner(currentSquaresState)) {
      return;
    } else {
      currentSquaresState[id] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: historySnapshot.concat([{ squares: currentSquaresState }]),
        currentID: historySnapshot.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  jumpTo(id: number) {
    this.setState({
      currentID: id,
      xIsNext: id % 2 === 0,
    });

    console.log(this.state);
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
    const currentSquaresState =
      this.state.history[this.state.currentID].squares.slice();
    const winner = this.calculateWinner(currentSquaresState);
    const statusMessage = !winner
      ? `Next player: ${this.state.xIsNext ? "X" : "O"}`
      : `We have game winner: ${winner}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquaresState}
            onClick={(id: number) => this.handleClick(id)}
          />
        </div>

        <div className="game-info">
          <div>{statusMessage}</div>
          <ol>
            {this.state.history.map((_, stepID) => {
              const buttonMessage =
                stepID === 0 ? "Go to game start" : `Go to step ${stepID}`;
              return (
                <li key={stepID}>
                  <button onClick={() => this.jumpTo(stepID)}>
                    {buttonMessage}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
