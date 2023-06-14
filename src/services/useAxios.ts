import axios from 'axios'
import { useJWT } from '@/services'

const defaultConfig = {
  baseURL: 'http://dev.you-play.fr/api',
  headers: {
    content: 'application/json'
  }
}
const Axios = axios.create(defaultConfig)

const useAxios = () => {
  
  const { jwt } = useJWT()

  Axios.interceptors.request.use(function (config) {
    const merged = {
      ...config.headers,
      Authorization: jwt.value ? `Bearer ${jwt.value}` : ''
    }
    config.headers = merged
    return config
  })

  return {
    Axios
  }
}

export default useAxios
