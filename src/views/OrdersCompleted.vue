<template>
  <div class="home">
    <h1>Изготовленные</h1>
    <orders :pagination="pagination" :loading="loading"
      @handleTableChange="handleTableChange"
      type="finished" :data="data" />
  </div>
</template>

<script>
import moment from 'moment';
import api from '@/service/api';
import Orders from '../components/Orders.vue';

const PAGE_SIZE = 20;

export default {
  name: 'OrdersCompleted',
  data() {
    return {
      data: [],
      loading: false,
      pagination: {
        pageSize: PAGE_SIZE,
      },
    };
  },
  mounted() {
    this.loadOrders({ limit: PAGE_SIZE, offset: 0 });
  },
  components: {
    Orders,
  },
  methods: {
    loadOrders({ limit, offset }) {
      api.get(`/order?status=finished&limit=${limit}&offset=${offset}`).then((res) => {
        if (res && res.data) {
          const { result } = res.data;
          const currentResult = [];
          result.forEach((order) => {
            const createDate = moment(order.createDate).format('DD.MM.YYYY');
            const checkDate = moment(order.form.checkDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
            currentResult.push({
              ...order.form,
              createDate,
              key: order.ID,
              ID: order.ID,
              checkDate,
            });
          });
          this.data = currentResult;
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = res.data.total;
          this.loading = false;
          this.pagination = pagination;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loadOrders({ limit: pagination.pageSize, offset: +(pagination.current - 1) * 20 });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
}

</style>
