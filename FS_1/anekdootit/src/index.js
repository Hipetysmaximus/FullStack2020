import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

let points = [0,0,0,0,0,0]

let max = 0;
let maxIndex = 0;

const App = (props) => {

  const [selected, setSelected] = useState(0)

  const handleClick = () => {
      setSelected(Math.floor(Math.random() * 6))
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    points = copy

    for (var i = 0; i < points.length; i++) {
      if (points[i] > max) {
          maxIndex = i;
          max = points[i];
      }
    }
  }   

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleClick} text="next anecdote"/>

      <h1>Anecdote with most votes</h1>

      <p>{props.anecdotes[maxIndex]}</p>
      <p>has {points[maxIndex]} votes</p>

    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)