import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: 'https://taskcreator.rocket-lab.ru/taskCreator/api',
  headers,
});

export default api;
