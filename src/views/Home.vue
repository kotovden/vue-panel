<template>
  <div class="home">
    <h1>Заявка на изготовление</h1>
    <NewOrder />
  </div>
</template>

<script>
// @ is an alias to /src
import NewOrder from '@/components/NewOrder/NewOrder.vue';

export default {
  name: 'Home',
  components: {
    NewOrder,
  },
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
}

</style>
