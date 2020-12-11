<template>
    <div class="modules-form">
       <h3>Аппаратный состав устройства:</h3>
        <a-table :columns="columns" :data-source="data">
            <template
            v-for="col in ['number', 'name', 'type', 'logicNumber', 'placed', 'description']"
            :slot="col" slot-scope="text, record, index">
              <a-form-item :key="col">
                <a-input :value="record[col]"
                  @change="e => handleChange(e.target.value, record.key, index, col)"
                    size="small" placeholder="xxx/xxx" />
              </a-form-item>
            </template>
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
    addRow() {
      this.$emit('addRow');
    },
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
    handleChange(value, key, index, col) {
      console.log(value, key, col, index, this.data);
      const currentData = [...this.data];
      currentData[index][col] = value;
      this.$emit('changeModulesForm', currentData);
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
