<template>
  <div class="d-flex justify-content-between my-4">
    <b-button @click="sortedItems">Сортировать по имени</b-button>
    <b-nav-form class="mx-3">
      <b-form-input v-model="search" placeholder="Поиск"/>
    </b-nav-form>
  </div>

  <b-table v-if="filteredItems.length" :key="routeId" :fields="fields" :items="filteredItems" hover striped>
    <template #cell(actions)="row">
      <div class="d-flex">
        <AddNewItemDialog :item="row.item" :list-id="routeId"/>
        <b-button class="ms-2" size="sm" variant="outline-danger" @click.stop="removeItem(row.item.id)">Удалить
        </b-button>
      </div>
    </template>
  </b-table>
  <div v-else class="d-flex justify-content-center my-4 fs-4">Список покупок пустой!</div>

  <AddNewItemDialog @add="addItem"/>
</template>

<script>
import AddNewItemDialog from "@/components/AddNewItemDialog";

export default {
  components: {AddNewItemDialog},

  data() {
    return {
      fields: ['product', 'value', 'unit', 'actions'],
      search: "",
      searchQuery: null,
    }
  },
  computed: {
    routeId() {
      return this.$route.params.id
    },
    items() {
      return this.routeId ? this.$store.getters.listItems(this.routeId) : []
    },
    filteredItems() {
      return this.items?.filter((item) => item.product.toLowerCase().includes(this.search.toLowerCase())) ?? []
    },
  },
  methods: {
    sortedItems() {
      return this.items.sort((d1, d2) => (d1.product.toLowerCase() > d2.product.toLowerCase()) ? 1 : -1)
    },
    addItem(newItem) {
      this.$store.commit('addItem', {listId: this.routeId, newItem})
    },
    removeItem(itemId) {
      this.$store.commit('removeItem', {listId: this.routeId, itemId});
    },


  }
}
</script>