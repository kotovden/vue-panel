<template>
  <div class="new-order">
    <h3>Добавить новую заявку на изготовление устройства</h3>
    <!-- <main-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" /> -->
    <modules-form
        :data="modules.data"
        :columns="modules.columns"
        @addRow="addRow"
        @deleteRow="deleteRow" />
  </div>
</template>

<script>
// @ is an alias to /src
import ModulesForm from './ModulesForm.vue';
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
  },
  {
    title: 'Типоисполнение',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Логический номер',
    key: 'logicNumber',
    dataIndex: 'logicNumber',
  },
  {
    title: 'Размещение в корпусе',
    key: 'placed',
    dataIndex: 'placed',
  },
  {
    title: 'Примечание',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [
  {
    key: '1',
    number: '1',
    name: 'John Brown',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    number: '1',
    name: 'John Brown1',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '3',
    number: '1',
    name: 'John Brown2',
    logicNumber: 'New York No. 1 Lake Park',
    placed: 'New York No. 1 Lake Park',
    description: 'New York No. 1 Lake Park',
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
    };
  },
  props: {
  },
  methods: {
    addRow() {
      console.log('submit!', this.form);
      this.modules.data = [
        ...this.modules.data, {
          key: this.modules.data.length + 1,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        }];
    },
    deleteRow(key) {
      const dataSource = [...this.modules.data];
      this.modules.data = dataSource.filter((item) => item.key !== key);
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
