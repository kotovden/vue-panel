<template>
  <div class="home">
    <h1>Заявка на изготовление</h1>
    <Order type="create" />
  </div>
</template>

<script>
// @ is an alias to /src
import Order from '@/components/Order/Order.vue';

export default {
  name: 'Home',
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
