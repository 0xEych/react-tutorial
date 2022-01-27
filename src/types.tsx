export type State = {
  history: { squares: Squares; changed: number }[];
  stepNumber: number;
  xIsNext: boolean;
};

export type Squares = number[] | string[];

export type SquareProps = {
  square: number | string;
  isWin: boolean;
  onClick: () => void;
};

export type BoardProps = {
  squares: Squares;
  winLine: number[];
  onClick: (i: number) => void;
};
