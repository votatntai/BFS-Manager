import axios from "axios";

const instance = axios.create({
  baseURL: "https://quanlytaisan-be.hisoft.vn",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy accessToken từ local storage
    const accessToken = localStorage.getItem("accessToken");
    // Kiểm tra xem accessToken có tồn tại không
    if (accessToken) {
      // Thêm accessToken vào header của request
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    //console.log('check response');
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log(response.data.data)
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
