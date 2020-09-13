import axios from 'axios'
import { useHistory } from 'react-router-dom'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://qar-api.derlimachado.xyz'
      : 'http://localhost:3333'
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('@QAR:token')
      localStorage.removeItem('@QAR:user')
      window.location.replace('/')
    }
    return error
  }
)

export default api
