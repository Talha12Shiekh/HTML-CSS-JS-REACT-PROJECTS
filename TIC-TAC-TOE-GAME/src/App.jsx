import { useState } from "react";

function Square({value,onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

export default function App() {
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  const [isnext,setisnext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function hanldeCLick(i) {
    if(squares[i]  && calculateWinner(squares)) return;
    const nextSqaures = squares.slice();
    if(isnext){
      nextSqaures[i] = "X";
    }else{
      nextSqaures[i] = "0";
    }
    setSquares(nextSqaures);
    setisnext((nxt) => !nxt);
    console.log(squares)
  }

  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isnext ? "X" : "O");
  }
  return <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => hanldeCLick(0)}/>
      <Square value={squares[1]} onSquareClick={() => hanldeCLick(1)}/>
      <Square value={squares[2]} onSquareClick={() => hanldeCLick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => hanldeCLick(3)}/>
      <Square value={squares[4]} onSquareClick={() => hanldeCLick(4)}/>
      <Square value={squares[5]} onSquareClick={() => hanldeCLick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => hanldeCLick(6)}/>
      <Square value={squares[7]} onSquareClick={() => hanldeCLick(7)}/>
      <Square value={squares[8]} onSquareClick={() => hanldeCLick(8)}/>
    </div>
  </>
}
