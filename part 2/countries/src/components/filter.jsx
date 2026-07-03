import Weather from "./weather"
const Filter = ({filteredArray, setCountry}) => {
    if (filteredArray.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (filteredArray.length===1) {
        const country=filteredArray[0]
        return(
            <>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div>
                <div>Area {country.area}</div>

                <h1>Languages</h1>

                <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
                </ul>

                <img src={country.flags.png} alt={country.flags.alt} />
                <Weather capital={country.capital}/>
            </>
        )
    }
    return(
        <>
            {filteredArray.map(item => (
                <div key={item.name.common}>
                    {item.name.common} <button type="button" onClick={() => setCountry(item.name.common)}>Show</button>
                </div>
            ))}
        </>
    )
}

export default Filter