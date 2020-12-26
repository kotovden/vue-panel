<template>
    <div class="list">
      <div class="wrapper">
        <a-button type="primary" class="add-module"  @click="() => $emit('createListItem')">
            Добавить
        </a-button>
        <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="data"
          >
        <a-list-item
          @click="(e) => {$emit('clickItem', item, index)}"
            slot="renderItem" slot-scope="item, index">
          <a-checkbox slot="actions" v-if="needCheckbox" :checked="item.isEditable"
            @change="(e) => {
              e.stopPropagation();
              $emit('handleChangeCheckbox', e.target.checked, item, index);
            }">
          </a-checkbox>
          <a v-if="!item.isEdit"
            @click="(e) => {e.stopPropagation(); $emit('handleEdit', e, item, index)}"
            slot="actions"><a-icon type="edit" /></a>
          <a v-if="item.isEdit"
            @click="(e) => {e.stopPropagation(); $emit('check', e, item, index)}"
            slot="actions"><a-icon type="check" /></a>
          <a-popconfirm
                  slot="actions"
                  title="Вы уверены?"
          @confirm="(e) => {e.stopPropagation(); $emit('handleDelete', e, item.ID)}"
          >
              <a href="javascript:;" ><a-icon type="delete" /></a>
          </a-popconfirm>
          <a v-if="needUpDownArrows" class="arrow"
            @click="(e) => {e.stopPropagation();$emit('up', e, item, index)}">
            <a-icon type="arrow-up" />
          </a>
          <a v-if="needUpDownArrows" class="arrow"
            @click="(e) => {e.stopPropagation(); $emit('down', e, item, index)}">
            <a-icon type="arrow-down" />
          </a>
          <a-input
              class="title"
              @pressEnter="(e) => $emit('check', e, item, index)"
              @focus="(e) => {e.stopPropagation()}"
              @click="(e) => {e.stopPropagation()}"
              v-if="item.isEdit"
              @change="(e) => $emit('handleChange', e, item, index)" v-model="item.name" />
          <a-list-item-meta>
            <a v-if="!item.isEdit" class="title" slot="title">
              {{ item.name }}
            </a>
          </a-list-item-meta>
        </a-list-item>
        </a-list>
      </div>
    </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array,
    needUpDownArrows: Boolean,
    needCheckbox: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  width: 100%;
  text-align: left;
  .wrapper {
    width: 700px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding: 20px 24px 30px;
    margin: 40px auto 16px auto;
    transition: all .2s;
  }
  .title {
    margin-left: 10px;
  }
  .arrow {
    margin-left: 5px;
  }
  .add-module {
    position: absolute;
    top: -40px;
    right: 0;
  }
}
</style>
