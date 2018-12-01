import axios from 'axios'

const baseURL = 'http://localhost:4646/v1' // TODO: move to config

const http = axios.create({
  baseURL
})

export default http