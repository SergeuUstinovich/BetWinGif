import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

// export function gifAdd(token: string) {
//     return axios.post(`${api_url}/api/create_gif/`,{
//         token,
//     }, { responseType: 'blob' })
//     .then(response => {
//         const data = URL.createObjectURL(response.data);
//         return data
//     })
//     .catch(error => {
//         const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
//         throw new Error(errorMessages);
//     })
// }

export function gifAdd(token: string) {
    return axios.post(`${api_url}/api/create_gif/`,{
        token,
    })
    .then(response => {
        const data = response.data;
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}

export function createPromorcode(token: string, promocode: string) {
    return axios.post(`${api_url}/api/create_promocode/`,{
        token,
        promocode
    })
    .then(response => {
        const data = response.data;
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}