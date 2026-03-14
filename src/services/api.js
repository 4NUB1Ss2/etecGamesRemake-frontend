import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.etecgames.com.br/api',
})

export default api