import axios from 'axios'
const baseUrl = '/api/blogs'

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

const create = async (newObj) => {
  const config = {
    headers: {authorization: token}
  }
  const request = await axios.post(baseUrl, newObj, config)
  return request.data
}
export default { getAll, setToken, create }