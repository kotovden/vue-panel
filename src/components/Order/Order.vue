<template>
  <div class="new-order">
    <h3 v-if="type === 'create'">Добавить новую заявку на изготовление устройства</h3>
    <h3 v-if="type === 'edit'">Редактировать заявку на изготовление устройства</h3>
    <div class="block-wrp">
      <main-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" />
    </div>

    <div v-for="module in modulesBlocks"
        :key="module.id" class="block-wrp">
      <modules-form
        :module="module"
        :data="module.data"
        :columns="module.columns"
        @addRow="addRowModules"
        @changeModulesForm="changeModulesForm"
        @deleteRow="deleteRowModules" />
    </div>

    <div class="block-wrp">
      <flex-table
        title="Конфигурация аналоговых блоков:"
        type="analogBlocksOptions"
        :data="analogBlocksOptions.data"
        :rowsControls="true"
        :colsControls="true"
        @add-row="addRowFlexTable"
        @remove-row="removeRowFlexTable"
        @add-col="addColFlexTable"
        @remove-col="removeColFlexTable"
        @changeFlexTable="changeFlexTable" />
    </div>
    <div class="block-wrp">
      <flex-table
        title="Расположение блоков в терминале:"
        type="terminalBlocks"
        :data="terminalBlocks.data"
        :rowsControls="false"
        :colsControls="true"
        @add-row="addRowFlexTable"
        @remove-row="removeRowFlexTable"
        @add-col="addColFlexTable"
        @remove-col="removeColFlexTable"
        @changeFlexTable="changeFlexTable" />
    </div>
    <div class="block-wrp">
      <flex-table
        title="Опции:"
        type="options"
        :data="options.data"
        :rowsControls="true"
        :colsControls="false"
        @add-row="addRowFlexTable"
        @remove-row="removeRowFlexTable"
        @add-col="addColFlexTable"
        @remove-col="removeColFlexTable"
        @changeFlexTable="changeFlexTable" />
    </div>
    <div class="block-wrp">
      <h3>Дополнительные требования и замечания:</h3>
      <div class="description">
        <a-textarea :rows="12" />
      </div>
    </div>
    <div class="block-wrp">
      <p>
        Дата заказа: 01.01.2021 <br />
        Заказ от Иванова И.И.
      </p>
    </div>
    <div class="block-wrp">
      <a-button size="large" type="primary" @click="createOrder">
          Создать заказ
      </a-button>
      <a-button disabled size="large" style="margin-left: 10px;">
          Сохранить как шаблон
      </a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import MainForm from './MainForm.vue';
import ModulesForm from './ModulesForm.vue';
import api from '../../service/api';
import FlexTable from './FlexTable.vue';
import formFields from '../../map/map';

