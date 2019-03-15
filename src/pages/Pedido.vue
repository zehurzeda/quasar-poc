<template>
  <q-page>
    <search-almoxarifado v-model="almoxarifado" :searchMethod="searchAlmoxarifados"></search-almoxarifado>
  </q-page>
</template>

<script>
import SearchAlmoxarifado from '../components/SearchAlmoxarifado'
import { RepositoryFactory } from '../repositories/RepositoryFactory'
const AlmoxarifadoRepository = RepositoryFactory.get('almoxarifado')

export default {
  name: 'Pedido',
  data () {
    return {
      almoxarifado: {}
    }
  },
  created () {
    this.$store.dispatch('layout/updateTitulo', this.$t('titulo_pedido'))
  },
  methods: {
    async searchAlmoxarifados (filtro) {
      const { data } = await AlmoxarifadoRepository.get(filtro)
      return data.data
    }
  },
  components: {
    SearchAlmoxarifado
  }
}
</script>

<style>
</style>
