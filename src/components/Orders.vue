<template>
  <div class="orders">
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a>Delete</a>
      </span>
    </a-table>
    {{JSON.stringify(data)}}
  </div>
</template>

<script>
import api from '@/service/api';

// const columns = [
//   {
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     scopedSlots: { customRender: 'action' },
//   },
// ];

export default {
  name: 'Orders',
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    api.get('/order').then((res) => {
      console.log(res);
      if (res && res.data) {
        this.data = res.data.result;
      }
    });
  },
  methods: {
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orders {
  width: 100%;
  text-align: left;
}
</style>
