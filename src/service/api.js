import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskcreator.rocket-lab.ru/taskCreator/api',
});

export default api;
