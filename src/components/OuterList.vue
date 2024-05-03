<template>
  <AddListDialog class="m-4" @click="openAddListDialog"/>
  <b-list-group class="m-4">
    <b-list-group-item
        v-for="list in allLists"
        :class="{'bg-primary': list.id == routeId}"
        class="d-flex justify-content-between align-items-center"
        @click="openList(list)"
    >
      {{ list.name }}
      <div class="d-flex">
        <AddListDialog :list="list"/>
        <b-button class="ms-2" variant="danger" @click.stop="removeList(list.id)">Удалить</b-button>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>

import AddListDialog from "@/components/AddListDialog";
import {mapGetters} from "vuex";
import router from "@/router";

export default {
  name: "OuterList",
  components: {AddListDialog},
  data: () => ({
    list: null,
    addListDialog: {
      open: false,
      list: []
    },
  }),
  computed: {
    ...mapGetters(['allLists']),
    routeId() {
      return this.$route.params.id
    },
  },
  methods: {
    openAddListDialog(list) {
      this.addListDialog.open = true
      this.addListDialog.list = list
    },

    removeList(id) {
      this.$store.commit('removeList', id);

    },
    openList(list) {
      router.push({name: 'shoppingList', params: {id: list.id}})
    },
  }
}
</script>