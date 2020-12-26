<template>
  <div class="module" v-if="currentModule.name">
    <h1>{{currentModule && currentModule.name}}</h1>
    <p>Модуль - блок таблица на форме.</p>
    <template>
      <a-checkbox :checked="currentModule.allowNewLine"
        @change="(e) => onChangeCheckbox({allowNewLine: e.target.checked})">
        Добавление новых строк
      </a-checkbox>
      <br>
      <a-checkbox :checked="currentModule.showComposition"
        @change="(e) => onChangeCheckbox({showComposition: e.target.checked})">
        Показывать состав модуля
      </a-checkbox>
      <br>
      <list :data="fields"
        :needUpDownArrows="true"
        :needCheckbox="true"
        @handleChangeCheckbox="handleChangeCheckboxIsEditable"
        @up="up"
        @down="down"
        @check="check"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @createListItem="createField" />
      <br>
      <fields-table
        title="Таблица значений"
        :actions="{ copy: true, delete: true, save: true, }"
        :columns="fieldsColumns"
        :columnNames="fieldsColumnNames"
        :data="possibleValuesData"
        :compositionData="compositionDataForFields"
        @handleChange="handleChangePossibleValues"
        @saveRow="saveRowPossibleValues"
        @deleteRow="deleteRowPossibleValues"
        @copyRow="copyRowPossibleValues"
        @addRow="addRowPossibleValues" />
      <fields-table
        title="Таблица Состава"
        :actions="{ delete: true, save: true }"
        :columns="compositionColumns"
        :columnNames="compositionColumnNames"
        :data="compositionData"
        @handleChange="handleChangeComposition"
        @saveRow="saveRowComposition"
        @deleteRow="deleteRowComposition"
        @addRow="addRowComposition" />
    </template>
  </div>
</template>

<script>
import api from '@/service/api';
import List from '../components/List.vue';
import FieldsTable from '../components/FieldsTable.vue';

