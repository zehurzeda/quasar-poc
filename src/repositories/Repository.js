import axios from 'axios'

const baseDomain = 'http://localhost:8081/mat-catalogo/v1.0/'

const baseURL = `${baseDomain}`

export default axios.create({
  baseURL
})
