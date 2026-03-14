import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.etecgames.com.br',
})

export default api