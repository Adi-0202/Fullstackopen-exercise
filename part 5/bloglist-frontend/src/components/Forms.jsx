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
          <input type="password" value={props.password} onChange={({target}) => {props.setPassword(target.value)}} />
      </label>
      </div>
      <br />
      <button>login</button>
    </form>
  </>
  )
}

const CreateBlog = (props) => {
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={props.handleCreate}>
      <div>
      <label>
        title:
          <input type="text" value={props.title} onChange={({target}) => {props.setTitle(target.value)}} />
      </label>
      </div>
      <br />
      <div>
      <label>
        author:
          <input type="text" value={props.author} onChange={({target}) => {props.setAuthor(target.value)}} />
      </label>
      </div>
      <br />
      <div>
      <label>
        url:
          <input type="text" value={props.url} onChange={({target}) => {props.setUrl(target.value)}} />
      </label>
      </div>
      <br />
      <button>create</button>
    </form>
    </>
  )
}

export default { LoginForm, CreateBlog }