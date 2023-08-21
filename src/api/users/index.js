import axios from 'axios'

const BASEURL = process.env.BACKEND_URL

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

const loginUser = async ({ userName, password, loadUser = true }) => {
  const loginData = {
    userName,
    password,
    loadUser
  }

  try {
    const res = await axiosInstance.post('/login', loginData)
    console.log(res)
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
    const res = await axiosInstance.get('/loadUser', config)
    console.log('Loaded user:', res.data)
    return res.data
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