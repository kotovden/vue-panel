<template>
  <div class="report">
    <a-table :pagination="false" :columns="columns" :data-source="data">
    </a-table>
  </div>
</template>

<script>
import api from '../service/api';

export default {
  name: 'Report',
  data() {
    return {
      columns: [],
      data: [],
    };
  },
  mounted() {
    api.get('/report?limit=all').then((res) => {
      if (res && res.data) {
        const result = { ...res.data.result };
        const columns = [{
          title: 'Название блока / тип исполнения',
          dataIndex: 'name',
          key: 'name',
        }];
        result.headers.forEach((name, index) => {
          columns.push({
            title: name,
            dataIndex: index + 1,
            key: index + 1,
          });
        });
        this.columns = columns;
        const data = result.rows.map((item, index) => {
          const currentItem = {
            key: index,
            name: `${item.composition.name} / ${item.composition.desc}`,
          };
          item.values.forEach((value, indexValue) => {
            currentItem[indexValue + 1] = value;
          });
          return currentItem;
        });
        this.data = data;
      }
    });
  },
};
</script>

<style scoped lang="scss">
.report {
  text-align: left;
}

</style>
