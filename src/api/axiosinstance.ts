import axios from 'axios';

const config = {
  baseurl: '', //base Url
  headers: {}, // header for the request
};

const axiosInstance = axios.create({
  baseURL: config.baseurl,
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

export default axiosInstance;
