<template>
  <div>
    <b-button id="show-btn" @click.stop="showModal">{{ title }}</b-button>

    <b-modal v-model="modalShow" :title="title" hide-footer>
      <b-form-input v-model="newList"/>

      <div class="d-flex justify-content-end mt-4">
        <b-button variant="outline-success" @click="handleClick">{{ title }}</b-button>
        <b-button block class="ms-2" variant="outline-danger" @click="hideModal">Закрыть</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddListDialog",
  props: {
    list: {
      default: null
    },
  },
  data: (vm) => {
    return {
      newList: vm.list?.name || '',
      modalShow: false
    }
  },
  computed: {
    editMode() {
      return !!this.list
    },
    title() {
      return this.editMode ? 'Редактировать' : 'Создать список'
    }
  },
  methods: {
    showModal() {
      this.modalShow = true
    },
    hideModal() {
      this.modalShow = false
    },
    handleClick() {
      if (this.editMode) {
        this.editList()

      } else {
        this.addNewList()
      }
    },
    addNewList() {
      this.$store.commit('addList', this.newList)
      this.newList = ''
      this.hideModal()
    },
    editList() {
      const payload = {
        listId: this.list.id,
        newListName: this.newList,
      }
      this.$store.commit('editList', payload);
      this.hideModal()
    },

  }
}
</script>