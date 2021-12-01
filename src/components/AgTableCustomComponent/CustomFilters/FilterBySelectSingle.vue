<template>
  <div style="display: inline-block; width: 100%">
    <div style="padding: 10px; background-color: #d3d3d3; text-align: center">
      Filter chọn một
    </div>
    <!-- single select -->
    <div v-if="!multiple" class="select-list-wr">
      <div v-for="(item, idx) in items" :key="idx" class="each-filter-option">
        <input
          v-model="ftValueSingle"
          type="radio"
          :id="`item-numb4-${idx}`"
          name="vehicle4"
          :value="item.id"
        />
        <label :for="`item-numb4-${idx}`"> {{ item[itemText] || item }}</label>
      </div>
    </div>
    <div class="clear-button">
      <div @click="clearSingle" class="text">Clear</div>
    </div>
  </div>
</template>

<script>
// filterWithSideBarSingle_status
import { mapState } from "vuex"
export default {
  props: {},
  data() {
    return {
      year: "All",
      ftValueSingle: "",
      items: [
        { id: "1", name: "Nháp" },
        { id: "2", name: "Đã gửi" },
      ],
      itemValue: "id",
      itemText: "name",
      multiple: false,
      albleToReact: true,
    }
  },
  watch: {
    ftValueSingle: {
      deep: true,
      handler() {
        if (this.albleToReact) {
          this.updateFilterSingle()
        }
      },
    },
    customFilters: {
      deep: true,
      handler() {
        if (this.customFilters && this.customFilters.status_single) {
          this.handlerSyncStoredFilter(this.customFilters.status_single)
        }
      },
    },
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
      currentFilter: (state) => state.agFilter.currentFilter,
    }),
  },
  mounted() {
    if (this.customFilters && this.customFilters.status_single) {
      this.handlerSyncStoredFilter(this.customFilters.status_single)
    }
  },
  methods: {
    updateFilterSingle() {
      this.params.filterChangedCallback({
        status_single: {
          filter: this.ftValueSingle,
          filterType: "single-choices",
          type: "select",
        },
      })
    },
    clearSingle() {
      this.ftValueSingle = ""
    },
    handlerSyncStoredFilter(_filterObj) {
      if (_filterObj.filterType === "multiple-choices") {
        this.albleToReact = false
        this.ftValue = _filterObj.filter ? _filterObj.filter.split(",") : []
      } else {
        this.albleToReact = false
        this.ftValueSingle = _filterObj.filter ? _filterObj.filter : ""
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
.clear-button {
  display: flex;
  justify-content: flex-end;
  margin: 4px 12px 4px 0px;
  .text {
    color: var(--ag-alpine-active-color, #2196f3);
    font-size: 13.3333px;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px solid #2196f3;
    padding: 6px 12px;
    border-radius: 3px;
    font-weight: 600;
    line-height: 1.5;
    cursor: pointer;
    width: fit-content;
  }
}
</style>
