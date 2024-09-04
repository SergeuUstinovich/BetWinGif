import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export const pictureLoad = (img: any) => {
    return axios.post(`${api_url}/api/load_picture/`, {
        img
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    .then(response => {
        const data = response.data
        console.log(data)
        return data
    })
    .catch(error => {
        const errorMessages = Object.keys(error.response.data).map(key => `${error.response.data[key]}`).join(', ');
        throw new Error(errorMessages);
    })
}