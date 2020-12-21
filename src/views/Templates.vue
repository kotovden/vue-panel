<template>
    <div class="templates">
      <div class="wrapper">
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
    api.get('/orderTemplate?limit=all').then((res) => {
      if (res && res.data) {
        const { result } = res.data;
        const currentResult = [];
        result.forEach((orderTemplate) => {
          currentResult.push({
            key: orderTemplate.ID,
            ID: orderTemplate.ID,
            name: orderTemplate.name,
          });
        });
        this.data = currentResult;
      }
    });
  },
  methods: {
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
    handleDelete(event, ID) {
      event.stopPropagation();
      api.delete(`/orderTemplate?id=${ID}`).then((res) => {
        if (res && res.data && res.data.result === 'OK') {
          this.data = this.data.filter((template) => template.ID !== ID);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    clickItem(item) {
      this.$router.push({ path: `/edit-template/${item.ID}` });
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
