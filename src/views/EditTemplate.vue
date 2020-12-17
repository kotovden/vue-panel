<template>
  <div class="edit-template">
    <h1>Заявка на изготовление (Шаблон) № {{ $route.params.id }}</h1>
    <Order type="edit-template" />
  </div>
</template>

<script>
// @ is an alias to /src
import Order from '@/components/Order/Order.vue';

export default {
  name: 'EditTemplate',
  components: {
    Order,
  },
};
</script>

<style scoped lang="scss">
.edit-template {
  text-align: left;
}

</style>
