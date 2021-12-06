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
      console.log("edit clicked", val.data)
    },
    removeClicked(val) {
      console.log("remove clicked", val.data)
    },
  },
}
</script>

<style></style>
