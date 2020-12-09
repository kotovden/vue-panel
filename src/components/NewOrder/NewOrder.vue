<template>
  <div class="new-order">
    <h3>Добавить новую заявку на изготовление устройства</h3>
    <!-- <main-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" /> -->
    <modules-form
        :data="modules.data"
        :columns="modules.columns"
        @addRow="addRow"
        @changeModulesForm="changeModulesForm"
        @deleteRow="deleteRow" />
  </div>
</template>

<script>
// @ is an alias to /src
import ModulesForm from './ModulesForm.vue';
import api from '../../service/api';

// import MainForm from './MainForm.vue';
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

const data = [
  {
    key: '1',
    number: '1',
    name: 'John Brown',
    type: 'qwe',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park1',
  },
  {
    key: '2',
    number: '2',
    name: 'John Brown1',
    type: 'qwe',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park2',
  },
  {
    key: '3',
    number: '3',
    type: 'qwe',
    name: 'John Brown2',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park3',
  },
];
export default {
  name: 'NewOrder',
  data() {
    return {
      labelCol: { span: 16 },
      wrapperCol: { span: 10 },
      form: {
        orderNumber: '',
        deviceType: '',
        deviceName: '',
        count: '',
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
        data,
        columns,
      },
      formAnalogBlocksOptions: this.$form.createForm(this, { name: 'analog_blocks_options' }),
    };
  },
  mounted() {
    console.log(123);
    api.get('/modules').then((res) => {
      console.log(res);
    });
  },
  props: {
  },
  methods: {
    addRow() {
      console.log('submit!', this.form);
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
    deleteRow(key) {
      const dataSource = [...this.modules.data];
      this.modules.data = dataSource.filter((item) => item.key !== key);
    },
    changeModulesForm(currentData) {
      this.data = currentData;
    },
  },
  components: {
    // MainForm,
    ModulesForm,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.new-order {
    h3 {
        margin: 20px 0;
    }
}
</style>
