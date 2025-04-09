import axios from 'axios';


const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/",
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('UserToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;

