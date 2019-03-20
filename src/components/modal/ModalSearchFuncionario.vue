<template>
  <modal-search
    ref="modal"
    :requestMethod="searchMethod"
    :columns="columns"
    :labelHeader="label"
    :filter="filtro"
    :sortBy="'idFuncionario'"
    @onSelect="select"
  >
    <template slot="searchInputs">
      <q-input
        class="q-search col-lg-2 col-sm-3 q-mr-xs" color="none"
        inverted
        :placeholder="this.$t('matricula')"
        v-model="filtro.matricula"
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
    searchMethod: { type: Function, required: true },
    label: { type: String }
  },
  data () {
    return {
      columns: [
        {
          name: 'idFuncionario',
          required: true,
          label: this.$t('matricula'),
          align: 'left',
          field: 'idFuncionario',
          sortable: true
        },
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
