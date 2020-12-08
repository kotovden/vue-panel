<template>
    <div class="modules-form">
       <h3>Аппаратный состав устройства:</h3>
       <a-table :columns="columns" :data-source="data">
           <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                v-if="data.length"
                title="Вы уверены?"
                @confirm="() => deleteRow(record.key)"
                >
                    <a href="javascript:;">Удалить</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-button type="primary" @click="addRow">
            Добавить строку
        </a-button>
    </div>
</template>

<script>
export default {
  name: 'MainForm',
  props: {
    data: Array,
    columns: Array,
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    addRow() {
      this.$emit('addRow');
    },
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modules-form {
    width: 100%;
}
</style>
