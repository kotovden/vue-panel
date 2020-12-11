<template>
  <div class="orders">
    <a-table :columns="columns" :data-source="data">
      <span slot="action">
        <div class="actions">
        <a>Задача</a>
        <a v-if="type === 'active'">Отменить изготовление</a>
        </div>
      </span>
    </a-table>
  </div>
</template>

<script>

const columns = [
  {
    title: 'Номер заказа',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: 'Дата проверки',
    key: 'checkDate',
    dataIndex: 'checkDate',
  },
  {
    title: 'Тип устройства',
    key: 'deviceType',
    dataIndex: 'deviceType',
  },
  {
    title: 'Кто создал',
    key: 'bitrixCreatorID',
    dataIndex: 'bitrixCreatorID',
  },
  {
    title: 'Текущий этап',
    key: 'wortTemp',
    dataIndex: 'workTemp',
  },
  {
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  name: 'Orders',
  data() {
    return {
      columns,
    };
  },
  props: {
    data: Array,
    type: String,
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
  .actions {
    a {
      padding: 0 20px;
    }
  }
}
</style>
