<template>
  <div class="new-order">
    <h3 v-if="type === 'create'">Добавить новую заявку на изготовление устройства</h3>
    <h3 v-if="type === 'edit'">Редактировать заявку на изготовление устройства</h3>
    <div class="block-wrp">
      <main-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" />
    </div>

    <div class="block-wrp">
      <modules-form
        :data="modules.data"
        :columns="modules.columns"
        @addRow="addRowModules"
        @changeModulesForm="changeModulesForm"
        @deleteRow="deleteRow" />
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

const columns = [
  {
    dataIndex: 'number',
    key: 'number',
    title: '№',
  },
  {
    title: 'Название блока',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Типоисполнение',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: 'Логический номер',
    key: 'logicNumber',
    dataIndex: 'logicNumber',
    scopedSlots: { customRender: 'logicNumber' },
  },
  {
    title: 'Размещение в корпусе',
    key: 'placed',
    dataIndex: 'placed',
    scopedSlots: { customRender: 'placed' },
  },
  {
    title: 'Примечание',
    key: 'description',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: 'Действия',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: 'Order',
  data() {
    return {
      labelCol: { span: 16 },
      wrapperCol: { span: 10 },
      form: {
        createDate: moment(new Date()),
        orderNumber: '',
        deviceType: '',
        deviceName: 'none',
        count: 9,
        checkDate: undefined,
        deliveryDate: undefined,
        workTemp: '',
        auxiliaryVoltage: '',
        discreteInputVoltage: '',
        nameplateLabel: '',
        terminalVendorCodes: '',
        tabMode: '',
        isConsist: undefined,
      },
      modules: {
        data: [],
        columns,
      },
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
    if (this.type === 'edit') {
      api.get(`/order?id=${this.$route.params.id}`).then((res) => {
        console.log(res);
        if (res && res.data) {
          const { result } = res.data;
          const order = result[0];
          const resultOrder = {};
          Object.keys(order).forEach((fieldName) => {
            if (formFields.includes(fieldName)) {
              resultOrder[fieldName] = result[0][fieldName];
            }
          });
          const createDate = moment(order.createDate, null);
          const deliveryDate = moment(order.deliveryDate, 'YYYY-MM-DD');
          const checkDate = moment(order.checkDate, 'YYYY-MM-DD');
          const terminalVendorCodes = order.terminalVendorCodes[0];
          this.form = {
            ...resultOrder, createDate, deliveryDate, checkDate, terminalVendorCodes,
          };
          console.log(this.order);
        }
      });
    }
  },
  props: {
    type: String,
    order: Object,
  },
  methods: {
    addRowModules() {
      this.modules.data = [
        ...this.modules.data, {
          key: this.modules.data.length + 1,
          number: this.modules.data.length + 1,
          name: '',
          type: '',
          logicNumber: '',
          placed: '',
          description: '',
        }];
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
    deleteRow(key) {
      const dataSource = [...this.modules.data];
      this.modules.data = dataSource.filter((item) => item.key !== key);
    },
    changeModulesForm(currentData) {
      this.modules.data = currentData;
    },
    changeFlexTable(currentData, type) {
      this[type] = currentData;
    },
    createOrder() {
      const createDate = moment(new Date());
      const deliveryDate = moment(this.form.deliveryDate).format('YYYY-MM-DD');
      const checkDate = moment(this.form.checkDate).format('YYYY-MM-DD');

      const newOrderData = {
        ...this.form,
        createDate,
        deliveryDate,
        checkDate,
        terminalVendorCodes: [
          'string',
        ],
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
      console.log(newOrderData);
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
