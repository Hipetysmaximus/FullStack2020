import React from 'react'
import ReactDOM from 'react-dom'

const Header = (header) => {
   return(
     <div>
       <h1>{header.name}</h1>
     </div>
   )
}

const Content = (props) => {
  return (
    <div>
      <Part kurssi={props.eka.name} tehtävät={props.eka.exercises} />
      <Part kurssi={props.toka.name} tehtävät={props.toka.exercises} />
      <Part kurssi={props.kolmas.name} tehtävät={props.kolmas.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.kurssi} {props.tehtävät}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.summa}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const [eka,toka,kolmas] = course.parts

  return (
    <div>
      <Header name = {course.name}/>
      <Content eka={eka} toka={toka} kolmas={kolmas}/>
      <Total summa = {eka.exercises + toka.exercises + kolmas.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))