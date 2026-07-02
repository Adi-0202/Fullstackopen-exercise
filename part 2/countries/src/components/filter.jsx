const Filter = ({filteredArray}) => {
    if (filteredArray.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (filteredArray.length===1) {
        return(
            <>
            <h1>{filteredArray[0].name.common}</h1>
            <div>Capital {filteredArray[0].capital}</div>
            <div>Area {filteredArray[0].area}</div>
            <h1>Languages</h1>
            <ul>
                {Object.values(filteredArray[0].languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={filteredArray[0].flags.png}/>
            </>
        )
    }
    return(
        <>
            {filteredArray.map(item => (
                <div key={item.name.common}>
                    {item.name.common}
                </div>
            ))}
        </>
    )
}

export default Filter