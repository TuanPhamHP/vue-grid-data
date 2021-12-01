<template>
  <div style="height: calc(100vh - 200px)">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-alpine"
      id="myGridSidebar"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :rowData="rowData"
      :frameworkComponents="frameworkComponents"
      :pagination="true"
      :paginationPageSize="paginationPageSize"
      :rowModelType="'infinite'"
      :loadingOverlayComponentFramework="loadingOverlayComponentFramework"
      :loadingOverlayComponentParams="loadingOverlayComponentParams"
      :noRowsOverlayComponentFramework="noRowsOverlayComponentFramework"
      :noRowsOverlayComponentParams="noRowsOverlayComponentParams"
      :sideBar="sideBar"
      :suppressPaginationPanel="true"
      :rowSelection="'single'"
      @cell-clicked="cellClicked"
      @grid-ready="onGridReady"
    ></ag-grid-vue>

    <div class="pagination">
      <Pagination
        :handle-change-page="handleChangePage"
        :handle-change-per-pages="handleChangePerPage"
        :pagination="currentPagination"
        :show-per-page="true"
      ></Pagination>
    </div>
  </div>
</template>

<script>
// import { AgGridVue } from "ag-grid-vue"
import "ag-grid-enterprise"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import TextAndFilter from "@/components/AgTableCustomComponent/Header/TextAndFilter.vue"
import api from "@/services"
import { mapState } from "vuex"
import agFilters from "@/mixins/filterMixins.js"
import CustomLoadingOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customLoadingOverlayVue"
import CustomNoRowsOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customNoRowsOverlayVue"
import Pagination from "@/components/AgTableCustomComponent/Footer/Pagination.vue"
import FilterBySelect from "@/components/AgTableCustomComponent/CustomFilters/FilterBySelect.vue"
//
// var listStatus = [
//   { id: 1, name: "Nháp" },
//   { id: 2, name: "Đã gửi" },
//   { id: 3, name: "Đã Duyệt" },
// ]

