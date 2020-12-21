<template>
    <div class="fields-table">
       <h3 v-if="title">{{title}}</h3>
        <a-button class="add-row"
          type="primary" @click="() => $emit('addRow')">
            Добавить строку
        </a-button>
        <a-table
          :pagination="false" :columns="columns" :data-source="data">
          <template
            v-for="col in columnNames"
            :slot="col" slot-scope="text, record, index">
              <a-form-item :key="col">
                <a-input :value="record[col]"
                  @change="e => handleChange(e.target.value, index, col)"
                    size="large" />
              </a-form-item>
            </template>
            <template slot="sostav" slot-scope="text, record, index">
              <a-select
                mode="multiple"
                size="large"
                style="width: 100%"
                @change="e => handleChangeTags(e, index)"
              >
                <a-select-option v-for="composition in compositionData" :key="(composition.ID)">
                  {{ composition.name }}
                </a-select-option>
              </a-select>
            </template>
            <template slot="operations" slot-scope="text, record, index">
                  <a v-if="actions.copy"
                    @click="() => $emit('copyRow', index)"><a-icon type="copy" /></a>
                  <a-divider v-if="actions.copy" type="vertical" />
                  <a :class="[record.needSave ? 'need-save' : 'saved']"
                    v-if="actions.save" @click="() => $emit('saveRow', index)">
                    <a-icon type="cloud-upload" />
                  </a>
                  <a-divider if="actions.save" type="vertical" />
                  <a v-if="actions.delete" @click="() => $emit('deleteRow', index)">
                    <a-icon type="delete" />
                  </a>
              </template>
          </a-table>
    </div>
</template>

<script>
export default {
  name: 'FieldsTable',
  props: {
    data: Array,
    columns: Array,
    columnNames: Array,
    title: String,
    actions: Object,
    compositionData: Array,
  },
  methods: {
    handleChange(value, index, col) {
      const currentData = [...this.data];
      currentData[index][col] = value;
      currentData[index].needSave = true;
      this.$emit('handleChange', currentData, index, col, value);
    },
    handleChangeTags(value, index) {
      const currentData = [...this.data];
      currentData[index].compositions = value;
      currentData[index].needSave = true;
      this.$emit('handleChange', currentData, index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fields-table {
    width: 100%;
    position: relative;
    margin: 70px 0 0 0;
    .ant-row.ant-form-item {
      margin: 0;
    }
    .add-row {
      position: absolute;
      top: -20px;
      right: 0;
    }
    .saved {
      color: #cccccc;
    }
}
</style>
