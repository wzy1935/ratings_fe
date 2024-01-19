import axios from 'axios';
import router from '../routers/router';
import { notifications } from '@mantine/notifications';

const BASE_URL = 'http://localhost:8080/';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

const beforeRequest = (config) => {
  const token = localStorage.getItem('token');
  token && (config.headers.Authorization = token);
  return config;
};

http.interceptors.request.use(beforeRequest);

const responseSuccess = (response) => {
  return Promise.resolve(response.data);
};

const responseFailed = (error) => {
  const { response } = error;
  if (response) {
    const statusCode = response.status;
    if (statusCode === 401) {
      localStorage.removeItem('token');
      router.navigate('/auth');
    } else if (statusCode === 403) {
      notifications.show({
        color: 'red',
        title: 'Request Forbidden',
        message: 'You need to be an admin be perform this operation.',
      });
    } else if (statusCode === 500) {
      notifications.show({
        color: 'red',
        title: 'Server Error',
        message: response.toString(),
      });
    } else {
      notifications.show({
        color: 'red',
        title: 'Unexpected Error',
        message: 'Please check your network connection or try again.',
      });
    }
  } else {
    notifications.show({
      color: 'red',
      title: 'Unexpected Error',
      message: 'Please check your network connection or try again.',
    });
  }
  
  return Promise.reject(error);
};
http.interceptors.response.use(responseSuccess, responseFailed);

export default http;
