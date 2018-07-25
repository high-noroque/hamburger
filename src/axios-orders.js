import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-hamburger-e9a67.firebaseio.com/'
})

export default instance