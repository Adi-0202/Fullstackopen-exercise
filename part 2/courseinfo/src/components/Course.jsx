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

export default Course