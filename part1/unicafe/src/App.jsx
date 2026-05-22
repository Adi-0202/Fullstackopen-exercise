import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {total!=0? mark/total:"Null"}</p>
      <p>positive {total!=0?(positive/total)*100:"Null"}%</p>
    </div>
  );
}

export default App
