<template>
    <div class="modules">
      <div id="nav">
        <router-link to="/admin/modules">Модули</router-link>
        <router-link v-for="module in data"
          :key="module.ID" :to="'/admin/modules/' + module.ID">
          {{module.name}}
        </router-link>
      </div>
      <router-view />
      <list v-if="$route.name === 'AdminModules'"
        :needUpDownArrows="true"
        :data="data"
        @handleEdit="handleEdit"
        @check="check"
        @handleDelete="handleDelete"
        @up="up"
        @down="down"
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
      data: [],
    };
  },
  mounted() {
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
      api.get('/modules?limit=all').then((res) => {
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
    },
    up(event, item, index) {
      event.stopPropagation();
      if (index > 0) {
        const prevIndex = index - 1;
        const prevItem = this.data[prevIndex];
        if (prevItem) {
          const data = [...this.data];
          const currentPosition = data[index].position;
          const prevPosition = data[prevIndex].position;
          data[prevIndex].position = currentPosition;
          data[index].position = prevPosition;
          this.putModule(item.ID, data[index]);
          this.putModule(prevItem.ID, data[prevIndex]);
        }
      }
    },
    down(event, item, index) {
      event.stopPropagation();
      if (index < this.data.length - 1) {
        const nextIndex = index + 1;
        const nextItem = this.data[nextIndex];
        if (nextItem) {
          const data = [...this.data];
          const currentPosition = data[index].position;
          const prevPosition = data[nextIndex].position;
          data[nextIndex].position = currentPosition;
          data[index].position = prevPosition;
          this.putModule(item.ID, data[index]);
          this.putModule(nextItem.ID, data[nextIndex]);
        }
      }
    },
    createModule() {
      let position = 0;
      if (this.data && this.data.length && this.data[this.data.length - 1]) {
        position = this.data[this.data.length - 1].position;
      }
      const newModule = {
        position: position + 1,
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
      }).catch((err) => {
        console.log(err);
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
  .router-link-active {
    background-color: #f2f2f2;
  }
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
