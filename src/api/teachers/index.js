import axios from 'axios'
import CONFIG from 'api/config'

const BASEURL = CONFIG.backendURL

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getAllStudents = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axiosInstance.get('/students', config)
    return response.data
  } catch (error) {
    console.error('Error fetching students:', error)
  }
}

const gainXP = async (token, userId, amount) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/students/${userId}/xp`,
      amount,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error gaining xp', error)
  }
}

const undo = async (token, userId, key) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(`/students/${userId}/undo`, key, config)
    return res.data
  } catch (error) {
    console.error('Error during undo', error)
  }
}

const addStudent = async (token, userId, teacherId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/students/${userId}/add`,
      teacherId,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error adding student', error)
  }
}

const removeStudent = async (token, userId, teacherId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/students/${userId}/remove`,
      teacherId,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error gaining xp', error)
  }
}

const addBadge = async (token, userId, badgeId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/students/${userId}/addBadge`,
      badgeId,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error adding badge', error)
  }
}

const removeBadge = async (token, userId, badgeId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axiosInstance.patch(
      `/students/${userId}/removeBadge`,
      badgeId,
      config
    )
    return res.data
  } catch (error) {
    console.error('Error removing badge', error)
  }
}

const forgotStudentPassword = async (studentId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await axiosInstance.get(
      `/students/${studentId}/forgotPassword`,
      config
    )
    return response.message
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const teacherApi = {
  getAllStudents,
  gainXP,
  undo,
  addStudent,
  removeStudent,
  addBadge,
  removeBadge,
  forgotStudentPassword
}

export default teacherApi