window.countryKeyCreator = function countryKeyCreator(params) {
  var countryObject = params.value
  return countryObject.name
}
window.countryValueFormatter = function countryValueFormatter(params) {
  return params.value.name
}
//
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    agColumnHeader: TextAndFilter,
    Pagination,
    // eslint-disable-next-line vue/no-unused-components
    customLoadingOverlay: CustomLoadingOverlay,
    // eslint-disable-next-line vue/no-unused-components
    customNoRowsOverlay: CustomNoRowsOverlay,
    // eslint-disable-next-line vue/no-unused-components
    filterBySelect: FilterBySelect,
  },
  mixins: [agFilters],
  data() {
    // eslint-disable-next-line no-unused-vars
    var filterParams = {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue
        if (dateAsString == null) return -1
        var dateParts = dateAsString.split("/")
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1
        }
      },
      browserDatePicker: true,
    }
    return {
      paginationPageSize: 15,
      currentPagination: {
        current_page: 1,
        per_page: 15,
        total_pages: 1,
      },
      columnDefs: [
        {
          field: "id",
          maxWidth: 120,
          filter: "agNumberColumnFilter",
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
            // custom filter. DOC : https://www.ag-grid.com/vue-data-grid/filter-text/
            debounceMs: 1000,
            buttons: ["reset", "clear"],
          },
        },
        {
          field: "status.name",
          filterFramework: "filterBySelect",
          // filter: "agSetColumnFilter",

          icons: "fa-bars",
          maxWidth: 180,
          headerName: "Trạng thái",
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
            // valueFormatter: (params) => {
            //   return params.value
            // },
            // values: function (params) {
            //   params.success(listStatus.map((o) => o.name))
            //   // setTimeout(function () {
            //   //   params.success([...listStatus])
            //   // }, 1000)
            // },
          },
        },
        {
          field: "name",
          filter: "agTextColumnFilter",
          icons: "fa-bars",
          // maxWidth: "auto",
          headerName: "Tiêu đề",

          filterParams: {
            // filterChangedCallback: this.customfilterValueGetter,
            filterChangedCallback: this.filterChangedCallback,
            // custom filter. DOC : https://www.ag-grid.com/vue-data-grid/filter-text/
            debounceMs: 1000,
            buttons: ["reset", "clear"],
            filterChanged: (e) => {
              console.log(e)
            },
            // textCustomComparator: (filter, value, filterText) => {
            //   console.log(filter + " | ", value + " | ", filterText + " | ")
            //   return false
            // },
          },
        },
        {
          field: "category.name",
          filter: "agTextColumnFilter",
          icons: "fa-bars",
          // maxWidth: "auto",
          headerName: "Danh mục phê duyệt",
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
          },
        },
        {
          field: "created_at",
          filter: "agDateColumnFilter",
          filterParams: {
            ...filterParams,
            filterChangedCallback: this.filterChangedCallback,
          },
          icons: "fa-bars",
          maxWidth: 200,
          headerName: "Ngày tạo",
        },
      ],
      gridApi: null,
      columnApi: null,
      gridFilterApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
      },
      rowData: null,
      frameworkComponents: null,
      loadingOverlayComponentFramework: "customLoadingOverlay",
      loadingOverlayComponentParams: null,
      noRowsOverlayComponentFramework: "customNoRowsOverlay",
      noRowsOverlayComponentParams: null,
      sideBar: null,
      customSpecialList: ["status"],
      lockDownFilterApi: false, // use to lock api callback when debug
    }
  },
  created() {
    this.sideBar = ["filters", "columns"]
    this.frameworkComponents = { agColumnHeader: "agColumnHeader" }
    this.loadingOverlayComponentParams = {
      loadingMessage: "Đang tải ...",
    }
    this.noRowsOverlayComponentParams = {
      noRowsMessageFunc: () => "Không có dữ liệu",
    }
  },
  mounted() {
    this.$store.commit("agFilter/setCurrentTable", "ColumnFiltersWithSidebar")
    // const pagination = {
    //    current_page: queryParse.page || 1,
    //     per_page:queryParse.size || 15,
    // }
  },
  beforeDestroy() {
    this.$store.commit("agFilter/setCustomFilter", {})
    this.$store.commit("agFilter/setCurrentTable", "")
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
    }),
  },
  methods: {
    // onRowSelected(event) {
    //   window.alert(
    //     "row " + event.node.data.id + " selected = " + event.node.isSelected(),
    //   )
    // },
    cellClicked(event) {
      if (event.data.id === event.value) {
        window.alert(`Cột ID: {event.value}`)
      }
    },
    showLoadingOverlay() {
      this.gridApi.showLoadingOverlay()
    },
    hideLoadingOverlay() {
      this.gridApi.hideOverlay()
    },
    expandFilterGroup(_groups = []) {
      this.gridApi.getToolPanelInstance("filters").expandFilters(_groups)
    },
    customfilterValueGetter(params, m, a) {
      console.log(params, m, a)
      // if (params.data) {
      //   return this.objCategoryEditor[params.data.IsSubcategoryText]
      // }
    },
    async filterChangedCallback(modelObj = null) {
      this.showLoadingOverlay()
      let model = this.gridApi.getFilterModel()
      if (modelObj) {
        model = {
          ...model,
          ...this.customFilters,
          ...modelObj
        }
      }
      // check status custom phase
      if (model.status && !model.status.filter) {
        delete model.status
      }
      if (model.status_single && !model.status_single.filter) {
        delete model.status_single
      }
      const filterApplied = this.parseFilterToParams(model)
      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: this.currentPagination.current_page,
      }
      // console.log(filterApplied)
      // this.$router.replace({
      //   path: "/column-filters-sidebar",
      //   query: {
      //     ...filterApplied,
      //     ...paginationQuery,
      //   },
      // })
      this.$router
        .replace(`/column-filters-sidebar?${filterApplied}`)
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      const queries = this.$route.query
      const queriesComputed = { ...queries }
      this.customSpecialList.forEach((o) => {
        const tainted = Object.hasOwnProperty.call(
          queries,
          `filterModel[${o}][filter]`,
        )
        if (tainted) {
          if (
            queriesComputed[`filterModel[${o}][filterType]`] ===
            "multiple-choices"
          ) {
            const arrFromFilter = queriesComputed[`filterModel[${o}][filter]`]
              ? queriesComputed[`filterModel[${o}][filter]`].split(",")
              : []
            arrFromFilter.forEach((j, idx) => {
              queriesComputed[`filterModel[${o}][filter][${idx}]`] = j
            })
          }
        }
      })
      if (!this.lockDownFilterApi) {
        const _this = this
        const updateData = (data, pagination) => {
          const _pagination = pagination
          this.currentPagination = { ..._pagination }
          let dataSource = {
            getRows: function (params) {
              setTimeout(function () {
                params.successCallback(data, pagination.total)
                _this.hideLoadingOverlay()
              }, 100)
            },
          }
          this.gridApi.setDatasource(dataSource)
          this.syncFilter()
        }
        const query = {
          include: "fields,approvers,followers,creator,category",
          type: "i_approve",
          ...this.handleRemoveUnusedQuery(queriesComputed),
          ...paginationQuery,
        }
        const res = await api.appData.getApproval(query)
        if (!res) {
          return null
        }
        try {
          if (res.status > 199 && res.status < 399) {
            updateData(res.data.data.approvals, res.data.data.meta.pagination)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async paginationChagedCallback() {
      this.showLoadingOverlay()
      // const prevQuery = this.$route.query
      const queries = this.$route.query
      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: this.currentPagination.current_page,
      }
      this.$router
        .replace({
          path: "/column-filters-sidebar",
          query: {
            ...queries,
            ...paginationQuery,
          },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      if (!this.lockDownFilterApi) {
        const _this = this
        const updateData = (data, pagination) => {
          const _pagination = pagination
          this.currentPagination = { ..._pagination }
          let dataSource = {
            getRows: function (params) {
              setTimeout(function () {
                params.successCallback(data, pagination.total)
                _this.hideLoadingOverlay()
              }, 100)
            },
          }
          this.gridApi.setDatasource(dataSource)
          this.syncFilter()
        }
        const query = {
          include: "fields,approvers,followers,creator,category",
          type: "i_approve",
          ...queries,
          ...paginationQuery,
        }
        const res = await api.appData.getApproval(query)
        if (!res) {
          return null
        }
        try {
          if (res.status > 199 && res.status < 399) {
            updateData(res.data.data.approvals, res.data.data.meta.pagination)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getListApproval(query = {}) {
      const res = await api.appData.getApproval(query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          return res.data.data.approvals
        }
      } catch (error) {
        console.log(error)
      }
    },
    syncFilter() {
      const queries = this.$route.query
      const queryParse = { ...this.parseQueryToFilter(queries) }
      const listQueryKeys = Object.keys(queryParse)
      for (const key in queryParse) {
        if (Object.hasOwnProperty.call(queryParse, key)) {
          if (
            queryParse[key].filterType &&
            queryParse[key].filterType === "set"
          ) {
            queryParse[key].values = queryParse[key].values.split(",")
          }
        }
      }
      const customFilters = {}
      if (queryParse.status_single || queryParse.status) {
        customFilters.status_single = {
          ...queryParse.status_single,
        }
        customFilters.status = {
          ...queryParse.status,
        }
      }
      if (Object.keys(customFilters).length) {
        this.$store.commit("agFilter/setCustomFilter", customFilters)
      }
      this.gridApi.setFilterModel(queryParse)
      this.expandFilterGroup(listQueryKeys)
    },
    async onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi

      this.showLoadingOverlay()
      // setting filter from route query
      // this.syncFilter()
      // end setting filter
      const _this = this
      const updateData = (data, pagination) => {
        const _pagination = pagination
        this.currentPagination = { ..._pagination }
        let dataSource = {
          getRows: function (params) {
            setTimeout(function () {
              _this.hideLoadingOverlay()
              params.successCallback(data, pagination.total)
            }, 100)
          },
        }
        params.api.setDatasource(dataSource)
        this.syncFilter()
      }

      const queries = this.$route.query
      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: this.currentPagination.current_page,
      }
      if (queries.size) {
        paginationQuery.size = queries.size
        this.paginationPageSize = queries.size
      }
      if (queries.page) {
        paginationQuery.page = queries.page
      }

      this.currentPagination = { ...this.currentPagination, ...paginationQuery }
      const query = {
        include: "fields,approvers,followers,creator,category",
        type: "i_approve",
        ...queries,
        ...paginationQuery,
      }
      const queriesComputed = { ...query }
      this.customSpecialList.forEach((o) => {
        const tainted = Object.hasOwnProperty.call(
          queries,
          `filterModel[${o}][filter]`,
        )
        if (tainted) {
          if (
            queriesComputed[`filterModel[${o}][filterType]`] ===
            "multiple-choices"
          ) {
            const arrFromFilter = queriesComputed[`filterModel[${o}][filter]`]
              ? queriesComputed[`filterModel[${o}][filter]`].split(",")
              : []
            arrFromFilter.forEach((j, idx) => {
              queriesComputed[`filterModel[${o}][filter][${idx}]`] = j
            })
          }
        }
      })
      this.$router
        .replace({
          path: "/column-filters-sidebar",
          query: {
            ...queries,
            ...paginationQuery,
          },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      const res = await api.appData.getApproval(
        this.handleRemoveUnusedQuery(queriesComputed),
      )
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          updateData(res.data.data.approvals, res.data.data.meta.pagination)
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleChangePage(_val) {
      this.currentPagination = {
        ...this.currentPagination,
        current_page: _val,
        page: _val,
      }

      this.paginationChagedCallback()
    },
    handleChangePerPage(_val) {
      this.paginationPageSize = _val
      this.currentPagination = {
        ...this.currentPagination,
        per_page: _val,
        current_page: 1,
        page: 1,
      }

      this.paginationChagedCallback()
    },
    handleRemoveUnusedQuery(_model) {
      if (!_model) {
        return {}
      }
      const model = { ..._model }
      const keyArray = Object.keys(_model)
      if (keyArray.includes("filterModel[status][filter]")) {
        delete model["filterModel[status][filter]"]
      }
      if (keyArray.includes("filterModel[status_single][filter]")) {
        delete model["filterModel[status_single][filter]"]
      }
      return model
    },
  },
}
</script>

<style></style>
