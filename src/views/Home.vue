<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ToastUI />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ToastUI from "@/components/ToastUI.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,ToastUI
  },
};
</script>
