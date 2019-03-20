<template>
  <modal-search
    ref="modal"
    :requestMethod="searchMethod"
    :columns="columns"
    :labelHeader="this.$t('busca_setor')"
    :filter="filtro"
    :sortBy="'idImovel'"
    @onSelect="select"
  >
    <template slot="searchInputs">
      <q-input
        class="q-search col-lg-2 col-sm-3 q-mr-xs" color="none"
        inverted
        :placeholder="this.$t('codigo')"
        v-model="filtro.idImovel"
        @keyup.enter="$refs.modal.search"
      />
      <q-input
        class="q-search col-lg col-md col-sm-5 q-mr-xs" color="none"
        inverted
        :placeholder="this.$t('nome')"
        v-model="filtro.nome"
        @keyup.enter="$refs.modal.search"
      />
    </template>
  </modal-search>
</template>

<script>
import ModalSearch from './ModalSearch'

export default {
  props: {
    filtro: { type: Object, required: true },
    searchMethod: { type: Function, required: true }
  },
  data () {
    return {
      columns: [
        { name: 'idImovel', required: true, label: this.$t('codigo'), align: 'left', field: 'idImovel', sortable: true },
        { name: 'nome', required: true, label: this.$t('nome'), align: 'left', field: 'nome', sortable: true }
      ]
    }
  },
  methods: {
    open () {
      this.$refs.modal.open()
    },
    select (object) {
      this.$emit('onSelect', object)
    }
  },
  components: {
    ModalSearch
  }
}
</script>

<style>
</style>
