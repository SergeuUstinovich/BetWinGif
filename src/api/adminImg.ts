import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function loadingImg( formData: FormData) {
    return axios.post(`${api_url}/api/load_picture/`,{
        formData
    },{
        headers: {
            'Content-Type': 'multipart/form-data',
          }
    })
    .then(() => undefined)
}