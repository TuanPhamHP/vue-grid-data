<template>
  <div class="test-here">
    <input type="text" v-model="msgToast" />
    <select name="cars" id="cars" v-model="type">
      <option value="toast/getInfo">Info</option>
      <option value="toast/getSuccess">Success</option>
      <option value="toast/getWarning">Warning</option>
      <option value="toast/getError">Error</option>
    </select>
    <button :disabled="!type" @click="append">toast</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msgToast: "",
      type: ""
    }
  },
  props: {
    msg: String,
  },
  mounted() {},
  methods: {
    append() {
      this.$store.commit(this.type, this.msgToast, 2000)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
