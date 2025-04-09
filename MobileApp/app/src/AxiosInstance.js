import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AxiosInstance = axios.create({
  baseURL: "http://192.168.1.100:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      // Adjusting the token to include 'Bearer' prefix if required by your backend
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
