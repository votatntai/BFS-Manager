import axios from "axios";

const instance = axios.create({
  baseURL: "https://bfs.monoinfinity.net/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy accessToken từ local storage
    const accessToken = localStorage.getItem("jwt_access_token");
    // Kiểm tra xem accessToken có tồn tại không
    if (accessToken) {
      // Thêm accessToken vào header của request
      config.headers.Authorization = `Bearer ${accessToken}`;
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NjkxNTE1LWE5M2ItNDYxZS04ZmEzLWRlNmMwNmNhMzA5NSIsInJvbGUiOiJNYW5hZ2VyIiwibmJmIjoxNzA4NTA0NDA3LCJleHAiOjE3MDg1OTA4MDcsImlhdCI6MTcwODUwNDQwN30.rOVPIsSOwVWtNzpsyR4xJYidBVggB9g2ejP8DCpHznM`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
