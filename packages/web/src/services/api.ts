import axios from 'axios'

console.log(process.env.NODE_ENV === 'production'
            ? 'https://qar-api.derlimachado.xyz'
            : 'http://localhost:3333')

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://qar-api.derlimachado.xyz'
      : 'http://localhost:3333'
})

export default api
