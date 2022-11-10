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
    const newSquares = this.state.squares.slice(); // копируем массив
    newSquares[i] = "X"; // меняем нужное значение
    this.setState({ squares: newSquares }); // перезаписываем состояние Board
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
                {this.renderSquare(id)} {/* по ссылке или по значению? */}
                {this.renderSquare(++id)}
                {this.renderSquare(++id)}
              </div>
            );
          })}
        </>
      </div>
    );
  }
}

export default Board;

// как оптимизировать рендер циклом? - сделала
// Что я забыла? Какие были ошибки?
// использовала forEach вместо .map, поэтому компоненты Square не рендерились. Всспомнила только благодаря гуглу
// забыла про свойство key для корректного ререндера
