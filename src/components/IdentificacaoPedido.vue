<template>
  <div class="q-ma-sm border-list">
    <q-collapsible icon="explore" label="Identificação" opened class="teste">
      <div>
        <search-almoxarifado
          v-model="form.almoxarifado"
          :label="this.$t('almoxarifado')"
          :searchMethod="searchAlmoxarifados"
          :validator="validator.almoxarifado"
          @input="validator.almoxarifado.$touch()"
          required
        ></search-almoxarifado>
        <search-setor
          v-model="form.setorSolicitante"
          :label="this.$t('setor_solicitante')"
          :searchMethod="searchSetor"
          :validator="validator.setorSolicitante"
          @input="validator.setorSolicitante.$touch()"
          required
        ></search-setor>
        <search-imovel
          v-model="form.imovel"
          :label="this.$t('imovel')"
          :searchMethod="searchImovel"
          :validator="validator.imovel"
          @input="validator.imovel.$touch()"
          required
        ></search-imovel>
        <search-setor
          v-model="form.setorDestino"
          :label="this.$t('setor_destino')"
          :searchMethod="searchSetor"
          :validator="validator.setorDestino"
          @input="validator.setorDestino.$touch()"
          required
        ></search-setor>
        <div class="row">
          <div class="col q-pl-sm q-pr-sm">
            <q-field
              :label="this.$t('justificativa')"
              orientation="vertical"
              :error="validator.justificativa.$error"
            >
              <q-input
                v-model="form.justificativa"
                :placeholder="$t('justificativa')"
                type="textarea"
                :max-height="100"
                rows="3"
              />
            </q-field>
          </div>
        </div>
      </div>
    </q-collapsible>
  </div>
</template>

<script>
import SearchAlmoxarifado from '../components/search/SearchAlmoxarifado'
import SearchSetor from '../components/search/SearchSetor'
import SearchImovel from '../components/search/SearchImovel'
import { RepositoryFactory } from '../repositories/RepositoryFactory'
const AlmoxarifadoRepository = RepositoryFactory.get('almoxarifado')
const SetorRepository = RepositoryFactory.get('setor')
const ImovelRepository = RepositoryFactory.get('imovel')

export default {
  props: {
    form: { type: Object, requried: true },
    validator: { type: Object, required: true }
  },
  data () {
    return {}
  },
  methods: {
    searchAlmoxarifados (filtro) {
      return AlmoxarifadoRepository.get(filtro)
    },
    searchSetor (filtro) {
      return SetorRepository.get(filtro)
    },
    searchImovel (filtro) {
      return ImovelRepository.get(this.form.setorSolicitante.idOrgaoSetor, filtro)
    }
  },
  components: {
    SearchAlmoxarifado,
    SearchSetor,
    SearchImovel
  }
}
</script>

<style>
</style>
