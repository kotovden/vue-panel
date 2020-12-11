<template>
  <div class="home">
    <h1>Изготовленные</h1>
    <orders type="finished" :data="data" />
  </div>
</template>

<script>
import moment from 'moment';
import api from '@/service/api';
import Orders from '../components/Orders.vue';

export default {
  name: 'OrdersCompleted',
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    api.get('/order?status=finished').then((res) => {
      console.log(res);
      if (res && res.data) {
        const { result } = res.data;
        const currentResult = [];
        result.forEach((order) => {
          const createDate = moment(order.createDate).format('DD.MM.YYYY');
          const checkDate = moment(order.checkDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
          currentResult.push({
            ...order,
            createDate,
            key: order.ID,
            checkDate,
          });
        });
        this.data = currentResult;
      }
    });
  },
  components: {
    Orders,
  },
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
}

</style>
