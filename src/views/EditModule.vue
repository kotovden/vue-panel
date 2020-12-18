<template>
  <div class="module">
    <h1>{{module && module.name}}</h1>
    <p>Модуль - блок таблица на форме.</p>
    <template>
      <a-checkbox @change="(e) => onChangeCheckbox({allowNewLine: e.target.checked})">
        Добавление новых строк
      </a-checkbox>
      <br>
      <a-checkbox @change="(e) => onChangeCheckbox({showComposition: e.target.checked})">
        Показывать состав модуля
      </a-checkbox>
      <br>
      <list :data="fields"
        @check="check"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @createListItem="createField" />
    </template>
  </div>
</template>

<script>
import api from '@/service/api';
import List from '../components/List.vue';

export default {
  components: { List },
  name: 'EditModule',
  data() {
    return {
      currentModule: {

      },
      fields: [],
    };
  },
  computed: {
    module() {
      if (this && this.$attrs && this.$attrs.modules) {
        return this.$attrs.modules.find((module) => +module.ID === +this.$route.params.id);
      }
      return {};
    },
  },
  mounted() {
    this.loadFields(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadFields(to.params.id);
    next();
  },
  methods: {
    loadFields(moduleId) {
      api.get(`/module/${moduleId}/fields`).then((res) => {
        if (res && res.data) {
          this.fields = res.data.result;
        }
      });
    },
    putField(ID, currentField) {
      return api.put(`/module/${this.$route.params.id}/fields?id=${ID}`, currentField).then((res) => {
        if (res && res.data) {
          this.loadFields(this.$route.params.id);
        }
      });
    },
    check(event, item, index) {
      const fields = [...this.fields];
      this.putField(item.ID, this.fields[index]).then(() => {
        fields[index].isEdit = false;
        this.fields = fields;
      });
    },
    handleEdit(event, item, index) {
      const fields = [...this.fields];
      fields[index].isEdit = true;
      this.fields = fields;
    },
    handleDelete(event, ID) {
      api.delete(`/module/${this.$route.params.id}/fields?id=${ID}`).then((res) => {
        if (res && res.data && res.data.result === 'OK') {
          this.loadFields(this.$route.params.id);
        }
      }).catch((err) => {
        console.log('deleteTemplateErr', err);
      });
    },
    createField() {
      const newField = {
        name: 'Новое свойство',
        isEditable: false,
      };
      api.post(`module/${this.$route.params.id}/fields`, newField).then((res) => {
        if (res && res.data) {
          this.loadFields(this.$route.params.id);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    onChangeCheckbox(object) {
      this.currentModule = { ...this.module, ...object };
      this.putModule(this.currentModule);
    },
    putModule(currentModule) {
      return api.put(`/modules?id=${this.$route.params.id}`, currentModule).then((res) => {
        if (res && res.data) {
          this.currentModule = { ...res.data.result };
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.module {
  text-align: left;
}

</style>
