import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export const staticGif = (token: string, country: string, language:string, value:string, format:string, topic:string) => {
    return axios.post(`${api_url}/api/create_static_gif_test/`, {
        token, 
        country,
        language,
        value,
        format,
        topic
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