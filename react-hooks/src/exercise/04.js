// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Board({ squares, setSquares, winner, nextValue }) {

  function selectSquare(squareIndex) {
    if(winner || squares[squareIndex]){
      return null
    }
    const squaresCopy= [...squares]
    squaresCopy[squareIndex]= nextValue
    setSquares(squaresCopy)
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [squares, setSquares]= useLocalStorageState('squares', () => Array(9).fill(null))
  const [history, setHistory]= React.useState([])

  const nextValue= calculateNextValue(squares)
  const winner= calculateWinner(squares)
  const status= calculateStatus(winner, squares, nextValue)

  React.useEffect(() => {
    const historyCopy= [...history]
    historyCopy.push(squares)
    // setHistory(historyCopy)
  }, [])

  const moves= history.map((hist,index) => {
    return (
      <li>
        <button onClick={setSquares(hist)}>
          {index === 0 ? 'Go to game start' : `Go to move #${index}`}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          setSquares={setSquares}
          winner={winner}
          nextValue={nextValue}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  )
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function App() {
  return <Game />
}

export default App
