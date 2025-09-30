import axios from "axios";

declare const __API_URL__: string;

const axiosInstance = axios.create({
  baseURL: __API_URL__,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 ) {
      originalRequest._retry = true;

      // if user inactive, logout
      const isActive = sessionStorage.getItem("isActive") === "true";
      if (!isActive) {
        sessionStorage.clear();
        window.location.href = "/sessionExpired";
        return Promise.reject(error);
      }


      
      console.log("axios",isActive)
      if (!isRefreshing) {
        isRefreshing = true;

        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          sessionStorage.clear();
          window.location.href = "/sessionExpired";
          return Promise.reject(error);
        }

        try {
          const res = await axios.post(`${__API_URL__}/refresh`, { refreshToken });
          const newToken = res.data.token;
          console.log("token",res.data.token)
          console.log("token token")
          sessionStorage.setItem("token", newToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          isRefreshing = false;
          onRefreshed(newToken);
        } catch (err) {
          isRefreshing = false;
          sessionStorage.clear();
          window.location.href = "/sessionExpired";
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
