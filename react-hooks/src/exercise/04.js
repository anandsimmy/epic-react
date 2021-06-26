// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Board({ squares, winner, nextValue, history, setHistory, historyStep }) {

  function selectSquare(squareIndex) {
    if(winner || squares[squareIndex]){
      return null
    }
    const squaresCopy= [...squares]
    squaresCopy[squareIndex]= nextValue
    const historyCopy= [...history].slice(0, historyStep+1)
    historyCopy.push(squaresCopy)
    setHistory(historyCopy)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
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
  const [history, setHistory]= React.useState([squares])
  const [historyStep, setHistoryStep]= React.useState(0)

  React.useEffect(() => {
    setHistoryStep(history.length -1)
  }, [history])

  React.useEffect(() => {
    setSquares(history[historyStep])
  }, [historyStep])

  const nextValue= calculateNextValue(squares)
  const winner= calculateWinner(squares)
  const status= calculateStatus(winner, squares, nextValue)

  const moves= history.map((currentHistory,index) => {
    return (
      <li key={index}>
        <button disabled={index === historyStep} onClick={()=>setHistoryStep(index)}>
          {index === 0 ? 'Go to game start ' : `Go to move #${index} `}
          {index === historyStep && '(current)'}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          winner={winner}
          nextValue={nextValue}
          history={history}
          setHistory={setHistory}
          historyStep={historyStep}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
