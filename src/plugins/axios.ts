import axios from 'axios'

export const axiosInstance = () => {
  axios.defaults.baseURL = import.meta.env.VITE_CHUMMY_BASEURL
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
  axios.defaults.headers["Access-Control-Allow-Methods"] = "*"
  axios.defaults.withCredentials = true
}

