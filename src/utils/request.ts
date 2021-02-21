import axios from "axios"

const modelService = axios.create({
  baseURL: "https://model-api.space-100.com",
  timeout: 5000
})

modelService.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

modelService.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    console.error(err)
    return err
  }
)
