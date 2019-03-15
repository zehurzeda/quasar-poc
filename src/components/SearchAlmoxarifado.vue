<template>
  <search-input
    :required="required"
    :label="this.$t('almoxarifado')"
    :filter="this.filtro"
    :searchMethod="this.searchMethod"
    @onSelect="select"
    @clean="clean"
    ref="searchInput"
    :valueSelected="selecionado"
  >
    <template slot="inputs" slot-scope="{ loading }">
      <q-input
        class="border col-lg-1 col-md-2 col-sm-4"
        v-model="filtro.sigla"
        :placeholder="$t('sigla')"
        ref="inputSigla"
        @input="changeSigla"/>
      <q-input
        class="border col-lg-11 col-md-10 col-sm-8"
        v-model="filtro.nome"
        :placeholder="$t('nome')"
        :loading="loading"
        @input="changeNome"
        :after="[
          {
            icon: 'close',
            content: true,
            handler () {
              clean()
            }
          },
          {
            icon: 'search',
            handler () {
              openModal()
            }
          }
        ]"/>
    </template>
    <template slot="templateAutocomplete" slot-scope="{ value }">
      <q-item-tile label>{{value.object.nome}}</q-item-tile>
      <q-item-tile sublabel>{{value.object.sigla}}</q-item-tile>
    </template>
    <template slot="modal">
      <modal-search-almoxarifado ref="modal" @onSelect="select" :filtro="filtro"></modal-search-almoxarifado>
    </template>
  </search-input>
</template>

<script>
import SearchInput from './SearchInput'
import ModalSearchAlmoxarifado from './ModalSearchAlmoxarifado'

export default {
  props: {
    searchMethod: { type: Function, required: true },
    value: { type: Object, required: true },
    required: { type: Boolean, default: false },
    minCharacter: { type: Number, default: 3 },
    debounce: { type: Number, default: 500 }
  },
  data () {
    return {
      filtro: {
        sigla: '',
        nome: ''
      },
      selecionado: undefined,
      timer: null,
      loading: false,
      almoxarifados: []
    }
  },
  methods: {
    changeNome (nome) {
      this.filtro.nome = nome
      this.$refs.searchInput.changeInput(this.filtro.nome)
    },
    changeSigla (sigla) {
      this.filtro.sigla = sigla
      this.$refs.searchInput.changeInput(this.filtro.sigla)
    },
    clean () {
      this.filtro.nome = ''
      this.filtro.sigla = ''
      this.selecionado = undefined
      this.$nextTick(() => this.$refs.inputSigla.focus())
      this.$emit('onSelect', null)
    },
    openModal () {
      this.$refs.modal.open()
    },
    select (almoxarifado) {
      this.selecionado = `${almoxarifado.sigla} - ${almoxarifado.nome}`
      this.model = almoxarifado
    }
  },
  computed: {
    model: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  components: {
    ModalSearchAlmoxarifado,
    SearchInput
  }
}
</script>

<style>
</style>
