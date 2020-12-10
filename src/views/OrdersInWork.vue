<template>
  <div class="home">
    <h1>В работе</h1>
    <orders />
  </div>
</template>

<script>
import Orders from '../components/Orders.vue';

export default {
  name: 'OrdersInWork',
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
