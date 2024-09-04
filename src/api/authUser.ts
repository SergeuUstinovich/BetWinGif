import axios from 'axios'

const api_url =
  import.meta.env.MODE === 'development'
    ? '/api'
    : import.meta.env.VITE_API_BASE_URL
export function registerUser(
  username: string,
  password: string,
  re_password: string,
  email: string
) {
  return axios
    .post(`${api_url}/auth/users/`, {
      email,
      password,
      re_password,
      username,
    })
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function loginUser(username: string, password: string) {
  return axios
    .post(`${api_url}/auth/token/login/`, {
      password,
      username,
    })
    .then((response) => {
      const data = response.data.auth_token
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function resetUser(email: string) {
  return axios
    .post(`${api_url}/auth/users/reset_password/`, {
      email,
    })
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function resetPasswordUser(
  new_password: string,
  re_new_password: string,
  uid: string,
  token: string
) {
  return axios
    .post(`${api_url}/auth/users/reset_password_confirm/`, {
      new_password,
      re_new_password,
      uid,
      token,
    })
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function logoutUser(token: string) {
  return axios
    .post(
      `${api_url}/auth/token/logout/`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => undefined)
}

export function setPasswordUser(
  new_password: string,
  re_new_password: string,
  current_password: string,
  token: string
) {
  return axios
    .post(
      `${api_url}/auth/users/set_password/`,
      {
        new_password,
        re_new_password,
        current_password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function deleteUser(current_password: string, token: string) {
  return axios
    .delete(`${api_url}/auth/users/me/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      data: {
        current_password,
      },
    })
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}

export function profileUser(token: string) {
  return axios
    .get(`${api_url}/api/get_profile/${token}/`)
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      const errorMessages = Object.keys(error.response.data)
        .map((key) => `${error.response.data[key]}`)
        .join(', ')
      throw new Error(errorMessages)
    })
}
