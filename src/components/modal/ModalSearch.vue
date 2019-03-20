<template>
  <q-modal ref="modal" :content-css="{minWidth: '80vw'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          @click="close"
          icon="arrow_back"
        />
        <q-toolbar-title>
          {{ this.labelHeader }}
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar slot="header">
        <slot name="searchInputs"></slot>
        <q-btn class="col-lg-0 col-md-1" color="secondary" @click="search" icon="search"/>
      </q-toolbar>

      <div>
        <q-table
          ref="table"
          :data="objects"
          :columns="columns"
          :filter="filter"
          row-key="idAlmoxarifado"
          :pagination.sync="serverPagination"
          :loading="loading"
          @request="request"
        >
          <q-tr slot="body" slot-scope="props" :props="props" @click.native="select(props.row)" class="cursor-pointer">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
            <q-pagination
              input
              v-model="serverPagination.page"
              :min="1"
              :max="props.pagination.pagesNumber"
              @input="search"
            />
          </div>
        </q-table>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    labelHeader: {
      type: String,
      required: true
    },
    requestMethod: {
      type: Function,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    sortBy: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      objects: [],
      loading: false,
      serverPagination: {
        page: 0,
        rowsPerPage: 10,
        sortBy: this.sortBy,
        rowsNumber: 10,
        pagesNumber: 10
      }
    }
  },
  methods: {
    toogle () {
      this.$refs.modal.toogle()
    },
    open () {
      this.$refs.modal.show()
      this.search()
    },
    close () {
      this.$refs.modal.hide()
    },
    search () {
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    },
    request ({ pagination, filter }) {
      this.loading = true
      filter.size = pagination.rowsPerPage
      filter.page = pagination.page - 1
      filter.sort = pagination.sortBy && pagination.descending ? `${pagination.sortBy},desc` : pagination.sortBy

      this.requestMethod(filter).then(response => {
        this.serverPagination = pagination
        this.serverPagination.pagesNumber = response.data.totalPages
        this.objects = response.data.data
        this.loading = false
      })
    },
    select (object) {
      this.$emit('onSelect', object)
      this.close()
    }
  }
}
</script>

<style>
</style>
