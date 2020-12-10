<template>
    <div class="main-form">
        <a-form-model
            layout="vertical"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="№ Заказа:">
                <a-input size="small" placeholder="xxx/xxx" v-model="form.orderNumber" />
            </a-form-model-item>
            <a-form-model-item label="Тип устройства:">
                <a-input size="small" v-model="form.type" />
            </a-form-model-item>
            <a-form-model-item label="Количество:">
                <a-input size="small" v-model="form.count" />
            </a-form-model-item>
            <a-form-model-item label="Срок передачи для проверки:">
                <a-date-picker
                    v-model="form.date1"
                    size="small"
                    show-time
                    type="date"
                    placeholder="Выберите дату"
                    style="width: 100%;"
                />
            </a-form-model-item>
            <a-form-model-item label="Дата отправки:">
                <a-date-picker
                    v-model="form.date2"
                    size="small"
                    show-time
                    type="date"
                    placeholder="Выберите дату"
                    style="width: 100%;"
                />
            </a-form-model-item>
            <a-form-model-item label="Напряжение оперативного питания, В:">
                <a-input size="small" v-model="form.workTemp" />
            </a-form-model-item>
            <a-form-model-item label="Рабочий диапазон температур, С:">
                <a-input size="small" v-model="form.auxiliaryVoltage" />
            </a-form-model-item>
            <a-form-model-item label="Напряжение дискретных входов, В:">
                <a-input size="small" v-model="form.discreteInputVoltage" />
            </a-form-model-item>
            <a-form-model-item label="Название устройства для шильдика:">
                <a-input size="small" v-model="form.nameplateLabel" />
            </a-form-model-item>
            <a-form-model-item label="Заводской номер терминала:">
                <a-input size="small" v-model="form.terminalVendorCodes" />
            </a-form-model-item>
            <a-form-model-item label="Модификация вкладок:">
                <a-input size="small" v-model="form.tabMode" />
            </a-form-model-item>
            <a-form-model-item label="Терминал входит в состав шкафа:">
                <a-switch size="small" v-model="form.isConsist" />
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
  name: 'MainForm',
  props: {
    labelCol: Object,
    wrapperCol: Object,
    form: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-form {
    width: 700px;
    .ant-form-item {
        margin-bottom: 3px;
    }
}
</style>