export default {
  name: 'Order',
  data() {
    return {
      labelCol: { span: 16 },
      wrapperCol: { span: 10 },
      createDate: moment(new Date()),
      form: {
        orderNumber: '',
        deviceType: '',
        deviceName: 'none',
        count: undefined,
        checkDate: undefined,
        deliveryDate: undefined,
        workTemp: '',
        auxiliaryVoltage: '',
        discreteInputVoltage: '',
        nameplateLabel: '',
        terminalVendorCodes: [],
        tabMode: '',
        isConsist: undefined,
      },
      modules: {
        data: [],
      },
      modulesBlocks: [],
      analogBlocksOptions: {
        data: [
          ['Логический номер', 'A1'],
          ['1', ['~l', '5/200']],
        ],
      },
      terminalBlocks: {
        data: [
          ['Логический номер', 'A1'],
          ['1', '~l'],
        ],
      },
      options: {
        data: [
          ['', ''],
          ['', ''],
        ],
      },
      formAnalogBlocksOptions: this.$form.createForm(this, { name: 'analog_blocks_options' }),
    };
  },
  mounted() {
    const promiseModules = api.get('/modules');
    const promises = [promiseModules];
    if (this.type === 'edit') {
      promises.push(api.get(`/order?id=${this.$route.params.id}`));
    }
    Promise.all(promises).then((values) => {
      if (values && values.length) {
        this.parseModulesBlockData(values[0]);
        const promisesFields = this.modulesBlocks.map((module) => api.get(`/module/${module.ID}/fields`));
        Promise.all(promisesFields).then((moduleFieldsValues) => {
          moduleFieldsValues.forEach((res, index) => {
            this.parseModulesBlockColumns(res, index);
          });
          console.log(moduleFieldsValues);
        }).catch((err) => {
          console.log(err);
        });
        if (this.type === 'edit') {
          const editRes = values[values.length - 1];
          if (editRes && editRes.data) {
            const { result } = editRes.data;
            const order = result[0];
            const resultOrder = {};
            Object.keys(order).forEach((fieldName) => {
              if (formFields.includes(fieldName)) {
                resultOrder[fieldName] = result[0][fieldName];
              }
            });
            if (order.form) {
              const createDate = moment(order.createDate, null);
              const deliveryDate = moment(order.form.deliveryDate, 'YYYY-MM-DD');
              const checkDate = moment(order.form.checkDate, 'YYYY-MM-DD');
              this.form = {
                ...order.form, createDate, deliveryDate, checkDate,
              };
            }
            console.log(this.form);
          }
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    if (this.type === 'edit') {
      api.get(`/order?id=${this.$route.params.id}`).then();
    }
  },
  props: {
    type: String,
  },
  methods: {
    getModuleById(id) {
      return this.modulesBlocks.find((module) => module.ID === id);
    },
    getModuleArrayPositionById(id) {
      return this.modulesBlocks.findIndex((module) => module.ID === id);
    },
    addRowModules(moduleId) {
      const modulePosition = this.getModuleArrayPositionById(moduleId);
      const modulesBlocks = [...this.modulesBlocks];
      if (!modulesBlocks[modulePosition]) {
        modulesBlocks[modulePosition] = {};
      }

      let oldData = [];
      if (modulesBlocks[modulePosition].data) {
        oldData = [...modulesBlocks[modulePosition].data];
      }
      let length = 0;
      if (modulesBlocks[modulePosition]
        && modulesBlocks[modulePosition].data
        && modulesBlocks[modulePosition]
          .data[modulesBlocks[modulePosition].data.length - 1]) {
        length = modulesBlocks[modulePosition]
          .data[modulesBlocks[modulePosition].data.length - 1].key;
      }
      modulesBlocks[modulePosition].data = [
        ...oldData, {
          key: length + 1,
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
        }];
      this.modulesBlocks = modulesBlocks;
    },
    deleteRowModules(moduleId, key) {
      const modulePosition = this.getModuleArrayPositionById(moduleId);
      const modulesBlocks = [...this.modulesBlocks];
      const dataSource = [...modulesBlocks[modulePosition].data];
      modulesBlocks[modulePosition].data = dataSource.filter((item) => item.key !== key);
      this.modulesBlocks = modulesBlocks;
    },
    addRowFlexTable(type) {
      const currentData = [...this[type].data];
      const headers = currentData[0];
      const newRow = headers.map((item, index) => {
        if (index > 0 && type === 'analogBlocksOptions') {
          return ['', ''];
        }
        return '';
      });
      currentData.push(newRow);
      this[type].data = currentData;
    },
    addColFlexTable(type) {
      const currentData = [...this[type].data];
      currentData.forEach((row, rowIndex) => {
        if (rowIndex > 0 && type === 'analogBlocksOptions') {
          row.push(['', '']);
        } else {
          row.push('');
        }
      });
      this[type].data = currentData;
    },
    removeColFlexTable(colIndex, type) {
      const currentData = [...this[type].data];
      currentData.forEach((row) => {
        row.splice(colIndex, 1);
      });
      this[type].data = currentData;
    },
    removeRowFlexTable(rowIndex, type) {
      const currentData = [...this[type].data];
      currentData.splice(rowIndex, 1);
      this[type].data = currentData;
    },
    changeModulesForm(currentData, moduleId) {
      const modulePosition = this.getModuleArrayPositionById(moduleId);
      const modulesBlocks = [...this.modulesBlocks];
      modulesBlocks[modulePosition].data = currentData;
      this.modulesBlocks = modulesBlocks;
    },
    changeFlexTable(currentData, type) {
      this[type] = currentData;
    },
    parseModulesBlockData(res) {
      if (res && res.data) {
        let modulesBlocks = res.data.result;
        modulesBlocks = modulesBlocks.sort((a, b) => {
          if (a.position && !b.position) {
            return -1;
          }
          return a.position - b.position;
        });
        this.modulesBlocks = modulesBlocks;
      }
    },
    parseModulesBlockColumns(res, resIndex) {
      if (res && res.data) {
        const moduleColumns = res.data.result.sort((a, b) => a.ID - b.ID).map((item, index) => {
          let width = null;
          if (index === 0) {
            width = 80;
          }
          return {
            width,
            title: item.name,
            key: item.ID,
            dataIndex: item.ID,
            scopedSlots: { customRender: `${item.ID}` },
            isEditable: !!item.isEditable,
          };
        });
        moduleColumns.push({
          title: 'Действия',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        });
        const modulesBlocks = [...this.modulesBlocks];
        modulesBlocks[resIndex].columns = moduleColumns;
        this.modulesBlocks = modulesBlocks;
      }
    },
    createOrder() {
      const createDate = moment(new Date());
      const deliveryDate = moment(this.form.deliveryDate).format('YYYY-MM-DD');
      const checkDate = moment(this.form.checkDate).format('YYYY-MM-DD');
      const count = +this.form.count;

      const newOrderData = {
        form: {
          ...this.form,
          deliveryDate,
          checkDate,
          count,
        },
        createDate,
        isConsist: true,
        status: 'active',
        bitrixTaskID: 'string',
        bitrixCreatorID: 'string',
        modules: [
          {
            moduleID: 0,
            moduleName: 'string',
            rows: [
              {
                fieldID: 0,
                fieldName: 'string',
                value: 'string',
              },
            ],
          },
        ],
        analogBlocksOptions: {
          headers: [
            {
              label: 'string',
              colspan: 0,
            },
          ],
          rows: [
            [
              'string',
            ],
          ],
        },
        terminalBlocksLocation: {
          headers: [
            {
              label: 'string',
              colspan: 0,
            },
          ],
          rows: [
            [
              'string',
            ],
          ],
        },
        options: {
          headers: [
            {
              label: 'string',
              colspan: 0,
            },
          ],
          rows: [
            [
              'string',
            ],
          ],
        },
        note: 'string',
      };
      api.post('/order', newOrderData).then((res) => {
        console.log('res', res);
      }).catch((err) => {
        console.log('err', err);
      });
    },
  },
  components: {
    MainForm,
    ModulesForm,
    FlexTable,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.new-order {
    h3 {
        margin: 20px 0;
    }
    .block-wrp {
      padding: 0 0 20px 0;
    }
    .description {
      width: 700px;
    }
}
</style>
