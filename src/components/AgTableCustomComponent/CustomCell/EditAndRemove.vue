<template>
  <div>
    <button @click="editClicked(params)">edit{{ params.id }}</button>
    <button @click="removeClicked(params)">remove{{ params.id }}</button>
  </div>
</template>

<script>
export default {
  methods: {
    editClicked(val) {
      val.editClicked(val.data)
      console.log("edit clicked", val)
    },
    removeClicked(val) {
      val.removeClicked(val.data)
      console.log("remove clicked", val)
    },
  },
}
</script>

<style></style>
