import React, { useState } from 'react'
import './App.css'

interface SquareValue {
  value: string
  onSquareClick: () => void
}

const Square: React.FC<SquareValue> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

const Board: React.FC = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(''))

  function handleClick (i: number): void {
    const winnerFound = calculateWinner(squares) !== ''
    if ((squares[i] as boolean) || winnerFound) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  let status
  const winner = calculateWinner(squares)
  if (winner !== '') {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => {
            handleClick(0)
          }}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => {
            handleClick(1)
          }}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => {
            handleClick(2)
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => {
            handleClick(3)
          }}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => {
            handleClick(4)
          }}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => {
            handleClick(5)
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => {
            handleClick(6)
          }}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => {
            handleClick(7)
          }}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => {
            handleClick(8)
          }}
        />
      </div>
    </>
  )
}

const calculateWinner = (squares: string[]): string => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    const squareFilled = squares[a] !== ''
    if (
      squareFilled &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return ''
}

const App: React.FC = () => {
  return <Board />
}

export default App
