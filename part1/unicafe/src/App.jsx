import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = (props) => {
  if(props.total!=0){
    return(
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={props.good} /></tr>
          <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
          <tr><StatisticLine text="bad" value={props.bad} /></tr>
          <tr><StatisticLine text="all" value={props.total} /></tr>
          <tr><StatisticLine text="average" value={props.mark/props.total} /></tr>
          <tr><StatisticLine text="positive" value={(props.positive/props.total)*100 + " %"} /></tr>
        </tbody>
      </table>
    </div>
  );
  }
  else {
    return <p>no feedback given</p>
  }
}

const StatisticLine = (props) =>{
  return(
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [mark, setMark] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setTotal(total+1)
    setMark(mark+1)
    setPositive(positive+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
    setMark(mark+0)
  }
  const handleBad = () => {
    setBad(bad+1)
    setTotal(total+1)
    setMark(mark-1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} mark={mark} positive={positive} />
    </div>
  );
}

export default App
