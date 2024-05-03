<template>
  <b-row>
    <b-col cols="6" md="4">
      <OuterList></OuterList>
    </b-col>
    <b-col cols="12" md="8">
      <InnerList></InnerList>
    </b-col>
  </b-row>
</template>

<script>
import OuterList from "@/components/OuterList";
import AddListDialog from "@/components/AddListDialog";
import InnerList from "@/components/InnerList";

export default {
  components: {
    OuterList,
    AddListDialog,
    InnerList
  }
}
</script>

