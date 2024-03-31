import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// You can set up a base Axios instance here with baseURL
// and any other config that's common across all API calls.
export const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json", // Or whatever you need
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token"); // or your token retrieval logic
    if (token) {
      config.headers = config.headers || {}; // Ensure headers object exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
