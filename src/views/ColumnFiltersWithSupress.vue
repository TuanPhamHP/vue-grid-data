ASGL DEV env: FREELANCER-0008 Hao520520

<template>
  <div style="height: calc(100vh - 200px)">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-alpine"
      id="myGridSupp"
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
      @grid-ready="onGridReady"
      @pagination-changed="onPaginationChanged"
    ></ag-grid-vue>
  </div>
</template>

<script>
// import { AgGridVue } from "ag-grid-vue"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import TextAndFilter from "@/components/AgTableCustomComponent/Header/TextAndFilter.vue"
import api from "@/services"
import agFilters from "@/mixins/agFilters.js"
import CustomLoadingOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customLoadingOverlayVue"
import CustomNoRowsOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customNoRowsOverlayVue"

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    agColumnHeader: TextAndFilter,

    // eslint-disable-next-line vue/no-unused-components
    customLoadingOverlay: CustomLoadingOverlay,
    // eslint-disable-next-line vue/no-unused-components
    customNoRowsOverlay: CustomNoRowsOverlay,
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
      columnDefs: [
        {
          field: "id",
          maxWidth: 120,
          filter: "agNumberColumnFilter",
          filterParams: {
            // filterChangedCallback: this.customfilterValueGetter,
            filterChangedCallback: this.filterChangedCallback,
            // custom filter. DOC : https://www.ag-grid.com/vue-data-grid/filter-text/
            debounceMs: 1000,
            buttons: ["reset", "clear"],
            // textCustomComparator: (filter, value, filterText) => {
            //   console.log(filter + " | ", value + " | ", filterText + " | ")
            //   return false
            // },
          },
          suppressMenu: true,
          floatingFilter: true,
        },
        {
          field: "status.name",
          filter: "agTextColumnFilter",
          icons: "fa-bars",
          maxWidth: 180,
          headerName: "Trạng thái",
          suppressMenu: true,
          floatingFilter: true,
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
          suppressMenu: true,
          floatingFilter: true,
        },
        {
          field: "name",
          filter: "agTextColumnFilter",
          icons: "fa-bars",
          // maxWidth: "auto",
          headerName: "Danh mục phê duyệt",
          suppressMenu: true,
          floatingFilter: true,
        },
        {
          field: "created_at",
          filter: "agDateColumnFilter",
          filterParams: filterParams,
          icons: "fa-bars",
          maxWidth: 200,
          headerName: "Ngày tạo",
          suppressMenu: true,
          floatingFilter: true,
        },
        // { field: "country" },
        // { field: "year", maxWidth: 100 },

        // { field: "sport" },
        // { field: "gold", filter: "agNumberColumnFilter" },
        // { field: "silver", filter: "agNumberColumnFilter" },
        // { field: "bronze", filter: "agNumberColumnFilter" },
        // { field: "total", filter: false },
      ],
      gridApi: null,
      columnApi: null,
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
    }
  },
  created() {
    this.frameworkComponents = { agColumnHeader: "agColumnHeader" }
    this.loadingOverlayComponentParams = {
      loadingMessage: "One moment please...",
    }
    this.noRowsOverlayComponentParams = {
      noRowsMessageFunc: () => "Sorry - no rows! at: " + new Date(),
    }
  },
  methods: {
    showLoadingOverlay() {
      this.gridApi.showLoadingOverlay()
    },
    hideLoadingOverlay() {
      this.gridApi.hideOverlay()
    },
    onPaginationChanged($event) {
      if ($event && $event.newPage) {
        // this.showLoadingOverlay()
        console.log("new page triggered: ", $event)
        const currentPage = this.gridApi.paginationGetCurrentPage()
        const totalPage = this.gridApi.paginationGetTotalPages()
        console.log("currentPage index: ", currentPage)
        console.log("totalPage numb: ", totalPage)
      }
    },
    customfilterValueGetter(params, m, a) {
      console.log(params, m, a)
      // if (params.data) {
      //   return this.objCategoryEditor[params.data.IsSubcategoryText]
      // }
    },
    async filterChangedCallback() {
      this.showLoadingOverlay()
      const model = this.gridApi.getFilterModel()
      const filterApplied = this.parseFilterToParams(model)
      console.log(model, "model")
      console.log(filterApplied, "filterApplied")
      const uri = Object.entries(model)
        .map(
          ([key, val]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              JSON.stringify(val),
            )}`,
        )
        .join("&")
      console.log(uri, uri)
      this.$router.replace({
        path: "/column-filters-supress",
        query: filterApplied,
      })
      const _this = this
      const updateData = (data, pagination) => {
        // params.api.setRowData(data)
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
        keyword: filterApplied.name,
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
    },
    async getListApproval(query = {}) {
      const res = await api.appData.getApproval(query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          return res.data.data.approvals
          // const _pagination = res.data.data.meta.pagination;
          // if (pagination.value.page > _pagination.total_pages) {
          //   setPagination({
          //     total: _pagination.total,
          //     total_pages: _pagination.total_pages,
          //     size: _pagination.per_page,
          //     page: 1,
          //     keyword: pagination.value.keyword,
          //   });
          // } else {
          //   setTableData(res.data.data.approvals);
          //   setPagination({
          //     total: _pagination.total,
          //     total_pages: _pagination.total_pages,
          //     size: _pagination.per_page,
          //     page: _pagination.current_page,
          //     keyword: pagination.value.keyword,
          //   });
          // }
        }
      } catch (error) {
        console.log(error)
      }
    },
    syncFilter() {
      const filterInstance = this.gridApi.getFilterInstance("name")

      const routeQuery = this.$route.query
      // Set the filter model
      filterInstance.setModel({
        filter: routeQuery.name || null,
        filterType: "text",
        type: "contains",
      })
    },
    async onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
      this.showLoadingOverlay()
      const _this = this
      const updateData = (data, pagination) => {
        // params.api.setRowData(data)
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
      const query = {
        include: "fields,approvers,followers,creator,category",
        type: "i_approve",
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
    },
  },
}
</script>

<style></style>
