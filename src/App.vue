<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/column-filters">ColumnFilters</router-link> |
      <router-link to="/column-filters-supress"
        >ColumnFiltersWithSupress</router-link
      >
      |
      <router-link to="/column-filters-sidebar"
        >ColumnFiltersWithSidebar</router-link
      >
    </div>
    <router-view />
    <div class="btn-reset-token" @click="resetToken">Reset Token</div>
  </div>
</template>
<script>
export default {
  methods: {
    resetToken() {
      this.$store.dispatch("resetToken")
    },
  },
}
</script>
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn-reset-token {
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: forestgreen;
  color: #fff;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
}
</style>
