import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function gifAdd() {
    return axios.post(`${api_url}/create_gif/`,{
        text: '321234',
        color: 'white',
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