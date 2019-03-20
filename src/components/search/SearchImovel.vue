<template>
  <search-input
    :required="required"
    :disabled="disabled"
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
        v-model="filtro.idImovel"
        :placeholder="$t('codigo')"
        ref="inputCodigo"
        @input="changeCodigo"/>
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
      <q-item-tile sublabel>{{value.object.idImovel}}</q-item-tile>
    </template>
    <template slot="modal">
      <modal-search-imovel
        :searchMethod="this.searchMethod"
        ref="modal"
        @onSelect="select"
        :filtro="filtro"
      ></modal-search-imovel>
    </template>
  </search-input>
</template>

<script>
import SearchInput from './SearchInput'
import ModalSearchImovel from '../modal/ModalSearchImovel'

export default {
  props: {
    label: { type: String, required: true },
    searchMethod: { type: Function, required: true },
    value: { type: Object, required: true },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    minCharacter: { type: Number, default: 3 },
    debounce: { type: Number, default: 500 },
    validator: { type: Object, required: true }
  },
  data () {
    return {
      filtro: {
        idImovel: undefined,
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
    changeCodigo () {
      this.$refs.searchInput.changeInput(this.filtro.idImovel)
    },
    clean () {
      this.filtro.idImovel = undefined
      this.filtro.nome = ''
      this.selecionado = undefined
      this.model = {}
      this.$nextTick(() => this.$refs.inputCodigo.focus())
    },
    openModal () {
      this.$refs.modal.open()
    },
    select (imovel) {
      this.selecionado = `${imovel.idImovel} - ${imovel.nome}`
      this.model = imovel
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
    SearchInput,
    ModalSearchImovel
  }
}
</script>

<style>
</style>
