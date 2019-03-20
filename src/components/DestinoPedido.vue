<template>
  <div class="q-ma-sm border-list">
    <q-collapsible icon="forward" :label="this.$t('destino')" opened class="teste">
      <div>
        <search-funcionario
          v-model="form.destinatario"
          :label="this.$t('busca_destinatario')"
          :searchMethod="searchDestinatario"
          :validator="validator.destinatario"
          @input="validator.destinatario.$touch()"
          required
        ></search-funcionario>
      </div>
    </q-collapsible>
  </div>
</template>

<script>
import SearchFuncionario from '../components/search/SearchFuncionario'
import { RepositoryFactory } from '../repositories/RepositoryFactory'
const FuncionarioRepository = RepositoryFactory.get('funcionario')

export default {
  props: {
    form: { type: Object, requried: true },
    validator: { type: Object, required: true }
  },
  data () {
    return {}
  },
  methods: {
    searchDestinatario (filtro) {
      return FuncionarioRepository.get(filtro)
    }
  },
  components: {
    SearchFuncionario
  }
}
</script>

<style>
</style>
