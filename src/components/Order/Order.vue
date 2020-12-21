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
        :columnNames="module.columnNames"
        @addRow="addRowModules"
        @changeModulesForm="changeModulesForm"
        @deleteRow="deleteRowModules" />
    </div>

    <div class="block-wrp">
      <flex-table
        title="Конфигурация аналоговых блоков:"
        type="analogBlocksOptions"
        :data="analogBlocksOptions.rows"
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
        type="terminalBlocksLocation"
        :data="terminalBlocksLocation.rows"
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
        :data="options.rows"
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
        <a-textarea v-model="note" :rows="12" />
      </div>
    </div>
    <div class="block-wrp">
      <p>
        Дата заказа: {{createDate.format('DD.MM.YYYY')}} <br />
        Заказ от Иванова И.И.
      </p>
    </div>
    <div class="block-wrp">
      <a-button size="large" type="primary" @click="createOrder">
          Создать заказ
      </a-button>
    </div>
    <div style="display: flex;" class="block-wrp">
      <a-button  style="margin-right: 10px;" size="large" @click="createOrderTemplate">
          Сохранить как шаблон
      </a-button>
      <div style="position: relative;">
        <label class="template-danger-label"
          v-if="visibleTemplateNameError">
          {{visibleTemplateNameError}}
        </label>
        <a-input
          @change="changetemplateName"
          :class="visibleTemplateNameError ? 'template-danger' : ''"
          v-if="visibleTemplateName" style="width: 200px;"
          size="large" v-model="templateName" placeholder="Имя шаблона" />
      </div>
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
      visibleTemplateNameError: null,
      visibleTemplateName: false,
      labelCol: { span: 16 },
      wrapperCol: { span: 10 },
      createDate: moment(new Date()),
      form: {
        orderNumber: '',
        deviceType: '',
        deviceName: '',
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
        rows: [
          ['Логический номер', 'A1'],
          [['1'], ['', '']],
        ],
      },
      terminalBlocksLocation: {
        rows: [
          [['Логический номер'], ['A1']],
          [['1'], ['~l']],
        ],
      },
      options: {
        rows: [
          [[''], ['']],
        ],
      },
      note: '',
      templateName: '',
    };
  },
  mounted() {
    const promiseModules = api.get('/modules?limit=all');
    const promises = [promiseModules];
    switch (this.type) {
      case 'edit':
        promises.push(api.get(`/order?id=${this.$route.params.id}`));
        break;
      case 'edit-template':
        promises.push(api.get(`/orderTemplate?id=${this.$route.params.id}`));
        break;
      default:
        break;
    }
    Promise.all(promises).then((values) => {
      if (values && values.length) {
        this.parseModulesBlockData(values[0]);
        const promisesFields = this.modulesBlocks.map((module) => api.get(`/module/${module.ID}/fields`));
        Promise.all(promisesFields).then((moduleFieldsValues) => {
          moduleFieldsValues.forEach((res, index) => {
            this.parseModulesBlockColumns(res, index);
          });
        }).catch((err) => {
          console.log(err);
        });
        if (this.type === 'edit') {
          const editRes = values[values.length - 1];
          if (editRes && editRes.data) {
            const { result } = editRes.data;
            if (result) {
              const order = result[0];
              this.parseAndFillOrder(order);
            }
          }
        }
        if (this.type === 'edit-template') {
          const editRes = values[values.length - 1];
          if (editRes && editRes.data) {
            const { result } = editRes.data;
            if (result) {
              const orderTemplate = result[0];
              this.parseAndFillOrderTemplate(orderTemplate);
            }
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
    changetemplateName(e) {
      if (e && e.target && e.target.value.trim() !== 0) {
        this.visibleTemplateNameError = null;
      } else {
        this.visibleTemplateNameError = 'Заполните имя шаблона';
      }
    },
    parseAndFillOrder(order) {
      const resultOrder = {};
      Object.keys(order).forEach((fieldName) => {
        if (formFields.includes(fieldName)) {
          resultOrder[fieldName] = order[fieldName];
        }
      });
      if (order.form) {
        const createDate = moment(order.createDate, null);
        const deliveryDate = moment(order.form.deliveryDate, 'YYYY-MM-DD');
        const checkDate = moment(order.form.checkDate, 'YYYY-MM-DD');
        this.form = {
          ...order.form, createDate, deliveryDate, checkDate,
        };
        this.note = order.form.note;
      }
      this.analogBlocksOptions = { ...order.analogBlocksOptions };
      this.terminalBlocksLocation = { ...order.terminalBlocksLocation };
      this.options = { ...order.options };
    },
    parseAndFillOrderTemplate(orderTemplate) {
      const order = { ...orderTemplate.order };
      this.templateName = orderTemplate.name;
      this.parseAndFillOrder(order);
    },
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
      const currentData = [...this[type].rows];
      const headers = currentData[0];
      const newRow = headers.map((item, index) => {
        if (index > 0 && type === 'analogBlocksOptions') {
          return ['', ''];
        }
        return [''];
      });
      currentData.push(newRow);
      this[type].rows = currentData;
    },
    addColFlexTable(type) {
      const currentData = [...this[type].rows];
      currentData.forEach((row, rowIndex) => {
        if (rowIndex > 0 && type === 'analogBlocksOptions') {
          row.push(['', '']);
        } else {
          row.push('');
        }
      });
      this[type].rows = currentData;
    },
    removeColFlexTable(colIndex, type) {
      const currentData = [...this[type].rows];
      currentData.forEach((row) => {
        row.splice(colIndex, 1);
      });
      this[type].rows = currentData;
    },
    removeRowFlexTable(rowIndex, type) {
      const currentData = [...this[type].rows];
      currentData.splice(rowIndex, 1);
      this[type].rows = currentData;
    },
    changeModulesForm(currentData, moduleId) {
      const modulePosition = this.getModuleArrayPositionById(moduleId);
      const modulesBlocks = [...this.modulesBlocks];
      modulesBlocks[modulePosition].data = currentData;
      this.modulesBlocks = modulesBlocks;
    },
    changeFlexTable(value, rowIndex, colIndex, col, type, subColIndex) {
      const currentData = [...this[type].rows];
      if (subColIndex !== undefined && subColIndex !== null) {
        currentData[rowIndex][colIndex][subColIndex] = value;
        currentData[rowIndex][colIndex][subColIndex] = value;
      } else {
        currentData[rowIndex][colIndex] = value;
        currentData[rowIndex][colIndex] = value;
      }
      this[type].rows = currentData;
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
        modulesBlocks.forEach((item) => {
          if (item && item.allowNewLine) {
            this.addRowModules(item.ID);
          }
        });
      }
    },
    parseModulesBlockColumns(res, resIndex) {
      if (res && res.data) {
        const moduleColumns = res.data.result
          .sort((a, b) => a.position - b.position).map((item) => ({
            title: item.name,
            key: item.ID,
            dataIndex: item.ID,
            scopedSlots: { customRender: `${item.ID}` },
            isEditable: !!item.isEditable,
          }));
        moduleColumns.push({
          title: 'Действия',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        });
        const modulesBlocks = [...this.modulesBlocks];
        modulesBlocks[resIndex].columns = moduleColumns;
        modulesBlocks[resIndex].columnNames = moduleColumns.map((item) => item.dataIndex);
        this.modulesBlocks = modulesBlocks;
      }
    },
    getOrderModel() {
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
          note: this.note,
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
          rows: this.analogBlocksOptions.rows,
        },
        terminalBlocksLocation: {
          rows: this.terminalBlocksLocation.rows,
        },
        options: {
          rows: this.options.rows,
        },
      };
      return newOrderData;
    },
    createOrder() {
      api.post('/order', this.getOrderModel()).then(() => {
        this.$router.push({ path: '/orders-in-work' });
      }).catch((err) => {
        console.log(err);
      });
    },
    createOrderTemplate() {
      if (this.visibleTemplateName) {
        if (this.templateName.trim() === '') {
          this.visibleTemplateNameError = 'Заполните имя шаблона';
          return;
        }
        const order = this.getOrderModel();
        const orderTemplate = {
          order,
          createDate: order.createDate,
          bitrixCreatorID: order.bitrixCreatorID,
          name: this.templateName,
        };
        api.post('/orderTemplate', orderTemplate).then(() => {
          this.$router.push({ path: '/templates' });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.visibleTemplateName = true;
      }
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
    .template-danger {
      border-color: red;
    }
    .template-danger-label {
      color:red;
      position:absolute;
      top:-20px;
      left:10px;
    }
}
</style>
