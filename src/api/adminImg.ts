import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function loadingImg( formData: FormData) {
    return axios.post(`${api_url}/api/load_picture/`, formData)
    .then(() => undefined)
}

export function allPicture() {
    return axios.get(`${api_url}/api/all_picture/`)
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}