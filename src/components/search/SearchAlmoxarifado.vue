<template>
  <search-input
    :required="required"
    :label="label"
    :filter="this.filtro"
    :searchMethod="this.searchMethod"
    @onSelect="select"
    @clean="clean"
    ref="searchInput"
    :valueSelected="selecionado"
    :validator="validator"
  >
    <template slot="inputs" slot-scope="{ loading }">
      <q-input
        class="col-lg-1 col-md-2 col-sm-4"
        v-model="filtro.sigla"
        :placeholder="$t('sigla')"
        ref="inputSigla"
        @input="changeSigla"/>
      <q-input
        class="col-lg-11 col-md-10 col-sm-8"
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
      <modal-search-almoxarifado
        :searchMethod="this.searchMethod"
        ref="modal"
        @onSelect="select"
        :filtro="filtro"
      ></modal-search-almoxarifado>
    </template>
  </search-input>
</template>

<script>
import SearchInput from './SearchInput'
import ModalSearchAlmoxarifado from '../modal/ModalSearchAlmoxarifado'

export default {
  props: {
    label: { type: String, required: true },
    searchMethod: { type: Function, required: true },
    value: { type: Object, required: true },
    required: { type: Boolean, default: false },
    minCharacter: { type: Number, default: 3 },
    debounce: { type: Number, default: 500 },
    validator: { type: Object, required: true }
  },
  data () {
    return {
      filtro: {
        sigla: '',
        nome: ''
      },
      selecionado: undefined,
      timer: null,
      loading: false
    }
  },
  methods: {
    changeNome () {
      this.$refs.searchInput.changeInput(this.filtro.nome)
    },
    changeSigla () {
      this.$refs.searchInput.changeInput(this.filtro.sigla)
    },
    clean () {
      this.filtro.nome = ''
      this.filtro.sigla = ''
      this.selecionado = undefined
      this.model = {}
      this.$nextTick(() => this.$refs.inputSigla.focus())
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
        this.validator.$touch()
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
