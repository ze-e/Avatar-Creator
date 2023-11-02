import axios from 'axios'
import CONFIG from 'api/config'

const BASEURL = CONFIG.backendURL

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getUsers = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axiosInstance.get('/users', config)
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
    return res.data
  } catch (error) {
    console.error('Error registering user:', error)
    return error.response
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
    return error.response
  }
}

const loadUser = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axiosInstance.get('/user', config)
    return res.data.user
  } catch (error) {
    console.error('Error loading user:', error)
  }
}

const editUser = async (token, userId, newVals) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(`/user/${userId}`, newVals, config)
    return res.data
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

const getUserById = async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`)
    return res.data.user
  } catch (error) {
    console.error('Error loading user:', error)
  }
}

// inventory and gear
const addToInventory = async (token, userId, item) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(`/user/${userId}/inventory`, item, config)
    return res.data
  } catch (error) {
    console.error('Error adding item to inventory:', error)
  }
}

const equipItem = async (token, userId, item) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/user/${userId}/gear/equip`,
      item,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error equipping item:', error)
  }
}

const unequipItem = async (token, userId, item) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/user/${userId}/gear/unequip`,
      item,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error unequipping item', error)
  }
}

// password reset
const forgotPassword = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await axiosInstance.get('/user/forgotPassword', config)
    return response.message
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const resetPassword = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await axiosInstance.get(`/user/${id}resetPassword/${token}`, config)
    return response.message
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
const userAPi = {
  getUsers,
  registerUser,
  loginUser,
  loadUser,
  editUser,
  getUserById,
  addToInventory,
  equipItem,
  unequipItem,
  forgotPassword,
  resetPassword
}

export default userAPi
