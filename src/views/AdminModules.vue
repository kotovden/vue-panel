<template>
    <div class="templates">
      <div id="nav">
        <router-link to="/admin/modules">Модули</router-link>
        <router-link v-for="module in data"
          :key="module.ID" :to="'/admin/modules/' + module.ID">
          {{module.name}} {{module.position}}
        </router-link>
      </div>
      <router-view />
      <div v-if="$route.name === 'AdminModules'" class="wrapper">
        <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="data"
          >
        <a-list-item @click="() => clickItem(item)" slot="renderItem" slot-scope="item">
          <a @click="(e) => handleDelete(e, item.ID)" slot="actions">Удалить</a>
          <a-list-item-meta>
            <a slot="title" href="#">{{ item.name }}</a>
          </a-list-item-meta>
        </a-list-item>
        </a-list>
      </div>
    </div>
</template>

<script>
import api from '@/service/api';

export default {
  name: 'Templates',
  data() {
    return {
      data: [

      ],
    };
  },
  mounted() {
    console.log(this);
    api.get('/modules').then((res) => {
      if (res && res.data) {
        const { result } = res.data;
        const currentResult = [];
        result.forEach((orderTemplate) => {
          currentResult.push({
            key: orderTemplate.ID,
            ID: orderTemplate.ID,
            name: orderTemplate.name,
            position: orderTemplate.position,
          });
        });
        this.data = currentResult.sort((item1, item2) => item1.position - item2.position);
      }
    });
  },
  methods: {
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
    handleDelete(event, ID) {
      event.stopPropagation();
      api.delete(`/modules?id=${ID}`).then((res) => {
        if (res && res.data && res.data.result === 'OK') {
          this.data = this.data.filter((template) => template.ID !== ID);
        }
        console.log('deleteTemplate', res);
      }).catch((err) => {
        console.log('deleteTemplateErr', err);
      });
    },
    clickItem(item) {
      this.$router.push({ path: `/admin/modules/${item.ID}` });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.templates {
  width: 100%;
  text-align: left;
  .wrapper {
    width: 700px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding: 42px 24px 50px;
    margin: 20px auto 16px auto;
    transition: all .2s;
  }
}
</style>
