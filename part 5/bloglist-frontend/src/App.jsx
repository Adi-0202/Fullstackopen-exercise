import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Forms from './components/Forms'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] =  useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappuser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch {
      console.log('wrong credentials')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      const newObj={
        title,
        author,
        url
      }
      const returnedBlog = await blogService.create(newObj)
      console.log(returnedBlog)
      setBlogs(blogs => blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch {
      console.log(' Fill everything ')
    }
  }

  return (
    <div>
      {!user && <Forms.LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />}
      {user && (
        <>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={
          () => {
            window.localStorage.removeItem('loggedBlogappuser')
            setUser(null)
          }
        }>logout</button></p>
        <Forms.CreateBlog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleCreate={handleCreate}/>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      )}
    </div>
  )
}

export default App