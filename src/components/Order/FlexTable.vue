<template>
    <div class="flex-table">
       <h3>{{title}}</h3>
       <div class="v-flex-wrapper">
        <div class="v-flex-row" :key="rowIndex" v-for="(row, rowIndex) in data">
          <a-button v-if="colsControls && rowIndex === 0"
            class="add-col" type="primary" @click="() => $emit('add-col', type)">
              Добавить столбец
          </a-button>
          <a-button v-if="rowsControls && rowIndex !== 0"
            class="remove-row" type="danger" @click="() => $emit('remove-row', rowIndex, type)">
              Удалить строку
          </a-button>
          <div
          :key="colIndex" v-for="(col, colIndex) in row">
          <a-button v-if="colsControls && rowIndex === 0 && colIndex !== 0"
            class="remove-col" type="danger" @click="() => $emit('remove-col', colIndex, type)">
              Удалить столбец
          </a-button>
          <a-button v-if="rowsControls && rowIndex === data.length - 1 && colIndex === 0"
            class="add-row" type="primary" @click="() => $emit('add-row', type)">
              Добавить строку
          </a-button>
          <span v-if="typeof col === 'string'">
            {{col}}
          </span>
          <div class="sub-col-wrp" v-if="typeof col !== 'string'">
            <div :key="subColIndex" v-for="(subCol, subColIndex) in col">
              {{subCol}}
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
    handleChange(value, key, index, col) {
      console.log(value, key, col, index, this.data);
      const currentData = [...this.data];
      currentData[index][col] = value;
      this.$emit('changeModulesForm', currentData);
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
