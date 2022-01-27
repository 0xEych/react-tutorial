export type State = {
  history: { squares: Squares }[];
  stepNumber: number;
  xIsNext: boolean;
};

export type Squares = number[] | string[];

export type SquareProps = {
  value: number | string;
  onClick: () => void;
};

export type BoardProps = {
  squares: Squares;
  onClick: (i: number) => void;
};
