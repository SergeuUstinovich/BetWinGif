import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;
export function registerUser(username: string, password: string, re_password: string, email: string) {
    return axios.post(`${api_url}/auth/users/`,{
        email,
        password,
        re_password,
        username,
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}

export function loginUser(username: string, password: string) {
    return axios.post(`${api_url}/auth/token/login/`,{
        password,
        username,
    })
    .then(response => {
        const data  = response.data.auth_token
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}

export function resetUser(email: string) {
    return axios.post(`${api_url}/auth/users/reset_password/`,{
        email,
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}

export function resetPasswordUser(new_password: string, re_new_password: string, uid: string, token: string) {
    return axios.post(`${api_url}/auth/users/reset_password_confirm/`,{
        new_password,
        re_new_password,
        uid,
        token
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}

export function logoutUser( token: string) {
    return axios.post(`${api_url}/auth/token/logout/`,{}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
    })
    .then(() => undefined)
}