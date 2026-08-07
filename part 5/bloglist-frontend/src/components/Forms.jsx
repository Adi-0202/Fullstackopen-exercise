/* eslint-disable react-refresh/only-export-components */
const LoginForm = (props) => {
  return(
  <>
    <h2>log in to application:</h2>
    <form onSubmit={props.handleLogin}>
      <div>
      <label>
        username:
          <input type="text" value={props.username} onChange={({target}) => {props.setUsername(target.value)}} />
      </label>
      </div>
      <br />
      <div>
      <label>
        password:
          <input type="text" value={props.password} onChange={({target}) => {props.setPassword(target.value)}} />
      </label>
      </div>
      <br />
      <button>login</button>
    </form>
  </>
  )
}

export default { LoginForm }