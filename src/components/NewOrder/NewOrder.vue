<template>
  <div class="new-order">
    <h3>Добавить новую заявку на изготовление устройства</h3>
    <!-- <main-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" />
    <modules-form
        :data="modules.data"
        :columns="modules.columns"
        @addRow="addRowModules"
        @changeModulesForm="changeModulesForm"
        @deleteRow="deleteRow" /> -->
        <analog-blocks-options
        :data="analogBlocksOptions.data"
        @addRow="addRowAnalogBlocksOption"
        @changeAnalogBlocksOptions="changeAnalogBlocksOptions" />
  </div>
</template>

<script>
// @ is an alias to /src
// import MainForm from './MainForm.vue';
// import ModulesForm from './ModulesForm.vue';
// import api from '../../service/api';
import AnalogBlocksOptions from './AnalogBlocksOptions.vue';

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
        data: [],
        columns,
      },
      analogBlocksOptions: {
        data: [
          ['Логический номер', 'A1', 'A1'],
          ['1', ['~l', '5/200'], ['~l', '5/200']],
          ['1', ['~l', '5/200'], ['~l', '5/200', '123wqeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']],
        ],
      },
      formAnalogBlocksOptions: this.$form.createForm(this, { name: 'analog_blocks_options' }),
    };
  },
  mounted() {
    // api.get('/modules').then((res) => {
    //   console.log(res);
    // });
  },
  props: {
  },
  methods: {
    addRowModules() {
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
    addRowAnalogBlocksOption() {
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
      this.modules.data = currentData;
    },
    changeAnalogBlocksOptions(currentData) {
      this.analogBlocksOptions = currentData;
    },
  },
  components: {
    AnalogBlocksOptions,
    // MainForm,
    // ModulesForm,
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
