import axios from 'axios';

const baseURL = process.env.USER_URL_DEPLOY;

const client = axios.create({
  baseURL,
})

export default client