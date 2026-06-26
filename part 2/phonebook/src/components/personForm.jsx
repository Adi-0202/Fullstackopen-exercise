const PersonForm = (props) => {
    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    name: <input value={props.name} onChange={props.onChangeName} required />
                </div>
                <div>
                    number: <input value={props.number} onChange={props.onChangeNumber} required />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm