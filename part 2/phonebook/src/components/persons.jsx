const Persons = (props) => {
    return(
        <>{props.filteredPersons.map(item => (
            <div key={item.id}>
                {item.name} {item.number}
            </div>
        ))}</>
    )
}

export default Persons