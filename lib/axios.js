import baseAxios from 'axios';

const axios = baseAxios.create({
  // baseURL: 'https://recrutax.herokuapp.com',
  baseURL: 'https://localhost:8443',
});

export default axios;
