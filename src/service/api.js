import axios from 'axios';

import {
  message,
} from 'ant-design-vue';

const headers = {
  'Content-Type': 'application/json',
};
const delayHideSeconds = 2;
const api = axios.create({
  baseURL: 'https://taskcreator.rocket-lab.ru/taskCreator/api',
  headers,
});
api.interceptors.response.use((response) => {
  switch (response.config.method) {
    case 'post':
      message.success('Успешно сохранено', delayHideSeconds);
      break;
    case 'put':
      message.success('Успешно обновлено', delayHideSeconds);
      break;
    case 'delete':
      message.success('Успешно удалено', delayHideSeconds);
      break;
    default:
      break;
  }
  return response;
}, (error) => {
  switch (error.config.method) {
    case 'post':
      message.error('Ошибка при сохранении', delayHideSeconds);
      break;
    case 'put':
      message.error('Ошибка при обновлении', delayHideSeconds);
      break;
    case 'delete':
      message.error('Ошибка при удалении', delayHideSeconds);
      break;
    case 'get':
      message.error('Ошибка при загрузке', delayHideSeconds);
      break;
    default:
      break;
  }
  return Promise.reject(error);
});

export default api;
