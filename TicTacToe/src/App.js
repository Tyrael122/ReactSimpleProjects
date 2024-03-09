import { useState } from "react";

export default function Game() {
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [highlightedSquare, setHighlightedSquare] = useState(null);

  const [squareTextMatrix, setSquareTextMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  return (
    <>
      <h1>{resolveHeaderText(winner, isXNext)}</h1>

      <Board
        isXNext={isXNext}
        setIsXNext={setIsXNext}
        setWinner={setWinner}
        squareTextMatrix={squareTextMatrix}
        setSquareTextMatrix={setSquareTextMatrix}
        highlightedSquare={highlightedSquare}
        setHighlightedSquare={setHighlightedSquare}
      />
      <button onClick={resetGame}>Reset game</button>
    </>
  );

  function resetGame() {
    setWinner(null);
    setIsXNext(true);
    setHighlightedSquare(null);
    setSquareTextMatrix(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );
  }
}

function resolveHeaderText(winner, isXNext) {
  if (winner != null) {
    if (winner == "") {
      return "Draw!!";
    }

    return `${winner} is the Winner!!`;
  }

  return `${isXNext ? "X" : "O"}'s turn!`;
}

function Board({
  isXNext,
  setIsXNext,
  setWinner,
  squareTextMatrix,
  setSquareTextMatrix,
  highlightedSquare,
  setHighlightedSquare
}) {
  const [numberOfPlays, setNumberOfPlays] = useState(0);

  function handleClick(row, column) {
    if (squareTextMatrix[row][column] != null) {
      return;
    }

    const newMatrix = squareTextMatrix.slice();

    newMatrix[row][column] = isXNext ? "X" : "O";
    setIsXNext(!isXNext);

    setSquareTextMatrix(newMatrix);

    setNumberOfPlays(numberOfPlays + 1);

    const winner = calculateWinner(squareTextMatrix, numberOfPlays); 
    setWinner(winner);
    if (winner == "X" || winner == "O") {
      setHighlightedSquare([row, column]);
    }
  }

  return (
    <>
      {squareTextMatrix.map((squaresText, index) => (
        <SquareRow
          key={index}
          handleSquareClick={handleClick}
          rowIndex={index}
          squaresText={squaresText}
          highlightedSquare={highlightedSquare}
        />
      ))}
    </>
  );
}

function SquareRow({
  handleSquareClick,
  squaresText,
  highlightedSquare,
  rowIndex,
}) {
  function isHighlighted(row, column) {
    if (highlightedSquare == null) return;

    return highlightedSquare[0] == row && highlightedSquare[1] == column;
  }
  return (
    <div className="board-row">
      {squaresText.map((text, index) => (
        <Square
          text={text}
          handleClick={() => handleSquareClick(rowIndex, index)}
          isHighlighted={isHighlighted(rowIndex, index)}
          key={index}
        />
      ))}
    </div>
  );
}

function Square({ text, isHighlighted, handleClick }) {
  const background = isHighlighted ? "yellow" : null;

  return (
    <button
      className="square"
      onClick={handleClick}
      style={{ background: background }}
    >
      {text}
    </button>
  );
}

function calculateWinner(board, numberOfPlays) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0]; // Row winner
    }
    if (
      board[0][i] !== "" &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i]; // Column winner
    }
  }

  // Check diagonals
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]; // Diagonal from top-left to bottom-right
  }
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]; // Diagonal from top-right to bottom-left
  }

  if (numberOfPlays == 8) {
    return "";
  }

  return null;
}
