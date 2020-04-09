import React from 'react'

const Header = ({course}) => {
  return <h2>{course.name}</h2>
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map((part, i) =>
        <Part key={i} part={part}/>
      )}
    </ul>
  )
}

const Part = ({part}) => {
  return (
  <li>{part.name} {part.exercises}</li>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce(
    (previous, current) => previous + current.exercises, 0
  )
  return <p>total of {total} exercises</p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course}/>
    </div>
  )
}

export default Course