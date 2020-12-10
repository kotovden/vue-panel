<template>
    <div class="templates">
      <div class="wrapper">
        <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="data"
          >
          <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">Удалить</a>
        <a-list-item-meta>
          <a slot="title" href="#">{{ item.name }}</a>
        </a-list-item-meta>
        </a-list-item>
        </a-list>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Templates',
  data() {
    return {
      data: [
        {
          ID: 0,
          name: 'Шаблон 1',
          bitrixCreatorID: 'string',
          createDate: '2020-12-10T17:51:14.729Z',
          order: {
            ID: 0,
            title: 'string',
            orderNumber: 'string',
            deviceType: 'string',
            deviceName: 'string',
            count: 0,
            checkDate: '2020-12-10',
            deliveryDate: '2020-12-10',
            workTemp: 'string',
            auxiliaryVoltage: 'string',
            discreteInputVoltage: 'string',
            nameplateLabel: 'string',
            terminalVendorCodes: [
              'string',
            ],
            tabMode: 'string',
            isConsist: true,
            status: 'active',
            bitrixTaskID: 'string',
            bitrixCreatorID: 'string',
            createDate: '2020-12-10T17:51:14.729Z',
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
          },
        },
        {
          ID: 1,
          name: 'Шаблон 2',
          bitrixCreatorID: 'string',
          createDate: '2020-12-10T17:51:14.729Z',
          order: {
            ID: 0,
            title: 'string',
            orderNumber: 'string',
            deviceType: 'string',
            deviceName: 'string',
            count: 0,
            checkDate: '2020-12-10',
            deliveryDate: '2020-12-10',
            workTemp: 'string',
            auxiliaryVoltage: 'string',
            discreteInputVoltage: 'string',
            nameplateLabel: 'string',
            terminalVendorCodes: [
              'string',
            ],
            tabMode: 'string',
            isConsist: true,
            status: 'active',
            bitrixTaskID: 'string',
            bitrixCreatorID: 'string',
            createDate: '2020-12-10T17:51:14.729Z',
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
          },
        },
        {
          ID: 2,
          name: 'Шаблон 3',
          bitrixCreatorID: 'string',
          createDate: '2020-12-10T17:51:14.729Z',
          order: {
            ID: 0,
            title: 'string',
            orderNumber: 'string',
            deviceType: 'string',
            deviceName: 'string',
            count: 0,
            checkDate: '2020-12-10',
            deliveryDate: '2020-12-10',
            workTemp: 'string',
            auxiliaryVoltage: 'string',
            discreteInputVoltage: 'string',
            nameplateLabel: 'string',
            terminalVendorCodes: [
              'string',
            ],
            tabMode: 'string',
            isConsist: true,
            status: 'active',
            bitrixTaskID: 'string',
            bitrixCreatorID: 'string',
            createDate: '2020-12-10T17:51:14.729Z',
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
          },
        },
        {
          ID: 1,
          name: 'Шаблон 4',
          bitrixCreatorID: 'string',
          createDate: '2020-12-10T17:51:14.729Z',
          order: {
            ID: 0,
            title: 'string',
            orderNumber: 'string',
            deviceType: 'string',
            deviceName: 'string',
            count: 0,
            checkDate: '2020-12-10',
            deliveryDate: '2020-12-10',
            workTemp: 'string',
            auxiliaryVoltage: 'string',
            discreteInputVoltage: 'string',
            nameplateLabel: 'string',
            terminalVendorCodes: [
              'string',
            ],
            tabMode: 'string',
            isConsist: true,
            status: 'active',
            bitrixTaskID: 'string',
            bitrixCreatorID: 'string',
            createDate: '2020-12-10T17:51:14.729Z',
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
          },
        },
      ],
    };
  },
  methods: {
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.templates {
  width: 100%;
  text-align: left;
  .wrapper {
    width: 700px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding: 42px 24px 50px;
    margin: 20px auto 16px auto;
    transition: all .2s;
  }
}
</style>
