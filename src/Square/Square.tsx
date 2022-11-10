import React from "react";

type SquareStateType = {
  value: "string" | null;
};

class Square extends React.Component<
  { value: string | null; onClick: any },
  { value: string | null }
> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
