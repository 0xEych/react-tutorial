import { useState, VFC } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square: VFC<{ value: number | string; onClick: () => void }> = (
  props
) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board: VFC = () => {
  const [squares, setSquares] = useState<number[] | string[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const squareList = squares.slice();

  const handleClick = (i: number) => {
    if (
      calculateWinner(squareList) !== false ||
      squareList[i] === "X" ||
      squareList[i] === "O"
    )
      return;
    squareList[i] = xIsNext ? "X" : "O";
    setSquares(squareList);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squareList);
  const status =
    winner !== false
      ? "Winner: " + winner
      : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: VFC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squareList: number[] | string[]) => {
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
      squareList[a] &&
      squareList[a] === squareList[b] &&
      squareList[a] === squareList[c]
    ) {
      return squareList[a];
    }
  }
  return false;
};
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
