<template>
    <div class="modules-form">
       <h3 v-if="module.name">{{module.name}}</h3>
        <a-table :columns="columns" :data-source="data">
          <template
            v-for="col in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']"
            :slot="col" slot-scope="text, record, index">
              <a-form-item :key="col">
                <a-input v-if="columns[col - 1].isEditable" :value="record[col]"
                  @change="e => handleChange(e.target.value, record.key, index, col)"
                    size="large" placeholder="xxx/xxx" />
                <a-select
                v-if="!columns[col - 1].isEditable"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  style="width: 100%"
                  size="large"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="value => handleChange(value, record.key, index, col)"
                >
                  <a-select-option value="jack">
                    jack
                  </a-select-option>
                  <a-select-option value="back">
                    back
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>
            <template slot="operation" slot-scope="text, record">
                  <a-popconfirm
                  v-if="data.length"
                  title="Вы уверены?"
                  @confirm="() => $emit('deleteRow', module.ID, record.key)"
                  >
                      <a href="javascript:;">Удалить</a>
                  </a-popconfirm>
              </template>
          </a-table>
        <a-button
        v-if="module.allowNewLine"
        type="primary" @click="() => $emit('addRow', module.ID)">
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
    module: Object,
  },
  methods: {
    handleChange(value, key, index, col) {
      console.log(value, key, col, index, this.data);
      const currentData = [...this.data];
      currentData[index][col] = value;
      this.$emit('changeModulesForm', currentData, this.module.ID);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modules-form {
    width: 100%;
    .ant-row.ant-form-item {
      margin: 0;
    }
}
</style>
