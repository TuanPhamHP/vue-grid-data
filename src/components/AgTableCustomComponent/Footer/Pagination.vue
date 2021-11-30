<template>
  <div class="pagination-header">
    <div class="pagination-mod-v2">
      <div
        class="page-idx"
        :class="
          pagination.current_page === 1 ? 'disabled btn-pag-d' : 'pointer'
        "
        @click="handleChangeCurrentPages(pagination.current_page - 1)"
      >
        <img src="@/assets/imgs/icons/chevron-prev-blue.svg" alt="" />
      </div>

      <span
        v-if="pagination.current_page > 1"
        @click.stop="handleChangeCurrentPages(1)"
        >1</span
      >
      <span v-if="pagination.current_page > 3">...</span>
      <span
        v-if="pagination.current_page > 2"
        @click.stop="handleChangeCurrentPages(pagination.current_page - 1)"
        >{{ pagination.current_page - 1 }}</span
      >
      <span class="active">{{ pagination.current_page }}</span>
      <span
        v-if="pagination.current_page + 1 < pagination.total_pages"
        @click.stop="handleChangeCurrentPages(pagination.current_page + 1)"
        >{{ pagination.current_page + 1 }}</span
      >
      <span
        v-if="
          pagination.current_page + 2 < pagination.total_pages &&
          pagination.current_page === 1
        "
        @click.stop="handleChangeCurrentPages(pagination.current_page + 2)"
        >{{ pagination.current_page + 2 }}</span
      >
      <span
        v-if="
          pagination.total_pages > 3 &&
          pagination.current_page + 3 < pagination.total_pages
        "
        >...</span
      >
      <span
        v-if="pagination.current_page + 3 === pagination.total_pages"
        @click.stop="handleChangeCurrentPages(pagination.current_page + 2)"
        >{{ pagination.current_page + 2 }}</span
      >
      <span
        v-if="
          pagination.total_pages > 1 &&
          pagination.current_page !== pagination.total_pages
        "
        @click.stop="handleChangeCurrentPages(pagination.total_pages)"
        >{{ pagination.total_pages }}</span
      >

      <div
        class="page-idx"
        :class="
          pagination.current_page === pagination.total_pages
            ? 'disabled btn-pag-d'
            : 'pointer'
        "
        @click="handleChangeCurrentPages(pagination.current_page + 1)"
        style="transform: rotateZ(180deg)"
      >
        <img src="@/assets/imgs/icons/chevron-prev-blue.svg" alt="" />
      </div>
    </div>
    <div
      v-if="showPerPage"
      class="
        numb-per-page
        btn-no-outline
        input-group-pagination
        align-items-center
      "
      style="justify-content: flex-end"
    >
      <p class="fullsize-text mb-0 font-size-14">Hiển thị:</p>
      <select
        v-model="perPage"
        class="form-select btn-no-outline select-css focus-no-outline"
        aria-label="Default select example"
      >
        <option
          v-for="option in optionsPageSize"
          :key="option"
          class="dropdown-item text-center"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    titleSelect: {
      type: String,
      default: "Hiển thị",
    },
    handleChangePerPages: {
      type: Function,
      default() {},
    },
    handleChangePage: {
      type: Function,
      default() {},
    },
    pagination: {
      type: Object,
      default() {},
    },
    showPerPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      optionsPageSize: [15, 25, 50, 100],
      // optionsPageSize: [10],
      // optionsPageSize: [
      //   {}
      //   ],
      // changePerPage: 15,
      // pagination.current_page
      perPage: 15,
      currentPage: 1,
      preventApiDuplicate: true,
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler() {
        if (
          this.pagination.per_page &&
          this.pagination.per_page !== this.perPage
        ) {
          this.preventApiDuplicate = false
          this.perPage = this.pagination.per_page
          if (!this.optionsPageSize.includes(+this.pagination.per_page)) {
            this.optionsPageSize.splice(0, 0, +this.pagination.per_page)
          }
          this.$nextTick(() => {
            this.preventApiDuplicate = true
          })
        }
        // console.log(this.pagination);
      },
    },
    perPage(_perPage) {
      if (this.preventApiDuplicate) {
        this.handleChangePerPages(_perPage)
        this.isOpen = false
      }
    },
  },
  methods: {
    handleChangeCurrentPages(_currentPage) {
      if (_currentPage > 0 && _currentPage <= this.pagination.total_pages) {
        // this.currentPage = _currentPage;
        this.handleChangePage(_currentPage)
      }
    },
    // handleChangePerPage(_perPage) {
    //   console.log(this.perPage)
    //   console.log(_perPage)
    //   // console.log(this.perPage)
    //   // this.handleChangePerPages(_perPage)
    //   this.isOpen = false
    //   console.log('_perPage', _perPage)
    // }
    // handleClickOutside() {
    //   if (this.isOpen) {
    //     this.isOpen = false
    //   }
    // }
  },
}
</script>

<style scoped lang="scss">
.pagination-header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.form-select {
  cursor: pointer;
  border: none !important;
  border: none !important;
  padding-left: 4px;
  font-size: 13px;
}
.pagination-mod-v2 {
  display: flex;
  margin: 0 auto;
  align-items: center;
  span {
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    color: #2b2b2b;
    height: 32px;
    min-width: 32px;
    border-radius: 4px;
    margin: 0 2px;
    padding: 4px 2px;
    line-height: 24px;
    background: transparent;
  }

  span.active {
    border-radius: 4px;
    background-color: #006a9b;
    color: #fff;
  }
}
.fullsize-text {
  white-space: nowrap;
}

.page-idx {
  border-radius: 4px;
  height: 100%;
  margin: 0px 6px;
  padding-left: 6px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  &.disabled {
    cursor: no-drop;
  }
  .caret-left,
  .caret-right {
    width: 38px;
    height: 30px;
    text-align: center;
    font-size: 25px;
    padding-top: 3px;
    padding-bottom: 6px;
    cursor: pointer;
  }

  .caret-left {
    border-right: 1px solid rgba(184, 184, 184, 0.685);
  }

  .caret-right {
    border-left: 1px solid rgba(199, 199, 199, 0.685);
  }

  span {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    color: #2b2b2b;
    height: 32px;
    width: 32px;
    border-radius: 4px;
    margin: 0 2px;
    padding: 4px 2px;
    line-height: 24px;

    &:hover {
      background-color: #d69245c4;
    }
  }

  .select-css {
    border-radius: 4px;
    border: solid 1px #d8dce6;
    background-color: #ffffff;
    display: flex;
    align-items: center;
  }
  .input-group-pagination {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    cursor: pointer;
    border: none !important;
    border: 1px solid #e5e7e8 !important;
    border-radius: 4px !important;
    padding-left: 4px;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 13px;
    width: 80px;
    .fullsize-text {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      font-size: 10px;
      line-height: 2.2;
      text-align: left;
      color: #808890;
    }
  }
}
.numb-per-page {
  display: flex;
  input {
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 2px 0 #8f8f8f;
    background-color: transparent;
    width: 46px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    //padding-left: 8px;
    &:focus {
      outline: none;
    }
  }
}
.btn-pag-d {
  opacity: 0.9;
  img {
    filter: grayscale(1);
  }
}
</style>
