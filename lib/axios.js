import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ENTRYPOINT} from '~/config/entrypoint';

const baseAxios = axios.create({
  baseURL: ENTRYPOINT,
});

baseAxios.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

baseAxios.interceptors.response.use(async response => {
  if (response.status === 401) {
    await AsyncStorage.removeItem('token');
  }

  return response;
});

export default baseAxios;
