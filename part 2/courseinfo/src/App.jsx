const Course = ({course}) => {
  return(
    <div>
      {course.map(c => (
        <div key={c.id}>
          <Header head={c.name} />
          <Content content={c.parts} />
          <Total total={c.parts} />
        </div>
      ))}
    </div>
  )
}

const Header = ({head}) => {
  return(
    <div>
      <h2>{head}</h2>
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
      <h3>total of {total.reduce((sum, item) => {
        return sum+item.exercises
      }, 0)} exercises </h3>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>
  )
}

export default App