import Vue from 'vue';
import {
  DatePicker,
  FormModel,
  Input,
  Select,
  Button,
  Switch,
  Table,
  Popconfirm,
} from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(DatePicker);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Table);
Vue.use(Popconfirm);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
