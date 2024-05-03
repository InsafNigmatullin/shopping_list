<template>
  <div>
    <b-button id="show-btn" @click.stop="showModal">{{ buttonTitle }}</b-button>

    <b-modal v-model="modalShow" :title="buttonTitle" hide-footer>
      <div class="d-flex flex-column gap-2 text-center">
        <b-form-input v-model="product" placeholder="Продукт"></b-form-input>
        <b-form-input v-model="value" placeholder="Количество"></b-form-input>
        <b-form-select v-model="unit" :options="units"></b-form-select>
      </div>
      <div class="d-flex justify-content-end mt-4">
        <b-button variant="outline-success" @click="handleClick">{{ buttonTitle }}</b-button>
        <b-button block class="ms-2" variant="outline-danger" @click="hideModal">Закрыть</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: null
    },
    listId: {
      default: null
    },
  },
  data: (vm) => {
    return {
      newItem: vm.item?.items || '',
      modalShow: false,
      product: "",
      value: "",
      unit: "",
      units: [
        {text: 'шт'},
        {text: 'кг'},
        {text: 'бан'},
      ]
    }
  },
  computed: {
    editMode() {
      return !!this.item
    },
    buttonTitle() {
      return this.editMode ? 'Редактировать' : 'Добавить'
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
        this.editItem()
      } else {
        this.addItem()
      }

      this.hideModal()
    },
    addItem() {
      this.$emit("add", {product: this.product, value: this.value, unit: this.unit})
      this.modalShow = false
      this.product = ""
      this.value = ""
      this.unit = ""
    },
    editItem() {
      this.$store.commit('editItem', {
        ...this.item,
        product: this.product,
        value: this.value,
        unit: this.unit,
        listId: this.listId
      })
    }
  },
  mounted() {
    if (this.item) {
      this.product = this.item.product
      this.value = this.item.value
      this.unit = this.item.unit
    }
  }
}

</script>