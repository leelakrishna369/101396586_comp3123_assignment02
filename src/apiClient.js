import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://101425325-comp-3123-assignment1.vercel.app/', 
});

export default apiClient;
