<template>
    <div class="modules">
      <div id="nav">
        <router-link to="/admin/modules">Модули</router-link>
        <router-link v-for="module in data"
          :key="module.ID" :to="'/admin/modules/' + module.ID">
          {{module.name}}
        </router-link>
      </div>
      <router-view :modules="data" />
      <list v-if="$route.name === 'AdminModules'"
        :needUpDownArrows="true"
        :data="data"
        @handleEdit="handleEdit"
        @check="check"
        @handleDelete="handleDelete"
        @up="up"
        @down="down"
        @handleChange="handleChange"
        @createListItem="createModule"
        @clickItem="clickItem" />
    </div>
</template>

<script>
import api from '@/service/api';
import List from '../components/List.vue';

export default {
  components: { List },
  name: 'Templates',
  data() {
    return {
      data: [

      ],
    };
  },
  mounted() {
    console.log(this);
    this.loadModules();
  },
  methods: {
    putModule(ID, currentModule) {
      return api.put(`/modules?id=${ID}`, currentModule).then((res) => {
        if (res && res.data) {
          this.loadModules();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    loadModules() {
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
              allowNewLine: orderTemplate.allowNewLine,
              showComposition: orderTemplate.showComposition,
            });
          });
          this.data = currentResult.sort((item1, item2) => item1.position - item2.position);
        }
      });
    },
    handleChange(event, item, index) {
      console.log(item, index, this.data);
    },
    check(event, item, index) {
      event.stopPropagation();
      const data = [...this.data];
      this.putModule(item.ID, this.data[index]).then(() => {
        data[index].isEdit = false;
        this.data = data;
      });
    },
    handleEdit(event, item, index) {
      event.stopPropagation();
      const data = [...this.data];
      data[index].isEdit = true;
      this.data = data;
      console.log(event, item, index, this.data);
    },
    up(event, item, index) {
      event.stopPropagation();
      if (index > 0) {
        const prevPosition = this.data[index - 1] && this.data[index - 1].position;
        console.log(index, index - 1, this.data[index - 1], this.data[index - 1].position);
        const data = [...this.data];
        data[index].position = prevPosition - 1;
        this.putModule(item.ID, data[index]);
      }
      console.log(item, index, this.data);
    },
    down(event, item, index) {
      event.stopPropagation();
      if (index < this.data.length - 1) {
        const prevPosition = this.data[index + 1] && this.data[index + 1].position;
        const data = [...this.data];
        data[index].position = prevPosition + 1;
        this.putModule(item.ID, data[index]);
      }
      console.log(item, index, this.data);
    },
    createModule() {
      const newModule = {
        position: 0,
        name: 'Новый модуль',
        showComposition: false,
        allowNewLine: false,
      };
      api.post('/modules', newModule).then((res) => {
        if (res && res.data) {
          this.loadModules();
        }
      }).catch((err) => {
        console.log(err);
      });
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
.modules {
  width: 100%;
  text-align: left;
  .wrapper {
    width: 700px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding: 20px 24px 30px;
    margin: 40px auto 16px auto;
    transition: all .2s;
  }
  .title {
    margin-left: 10px;
  }
  .arrow {
    margin-left: 5px;
  }
  .add-module {
    position: absolute;
    top: -40px;
    right: 0;
  }
}
</style>
