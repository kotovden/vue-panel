<template>
  <div class="home">
    <h1>Заявка на изготовление № {{ $route.params.id }}</h1>
    <Order :order="order" type="edit" />
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import Order from '@/components/Order/Order.vue';
import api from '../service/api';
import formFields from '../map/map';

export default {
  name: 'Home',
  data() {
    return {
      order: {
        form: {},
      },
    };
  },
  mounted() {
    console.log(this);
    api.get(`/order?id=${this.$route.params.id}`).then((res) => {
      console.log(res);
      if (res && res.data) {
        const { result } = res.data;
        const order = result[0];
        const resultOrder = {};
        Object.keys(order).forEach((fieldName) => {
          if (formFields.includes(fieldName)) {
            resultOrder[fieldName] = result[0][fieldName];
          }
        });
        const createDate = moment(order.createDate, null);
        const deliveryDate = moment(order.deliveryDate, 'YYYY-MM-DD');
        const checkDate = moment(order.checkDate, 'YYYY-MM-DD');
        const terminalVendorCodes = order.terminalVendorCodes[0];
        this.order.form = {
          ...resultOrder, createDate, deliveryDate, checkDate, terminalVendorCodes,
        };
        console.log(this.order);
      }
    });
  },
  components: {
    Order,
  },
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
}

</style>
