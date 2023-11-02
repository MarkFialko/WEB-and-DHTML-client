import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, { withCredentials: true })
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
