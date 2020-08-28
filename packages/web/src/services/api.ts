import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://qap.derlimachado.xyz'
      : 'http://localhost:3333'
})

export default api
