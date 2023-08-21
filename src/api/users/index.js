import axios from 'axios'
import CONFIG from 'api/config'

const BASEURL = CONFIG.backendURL

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const registerUser = async ({ userName, email, password }) => {
  const userData = {
    userName,
    email,
    password
  }

  try {
    const res = await axiosInstance.post('/register', userData)
    console.log(res)
    return res.data
  } catch (error) {
    console.error('Error registering user:', error)
  }
}

const loginUser = async ({ userName, password }) => {
  const loginData = {
    userName,
    password
  }

  try {
    const res = await axiosInstance.post('/login', loginData)
    return res.data
  } catch (error) {
    console.error('Error logging in:', error)
  }
}

const loadUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const res = await axiosInstance.get('/user', config)
    return res.data.user
  } catch (error) {
    console.error('Error loading user:', error)
  }
}

const userAPi = {
  getUsers,
  registerUser,
  loginUser,
  loadUser
}

export default userAPi
