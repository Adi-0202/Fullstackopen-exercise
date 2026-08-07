import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  /*
  const config = {
    headers: {authorization: token}
  }
  */
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll, setToken }