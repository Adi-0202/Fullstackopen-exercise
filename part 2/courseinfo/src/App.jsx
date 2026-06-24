const Course = ({course}) => {
  return(
    <div>
      <Header head={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

const Header = ({head}) => {
  return(
    <div>
      <h1>{head}</h1>
    </div>
  )
}

const Content = ({content}) => {
  return(
    <div>
      {content.map(part => {
        return <Part key={part.id} part={part} />
      })}
    </div>
  )
}

const Part = ({part}) => {
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({total}) => {
  return(
    <div>
      <p>total of {total.reduce((sum, item) => {
        return sum+item.exercises
      }, 0)} exercises </p>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App