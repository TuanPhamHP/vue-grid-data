<template>
  <div class="wrapper-toast">
    <transition-group name="toast">
      <div
        class="toast"
        :class="toast.type"
        v-for="toast in toasts"
        :key="toast.uuid"
      >
        <h5>{{ toast.msg }}</h5>
        <button @click="deleteToast(toast)">
          <span class="material-icons">close</span>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    toasts() {
      return this.$store.state.toast.messages
    },
  },
  mounted() {
    console.log(this.$store.state.toast.messages)
  },
  methods: {
    deleteToast(toast) {
      this.$store.commit("remove", toast)
    },
  },
}
</script>

<style lang="scss">
.wrapper-toast {
  position: fixed;
  bottom: 16px;
  right: 16px;
  .toast {
    background-color: rgb(233, 233, 233);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: black;
    width: 300px;
    margin-bottom: 8px;
    h5 {
      margin: 0;
      font-weight: 400;
      flex: 1 1 auto;
      text-align: left;
    }
    button {
      border: 0;
      line-height: 0;
      background-color: transparent;
      padding: 0;
      .material-icon {
        font-size: 18px;
      }
    }
    &.info {
      background-color: #54bbd2;
    }
    &.warning {
      background-color: #e8b309;
    }
    &.success {
      background-color: #2fb246;
    }
    &.error {
      background-color: red;

    }
  }
  .toast {
    &-enter {
      transform: translateX(100%);
      opacity: 0;
    }
    &-enter-active {
      transition: transform 0.3s ease;
      opacity: 0.1 ease;
    }
    &-enter-to {
      transform: translateX(0%);
      opacity: 1;
    }

    &-leave {
      transform: translateX(0%);
      opacity: 1;
    }
    &-leave-active {
      transition: transform 0.3s ease;
      opacity: 0.1 ease;
    }
    &-leave-to {
      transform: translateX(100%);
      opacity: 1;
    }
  }
}
</style>
