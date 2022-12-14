import React from "react";

function Square(props: { value: string; onClick: any }): JSX.Element {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export default Square;
