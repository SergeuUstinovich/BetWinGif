import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userToken');
      location.reload()
    }
    return Promise.reject(error);
  }
);

export default api;