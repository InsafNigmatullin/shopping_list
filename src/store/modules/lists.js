export default {
  state: {
    lists: [
      {
        id: 1,
        name: "Химия",
        items: [
          { id: 11, product: "порошок", value: 1, unit: "шт", bought: true },
          { id: 12, product: "мыло", value: 1, unit: "шт", bought: false },
          { id: 13, product: "шампунь", value: 1, unit: "шт", bought: false },
          {
            id: 14,
            product: "гель для душа",
            value: 1,
            unit: "шт",
            bought: false,
          },
        ],
      },
      {
        id: 2,
        name: "Продукты",
        items: [
          { id: 21, product: "хлеб", value: 1, unit: "шт", bought: false },
          { id: 22, product: "помидоры", value: 1, unit: "кг", bought: false },
          { id: 23, product: "огурцы", value: 1, unit: "кг", bought: false },
          { id: 24, product: "яблоки", value: 1, unit: "кг", bought: false },
        ],
      },
      {
        id: 3,
        name: "Машина",
        items: [
          { id: 32, product: "аптечка", value: 1, unit: "шт", bought: false },
          {
            id: 33,
            product: "огнетушитель",
            value: 1,
            unit: "шт",
            bought: false,
          },
          {
            id: 34,
            product: "освежитель воздуха",
            value: 1,
            unit: "шт",
            bought: false,
          },
          { id: 35, product: "масло", value: 1, unit: "шт", bought: false },
        ],
      },
    ],
  },
  mutations: {
    removeList(state, id) {
      const index = state.lists.findIndex((list) => list.id === id);
      state.lists.splice(index, 1);
    },
    addList(state, name) {
      const newLst = { id: Date.now(), name: name, items: [] };
      state.lists.push(newLst);
    },
    editList(state, payload) {
      state.lists.find((list) => list.id === payload.listId).name =
        payload.newListName;
    },
    addItem(state, payload) {
      const newItem = {
        id: Date.now(),
        product: payload.newItem.product,
        value: payload.newItem.value,
        unit: payload.newItem.unit,
        bought: false,
      };

      state.lists
        .find((list) => list.id === Number(payload.listId))
        .items.push(newItem);
    },
    removeItem(state, payload) {
      const lst = state.lists.find(
        (list) => list.id === Number(payload.listId)
      );
      const itemIndex = lst.items.findIndex(
        (item) => item.id === payload.itemId
      );
      lst.items.splice(itemIndex, 1);
    },
    editItem(state, editedItem) {
      const lst = state.lists.find(
        (list) => list.id === Number(editedItem.listId)
      );

      if (lst) {
        const itm = lst.items.find((item) => item.id === editedItem.id);

        if (itm) {
          itm.product = editedItem.product;
          itm.value = editedItem.value;
          itm.unit = editedItem.unit;
        }
      }
    },
  },
  getters: {
    allLists(state) {
      return state.lists;
    },
    listItems: (state) => (id) => {
      return state.lists
        ? state.lists.find((list) => list.id === Number(id))?.items
        : [];
    },
  },
};
