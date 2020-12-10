<template>
  <div class="orders">
    {{JSON.stringify(data)}}
  </div>
</template>

<script>
import api from '@/service/api';

export default {
  name: 'Orders',
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    api.get('/order').then((res) => {
      console.log(res);
      if (res && res.data) {
        this.data = res.data.result;
      }
    });
  },
  methods: {
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orders {
  width: 100%;
  text-align: left;
}
</style>
