import { useState,useEffect } from "react"
import axios from "axios"
import Filter from "./components/filter"

const App = () => {
  const [country, setCountry]=useState('')
  const [fetchCountry, setFetchCountry]=useState([])
  const [selectedCountry, setSelectedCountry]=useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setFetchCountry(response.data)
        console.log(response.data)
      })
  },[])

  const handleCountry = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  const filteredCountry = fetchCountry.filter(item => item.name.common.toLowerCase().includes(country.toLowerCase()))

  return(
    <div>
      find countries <input onChange={handleCountry} />
      <Filter filteredArray={filteredCountry} setCountry={setCountry} />
    </div>
  )
}

export default App