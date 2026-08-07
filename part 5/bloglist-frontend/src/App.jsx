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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      )}
    </div>
  )
}

export default App