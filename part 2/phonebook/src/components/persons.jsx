const Persons = (props) => {
    return(
        <>{props.filteredPersons.map(item => (
            <div key={item.id}>
                {item.name} {item.number} <button type="button" onClick={() => props.personDelete(item)}>delete</button>
            </div>
        ))}</>
    )
}

export default Persons