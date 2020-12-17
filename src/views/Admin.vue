<template>
  <div id="admin">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      modulesList: [],
    };
  },
  methods: {
    changeModulesList(modulesList) {
      this.modulesList = [...modulesList];
    },
  },
};
</script>

<style scoped lang="scss">
.admin {
  text-align: left;
}

</style>
