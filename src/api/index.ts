import axios from 'axios'

export const API_URL = 'https://web-and-dhtml-server.onrender.com/api/'

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
        localStorage.setItem('token', response.data.accessToken)
        return axiosInstance.request(originalRequest)
      } catch (e) {
        console.log(e)
      }
    }
    throw error
  }
)

export default axiosInstance
