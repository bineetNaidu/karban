import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:4242/graphql',
  responseType: 'json',
});

export default axios;
