import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {

  if (text === 'positive'){
    return (
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
    )
  }
   
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/> 
        <StatisticLine text="all" value={good + neutral + bad}/>
        <StatisticLine text="average" value={(good-bad)/(good + neutral + bad)}/>
        <StatisticLine text="positive" value={(good/(good + neutral + bad))*100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
    
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)