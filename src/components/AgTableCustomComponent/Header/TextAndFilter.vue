<template>
  <div class="text-and-filter-header-wr">
    <div
      class="customHeaderLabel text-and-filter-header-label"
      :class="params.labelLocation || 'label-center'"
    >
      {{ params.displayName || params.field }}
      <div
        v-if="params.enableMenu"
        ref="menuButton"
        class="customHeaderMenuButton text-and-filter-header-custom-btn"
        @click="onMenuClicked($event)"
      >
        <i class="fa" :class="params.menuIcon || 'fa-bars'"></i>
      </div>
    </div>

    <div
      v-if="params.enableSorting"
      @click="onSortRequested('asc', $event)"
      :class="ascSort"
      class="customSortDownLabel"
    >
      <i class="fa fa-long-arrow-alt-down"></i>
    </div>
    <div
      v-if="params.enableSorting"
      @click="onSortRequested('desc', $event)"
      :class="descSort"
      class="customSortUpLabel"
    >
      <i class="fa fa-long-arrow-alt-up"></i>
    </div>
    <div
      v-if="params.enableSorting"
      @click="onSortRequested('', $event)"
      :class="noSort"
      class="customSortRemoveLabel"
    >
      <i class="fa fa-times"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ascSort: null,
      descSort: null,
      noSort: null,
    }
  },
  beforeMount() {},
  mounted() {
    this.params.column.addEventListener("sortChanged", this.onSortChanged)
    this.onSortChanged()
  },
  methods: {
    onMenuClicked() {
      this.params.showColumnMenu(this.$refs.menuButton)
    },

    onSortChanged() {
      this.ascSort = this.descSort = this.noSort = "inactive"
      if (this.params.column.isSortAscending()) {
        this.ascSort = "active"
      } else if (this.params.column.isSortDescending()) {
        this.descSort = "active"
      } else {
        this.noSort = "active"
      }
    },

    onSortRequested(order, event) {
      this.params.setSort(order, event.shiftKey)
      console.log(order)
    },
  },
}
</script>

<style>
.text-and-filter-header-wr {
  width: 100%;
}
.text-and-filter-header-label {
  display: flex;
  align-items: center;
}
.text-and-filter-header-custom-btn {
  padding-left: 16px;
  cursor: pointer;
}
.text-and-filter-header-label.label-center {
  text-align: center !important;
  justify-content: center;
  width: 100%;
}
</style>
