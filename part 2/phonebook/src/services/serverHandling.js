import axios from "axios"
const url="http://localhost:3002/persons"

const getAll = () => {
    const request=axios.get(url)
    return request.then(response => response.data)
}

const create = (newObj) => {
    const request=axios.post(url, newObj)
    return request.then(response => response.data)
}

const remove = (id, filtered) => {
    const request=axios.delete(`${url}/${id}`, filtered)
    return request.then(response => response.data)
}

const update = (id, filtered) => {
    const request=axios.put(`${url}/${id}`, filtered)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }