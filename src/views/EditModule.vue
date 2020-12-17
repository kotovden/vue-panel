<template>
  <div class="module">
    <h1>Модуль № {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'EditModule',
};
</script>

<style scoped lang="scss">
.module {
  text-align: left;
}

</style>
