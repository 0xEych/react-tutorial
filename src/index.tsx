import { useState, VFC } from "react";
import ReactDOM from "react-dom";
import "./index.css";

type SquareType = number | string;

type SquareProps = {
  onClick: () => void;
  isWin: boolean;
  square: SquareType;
};

const Square: VFC<SquareProps> = ({ onClick, isWin, square }) => {
  return (
    <button
      className="square"
      onClick={onClick}
      style={{ backgroundColor: isWin ? "yellow" : "inherit" }}
    >
      {square}
    </button>
  );
};

export type BoardProps = {
  squares: SquareType[];
  winLine: number[];
  onClick: (i: number) => void;
};

const Board: VFC<BoardProps> = ({ squares, winLine, onClick }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        square={squares[i]}
        isWin={winLine.includes(i)}
        onClick={() => onClick(i)}
        key={i}
      />
    );
  };

  return (
    <div>
      {Array(3)
        .fill(0)
        .map((val, i) => {
          return (
            <div className="board-row" key={i}>
              {Array(3)
                .fill(0)
                .map((val2, j) => {
                  return renderSquare(i * 3 + j);
                })}
            </div>
          );
        })}
    </div>
  );
};

type State = {
  history: { squares: SquareType[]; changed: number }[];
  stepNumber: number;
  xIsNext: boolean;
};

const Game: VFC = () => {
  const initialState: State = {
    history: [
      {
        squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        changed: 0,
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  };
  const [state, setState] = useState(initialState);

  const [movesSort, setMovesSort] = useState(false);

  const history = state.history.slice(0, state.stepNumber + 1);
  const current = history[state.stepNumber];
  const squares = current.squares.slice();
  const winner = calculateWinner(current.squares);
  // console.log(squares);

  const moves = history.map((step, move) => {
    const desc = move
      ? "Go to move #" +
        move +
        " (col" +
        ((step.changed % 3) + 1) +
        ", row" +
        Math.ceil((step.changed + 1) / 3) +
        ")"
      : "Go to move start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  // console.log(moves.length);

  const status =
    moves.length === 10 && winner === false
      ? "DRAW"
      : winner !== false
      ? "Winner: " + winner.winner
      : "Next player: " + (state.xIsNext ? "X" : "O");

  const handleClick = (i: number) => {
    // ゲームセットショートreturn
    if (
      calculateWinner(squares) !== false ||
      squares[i] === "X" ||
      squares[i] === "O"
    )
      return;

    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares: squares,
          changed: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step: number) => {
    setState((prev) => ({
      // history: state.history,
      ...prev,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winLine={winner !== false ? winner.line : []}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setMovesSort(!movesSort)}>
          Sort: {movesSort ? "▼" : "▲"}
        </button>
        <ol style={{ flexDirection: movesSort ? "column" : "column-reverse" }}>
          {moves}
        </ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares: SquareType[]) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return false;
};
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
