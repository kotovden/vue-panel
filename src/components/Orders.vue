<template>
  <div class="orders">
    <a-table :customRow="customRow" :columns="columns" :data-source="data">
      <span slot="action" slot-scope="item">
        <div class="actions">
        <a>Задача</a>
        <a v-if="type === 'active'" @click="(e) => cancel(e, item.ID)">Отменить изготовление</a>
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
    cancel(event, ID) {
      event.stopPropagation();
      this.$emit('cancel', ID);
    },
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
    customRow(record) {
      return {
        props: {

        },
        on: {
          click: () => {
            this.$router.push({ path: `/edit-order/${record.ID}` });
          },
        },
      };
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
