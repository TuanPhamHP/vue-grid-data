<template>
  <div style="display: inline-block; width: 100%">
    <div style="padding: 10px; background-color: #d3d3d3; text-align: center">
      Filter chọn nhiều
    </div>
    <!-- multi select -->
    <div v-if="multiple" class="select-list-wr">
      <div v-for="(item, idx) in items" :key="idx" class="each-filter-option">
        <input
          v-model="ftValue"
          type="checkbox"
          :id="`item-numb-${idx}`"
          name="vehicle1"
          :value="item[itemValue]"
        />
        <label :for="`item-numb-${idx}`"> {{ item[itemText] || item }}</label>
      </div>
    </div>
    <!-- single select -->
    <div v-if="!multiple" class="select-list-wr">
      <div v-for="(item, idx) in items" :key="idx" class="each-filter-option">
        <input
          v-model="ftValueSingle"
          type="radio"
          :id="`item-numb-${idx}`"
          name="vehicle1"
          :value="item[itemValue]"
        />
        <label :for="`item-numb-${idx}`"> {{ item[itemText] || item }}</label>
      </div>
    </div>
  </div>
</template>

<script>
// filterWithSideBar_status
import { mapState } from "vuex"
export default {
  props: {},
  data() {
    return {
      year: "All",
      ftValue: [],
      ftValueSingle: "",
      items: [
        { id: 1, name: "Nháp" },
        { id: 2, name: "Đã gửi" },
      ],
      itemValue: "id",
      itemText: "name",
      multiple: true,
      albleToReact: true,
    }
  },
  watch: {
    ftValue: {
      deep: true,
      handler() {
        if (this.albleToReact) {
          this.updateFilterMulti()
        }
      },
    },
    ftValueSingle: {
      deep: true,
      handler() {
        if (this.albleToReact) {
          this.updateFilterSingle()
        }
      },
    },
    defaultFilter: {
      deep: true,
      handler() {
        if (this.defaultFilter && this.defaultFilter.filterWithSideBar_status) {
          this.handlerSyncStoredFilter(
            this.defaultFilter.filterWithSideBar_status,
          )
        }
      },
    },
  },
  computed: {
    ...mapState({
      defaultFilter: (state) => state.agFilter.defaultFilter,
    }),
  },
  mounted() {
    if (this.defaultFilter && this.defaultFilter.filterWithSideBar_status) {
      this.handlerSyncStoredFilter(this.defaultFilter.filterWithSideBar_status)
    }
  },
  methods: {
    updateFilterMulti() {
      this.params.filterChangedCallback({
        status: {
          filter: this.ftValue,
          filterType: "multiple-choices",
          type: "select",
        },
      })
    },
    updateFilterSingle() {
      this.params.filterChangedCallback({
        status: {
          filter: this.ftValueSingle,
          filterType: "single-choices",
          type: "select",
        },
      })
    },
    handlerSyncStoredFilter(_filterObj) {
      console.log(_filterObj)
      if (_filterObj.filterType === "multiple-choices") {
        this.albleToReact = false
        this.ftValue = _filterObj.filter.split(",")
      }
      this.$nextTick(() => {
        this.albleToReact = true
      })
    },

    // this example isn't using getModel() and setModel(),
    // so safe to just leave these empty. don't do this in your code!!!
    getModel() {},

    setModel() {},
  },
}
</script>

<style lang="scss">
.select-list-wr {
  width: 100%;
  .each-filter-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 0;

    label {
      cursor: pointer;
      padding-left: 6px;
    }
  }
}
</style>
