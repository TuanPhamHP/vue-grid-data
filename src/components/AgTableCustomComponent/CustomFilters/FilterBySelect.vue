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
          :value="item.id"
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
      items: [
        { id: "1", name: "Nháp" },
        { id: "2", name: "Đã gửi" },
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
    customFilters: {
      deep: true,
      handler() {
        if (this.customFilters && this.customFilters.status) {
          this.handlerSyncStoredFilter(
            this.customFilters.status,
          )
        }
      },
    },
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
    }),
  },
  mounted() {
    if (this.customFilters && this.customFilters.status) {
      this.handlerSyncStoredFilter(this.customFilters.status)
    }
  },
  methods: {
    updateFilterMulti() {
      if (this.ftValue && this.ftValue.length) {
        this.params.filterChangedCallback({
          status: {
            filter: this.ftValue,
            filterType: "multiple-choices",
            type: "select",
          },
        })
      } else {
        this.params.filterChangedCallback({
          status: {
            filter: null,
            filterType: "multiple-choices",
            type: "select",
          },
        })
      }
    },
    handlerSyncStoredFilter(_filterObj) {
      if (_filterObj.filterType === "multiple-choices") {
        this.albleToReact = false
        this.ftValue = _filterObj.filter ? _filterObj.filter.split(",") : []
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
