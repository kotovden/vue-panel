<template>
  <div id="app">
    <div id="nav">
      <router-link to="/new-order">Новая заявка</router-link>
      <router-link to="/templates">Шаблоны</router-link>
      <router-link to="/orders-in-work">Заявки в работе</router-link>
      <router-link to="/orders-completed">Заявки изготовленные</router-link>
      <router-link to="/about">Отчет “Блоки в производстве”</router-link>
      <router-link to="/admin/modules">Управление</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 30px;
}
#app .ant-form-vertical .ant-form-item-label {
  padding: 0 0 2px;
  label {
    font-size: 13px;
  }
}
#nav {
  padding: 30px;

  a {
    color: #000000;
    padding: 10px 15px;

    &.router-link-active {
      background-color: #f2f2f2;
    }
  }
}
</style>