export default {
  components: { List, FieldsTable },
  name: 'EditModule',
  data() {
    return {
      currentModule: {},
      fields: [],
      possibleValues: [],
      compositionColumns: [
        {
          title: 'Наименование',
          key: 'name',
          dataIndex: 'name',
          width: '200px',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Название для расчетов',
          key: 'calcName',
          dataIndex: 'calcName',
          width: '200px',
          scopedSlots: { customRender: 'calcName' },
        },
        {
          title: 'Количество',
          key: 'count',
          dataIndex: 'count',
          width: '120px',
          scopedSlots: { customRender: 'count' },
        },
        {
          title: 'Описание',
          key: 'desc',
          dataIndex: 'desc',
          scopedSlots: { customRender: 'desc' },
        },
        {
          title: 'Действия',
          key: 'operations',
          dataIndex: 'operations',
          width: '120px',
          scopedSlots: { customRender: 'operations' },
        },
      ],
      compositionColumnNames: ['name', 'calcName', 'count', 'desc', 'sostav', 'operations'],
      compositionData: [],
    };
  },
  computed: {
    fieldsColumns() {
      const columns = [
        {
          title: 'Состав',
          key: 'sostav',
          dataIndex: 'sostav',
          scopedSlots: { customRender: 'sostav' },
        },
        {
          title: 'Действия',
          key: 'operations',
          dataIndex: 'operations',
          width: '160px',
          scopedSlots: { customRender: 'operations' },
        },
      ];
      if (this && this.fields && this.fields.length) {
        return [...this.fields.map((item) => ({
          title: item.name,
          key: item.ID,
          dataIndex: item.ID,
          width: '200px',
          scopedSlots: { customRender: `${item.ID}` },
        })), ...columns];
      }
      return [];
    },
    fieldsColumnNames() {
      const columnNames = ['sostav', 'operations'];
      if (this && this.fields && this.fields.length) {
        return [...this.fields.map((item) => item.ID), ...columnNames];
      }
      return [...columnNames];
    },
    possibleValuesData() {
      if (this.possibleValues && this.possibleValues.length) {
        return this.possibleValues.map((possibleValuesItem, index) => {
          const values = [...possibleValuesItem.values];
          let compositions = [];
          if (possibleValuesItem && possibleValuesItem.compositions) {
            compositions = [...possibleValuesItem.compositions];
          }
          const rowItem = { key: index, needSave: possibleValuesItem.needSave };
          values.forEach((element) => {
            if (typeof (element.FieldID) !== 'undefined' && element.FieldID !== null) {
              rowItem[element.FieldID] = element.Value;
            }
          });
          rowItem.sostav = compositions;
          return rowItem;
        });
      }
      return [];
    },
    compositionDataForFields() {
      return this.compositionData.filter((item) => !!item.ID);
    },
  },
  mounted() {
    this.loadFields(this.$route.params.id);
    this.loadModule(this.$route.params.id);
    this.loadPossibleValues(this.$route.params.id);
    this.loadCompositions(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.currentModule = {};
    this.fields = [];
    this.loadFields(to.params.id);
    this.loadModule(to.params.id);
    this.loadPossibleValues(to.params.id);
    this.loadCompositions(to.params.id);
    next();
  },
  methods: {
    loadModule(moduleId) {
      api.get(`/modules?id=${moduleId}`).then((res) => {
        if (res && res.data) {
          this.currentModule = { ...res.data.result[0] };
        }
      }).catch((err) => { console.log(err); });
    },
    loadPossibleValues(moduleId) {
      api.get(`/module/${moduleId}/possibleValues`).then((res) => {
        if (res && res.data) {
          this.possibleValues = [...res.data.result];
        }
      }).catch((err) => { console.log(err); });
    },
    loadFields(moduleId) {
      api.get(`/module/${moduleId}/fields?limit=all`).then((res) => {
        if (res && res.data) {
          this.fields = res.data.result.sort((item1, item2) => item1.position - item2.position);
        }
      }).catch((err) => { console.log(err); });
    },
    loadCompositions(moduleId) {
      api.get(`/module/${moduleId}/composition`).then((res) => {
        if (res && res.data) {
          const compositionDataNeedSave = [...this.compositionData].filter((item) => item.needSave);
          this.compositionData = [...res.data.result, ...compositionDataNeedSave]
            .map((item, index) => ({ needSave: false, ...item, key: index }));
        }
      }).catch((err) => { console.log(err); });
    },
    putField(ID, currentField) {
      return api.put(`/module/${this.$route.params.id}/fields?id=${ID}`, currentField).then((res) => {
        if (res && res.data) {
          this.loadFields(this.$route.params.id);
        }
      }).catch((err) => { console.log(err); });
    },
    handleChangeComposition(compositions) {
      this.compositionData = [...compositions];
    },
    handleChangePossibleValues(newPossibleValues, rowIndex, colIndex) {
      const possibleValues = [...this.possibleValues];
      if (possibleValues[rowIndex] && possibleValues[rowIndex].values) {
        const values = [...possibleValues[rowIndex].values];
        const currentValueIndex = values.findIndex((value) => value.FieldID === colIndex);
        if (currentValueIndex >= 0) {
          values[currentValueIndex].Value = newPossibleValues[rowIndex][colIndex];
        } else {
          values.push({
            FieldID: colIndex,
            ModuleID: this.$route.params.id,
            Value: newPossibleValues[rowIndex][colIndex],
          });
        }
        possibleValues[rowIndex].values = values;
        possibleValues[rowIndex].needSave = true;
        possibleValues[rowIndex].compositions = newPossibleValues[rowIndex].compositions;
        this.possibleValues = possibleValues;
      }
    },
    deleteRowComposition(rowIndex) {
      const composition = this.compositionData[rowIndex];
      if (composition.ID) {
        api.delete(`/module/${this.$route.params.id}/composition?id=${composition.ID}`, composition).then((res) => {
          if (res && res.data) {
            this.compositionData.splice(rowIndex, 1);
          }
        })
          .catch((err) => { console.log(err); });
      } else {
        this.compositionData.splice(rowIndex, 1);
      }
    },
    saveRowComposition(rowIndex) {
      const composition = {
        ...this.compositionData[rowIndex],
        count: +this.compositionData[rowIndex].count,
      };
      const compositionData = [...this.compositionData];

      if (composition && composition.ID) {
        api.put(`/module/${this.$route.params.id}/composition?id=${composition.ID}`, composition).then((res) => {
          if (res && res.data) {
            compositionData[rowIndex] = {
              ...compositionData[rowIndex],
              ...res.data.result,
              needSave: false,
            };
            this.compositionData = compositionData;
          }
        }).catch((err) => { console.log(err); });
      } else {
        api.post(`/module/${this.$route.params.id}/composition`, composition).then((res) => {
          if (res && res.data) {
            compositionData[rowIndex] = {
              ...this.compositionData[rowIndex],
              ...res.data.result,
              needSave: false,
            };
            this.compositionData = compositionData;
          }
        }).catch((err) => { console.log(err); });
      }
    },
    deleteRowPossibleValues(rowIndex) {
      const possibleValue = this.possibleValues[rowIndex];
      if (possibleValue.recordID) {
        api.delete(`/module/${this.$route.params.id}/possibleValues?id=${possibleValue.recordID}`).then((res) => {
          if (res && res.data) {
            this.possibleValues.splice(rowIndex, 1);
          }
        })
          .catch((err) => { console.log(err); });
      } else {
        this.possibleValues.splice(rowIndex, 1);
      }
    },
    saveRowPossibleValues(rowIndex) {
      const possibleValues = [...this.possibleValues];
      const possibleValuesItem = {
        ...possibleValues[rowIndex],
        values: possibleValues[rowIndex].values
          .map((item) => ({ ...item, ModuleID: +item.ModuleID })),
      };

      if (possibleValuesItem && possibleValuesItem.recordID) {
        api.put(`/module/${this.$route.params.id}/possibleValues`, possibleValuesItem).then((res) => {
          if (res && res.data) {
            possibleValues[rowIndex] = {
              ...possibleValues[rowIndex],
              ...res.data.result,
              needSave: false,
            };
            this.possibleValues = possibleValues;
          }
        }).catch((err) => { console.log(err); });
      } else {
        api.post(`/module/${this.$route.params.id}/possibleValues`, possibleValuesItem).then((res) => {
          if (res && res.data) {
            possibleValues[rowIndex] = {
              ...possibleValues[rowIndex],
              ...res.data.result,
              needSave: false,
            };
            this.possibleValues = possibleValues;
          }
        }).catch((err) => { console.log(err); });
      }
    },
    addRowComposition() {
      let lastKey = 0;
      if (this.compositionData[this.compositionData.length - 1]) {
        lastKey = +this.compositionData[this.compositionData.length - 1].key + 1;
      }
      this.compositionData.push({
        key: Math.max(this.compositionData.length, lastKey),
        name: '',
        nameCalc: '',
        count: '',
        description: '',
        needSave: true,
      });
    },
    addRowPossibleValues() {
      const possibleValues = [...this.possibleValues];
      const newPossibleValuesItem = { needSave: true };
      newPossibleValuesItem.values = this.fields.map((item) => ({
        FieldID: item.ID,
        ModuleID: this.$route.params.id,
        Value: '',
      }));
      possibleValues[this.possibleValues.length] = newPossibleValuesItem;
      this.possibleValues = possibleValues;
    },
    copyRowPossibleValues(rowIndex) {
      const possibleValues = [...this.possibleValues];
      const fromPossibleValue = possibleValues[rowIndex];
      const newPossibleValuesItem = { needSave: true };
      newPossibleValuesItem.values = fromPossibleValue.values.map((item) => ({
        FieldID: item.FieldID,
        ModuleID: item.ModuleID,
        Value: item.Value,
      }));
      newPossibleValuesItem.compositions = [...fromPossibleValue.compositions];
      possibleValues[this.possibleValues.length] = newPossibleValuesItem;
      this.possibleValues = possibleValues;
    },
    up(event, item, index) {
      event.stopPropagation();
      if (index > 0) {
        const prevIndex = index - 1;
        const prevItem = this.fields[prevIndex];
        if (prevItem) {
          const fields = [...this.fields];
          const currentPosition = fields[index].position;
          const prevPosition = fields[prevIndex].position;
          fields[prevIndex].position = currentPosition;
          fields[index].position = prevPosition;
          this.putField(item.ID, fields[index]);
          this.putField(prevItem.ID, fields[prevIndex]);
        }
      }
    },
    down(event, item, index) {
      event.stopPropagation();
      if (index < this.fields.length - 1) {
        const nextIndex = index + 1;
        const nextItem = this.fields[nextIndex];
        if (nextItem) {
          const fields = [...this.fields];
          const currentPosition = fields[index].position;
          const prevPosition = fields[nextIndex].position;
          fields[nextIndex].position = currentPosition;
          fields[index].position = prevPosition;
          this.putField(item.ID, fields[index]);
          this.putField(nextItem.ID, fields[nextIndex]);
        }
      }
    },
    check(event, item, index) {
      const fields = [...this.fields];
      this.putField(item.ID, this.fields[index]).then(() => {
        fields[index].isEdit = false;
        this.fields = fields;
      });
    },
    handleEdit(event, item, index) {
      const fields = [...this.fields];
      fields[index].isEdit = true;
      this.fields = fields;
    },
    handleChangeCheckboxIsEditable(checked, item, index) {
      const fields = [...this.fields];
      fields[index].isEditable = checked;
      this.putField(item.ID, fields[index]).then((res) => {
        if (res && res.data) {
          this.fields = fields;
        }
      });
    },
    handleDelete(event, ID) {
      api.delete(`/module/${this.$route.params.id}/fields?id=${ID}`).then((res) => {
        if (res && res.data && res.data.result === 'OK') {
          this.loadFields(this.$route.params.id);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    createField() {
      let position = 0;
      if (this.fields && this.fields.length && this.fields[this.fields.length - 1]) {
        position = this.fields[this.fields.length - 1].position;
      }
      const newField = {
        position: position + 1,
        name: 'Новое свойство',
        isEditable: false,
      };
      api.post(`module/${this.$route.params.id}/fields`, newField).then((res) => {
        if (res && res.data) {
          this.loadFields(this.$route.params.id);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    onChangeCheckbox(object) {
      this.currentModule = { ...this.currentModule, ...object };
      this.putModule(this.currentModule);
      this.$emit('loadModules');
    },
    putModule(currentModule) {
      return api.put(`/modules?id=${this.$route.params.id}`, currentModule).then((res) => {
        if (res && res.data) {
          this.loadModule(this.$route.params.id);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.module {
  text-align: left;
}

</style>
