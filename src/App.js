import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [slots, setSlots] = useState(Array(9).fill(null));
  const [user, setUser] = useState(true);
  const [count, setCount] = useState(0);

  function handleClick(i) {
    if (slots[i] || calculateWinner(slots)) {
      return;
    }

    let newSlots = slots.slice();

    if (user) {
      newSlots[i] = "X";
    } else {
      newSlots[i] = "O";
    }

    setSlots(newSlots);
    setUser(!user);
    setCount(count + 1);
  }

  const winner = calculateWinner(slots);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (user ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={slots[0]} onSquareClick={() => handleClick(0)} />
        <Square value={slots[1]} onSquareClick={() => handleClick(1)} />
        <Square value={slots[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={slots[3]} onSquareClick={() => handleClick(3)} />
        <Square value={slots[4]} onSquareClick={() => handleClick(4)} />
        <Square value={slots[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={slots[6]} onSquareClick={() => handleClick(6)} />
        <Square value={slots[7]} onSquareClick={() => handleClick(7)} />
        <Square value={slots[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

export default Board;
