<template>
    <div class="flex-table">
       <h3>{{title}}</h3>
       <div class="v-flex-wrapper">
        <div class="v-flex-row" :key="rowIndex" v-for="(row, rowIndex) in data">
          <a-button v-if="colsControls && rowIndex === 0"
            class="add-col" type="primary" @click="() => $emit('add-col', type)">
              Добавить столбец
          </a-button>
          <a-popconfirm
                  v-if="rowsControls && rowIndex !== 0"
                  title="Вы уверены?"
          @confirm="() => $emit('remove-row', rowIndex, type)"
          >
              <a-button
                class="remove-row" type="danger">
                  Удалить строку
              </a-button>
          </a-popconfirm>
          <div
          :key="colIndex" v-for="(col, colIndex) in row">
          <a-popconfirm
                  v-if="colsControls && rowIndex === 0 && colIndex !== 0"
                  title="Вы уверены?"
          @confirm="() => $emit('remove-col', colIndex, type)"
          >
              <a-button
                class="remove-col" type="danger">
                  Удалить столбец
              </a-button>
          </a-popconfirm>
          <a-button v-if="rowsControls && rowIndex === data.length - 1 && colIndex === 0"
            class="add-row" type="primary" @click="() => $emit('add-row', type)">
              Добавить строку
          </a-button>
          <a-input v-if="typeof col === 'string'" :value="col"
                  @change="e => handleChange(e.target.value, rowIndex, colIndex, col, type)"
                    size="large" />
          <div class="sub-col-wrp" v-if="typeof col !== 'string'">
            <div :key="subColIndex" v-for="(subCol, subColIndex) in col">
              <a-input :value="subCol"
                @change="e =>
                  handleChange(e.target.value, rowIndex, colIndex, col, type, subColIndex)"
                    size="large" />
            </div>
          </div>
          </div>
        </div>
       </div>

    </div>
</template>

<script>
export default {
  name: 'FlexTable',
  props: {
    data: Array,
    rowsControls: Boolean,
    colsControls: Boolean,
    title: String,
    type: String,
  },
  methods: {
    getClass(rowIndex, colIndex) {
      let className = 'v-double';
      if (rowIndex === 0 || colIndex === 0) {
        className = 'v-single';
      }
      return className;
    },
    deleteRow(key) {
      this.$emit('deleteRow', key);
    },
    handleChange(value, rowIndex, colIndex, col, type, subColIndex) {
      this.$emit('changeFlexTable', value, rowIndex, colIndex, col, type, subColIndex);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$border-color-analog: #ccc;
$width-blocks: 200px;
.flex-table {
  width: 100%;
  margin: 0 0 80px 0;
  .v-flex-wrapper {
    margin: 40px 0 0 0;
    display: inline-block;
    border-bottom: 1px solid $border-color-analog;
    border-right: 1px solid $border-color-analog;
    .v-flex-row {
      display: flex;
      position: relative;
      & > div {
        width: 400px;
      }
      div {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: solid 1px $border-color-analog;
        border-top: solid 1px $border-color-analog;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        & .sub-col-wrp {
          border: none;
          display: flex;
          align-items: center;
        justify-content: center;
          div {
            border-top: none;
            border-left: none;
            border-right: solid 1px $border-color-analog;
            &:last-child {
              border: none;
            }
          }
        }
      }
      & > div {
        width: $width-blocks;
      }
      .add-col{
        position: absolute;
        top:-40px;
        right: -160px;
        width: 150px;
      }
      .remove-col {
        position: absolute;
        top: -40px;
      }
      .add-row {
        position: absolute;
        bottom: -40px;
        left: 0;
      }
      .remove-row{
        position: absolute;
        top:10px;
        right: -160px;
        width: 150px;
      }
    }
  }
}
</style>
