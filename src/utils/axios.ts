import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api-bineetnaidu-io.herokuapp.com/api/v1/karban',
  responseType: 'json',
});

export default axios;
