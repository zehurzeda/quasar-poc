<template>
  <q-page>
    <form @submit.prevent="submit" novalidate>
      <identificacao-pedido
        :form="this.form.identificacao"
        :validator="this.$v.form.identificacao"
      />
      <observacao-pedido
        v-model="form.observacao"
        :validator="this.$v.form.observacao"
      />
      <destino-pedido
        :form="this.form.destino"
        :validator="this.$v.form.destino"
      />
      <div class="text-center">
        <q-btn class="q-ma-xs" :label="this.$t('cancelar')"></q-btn>
        <q-btn class="q-ma-xs" type="submit" icon="create" :label="this.$t('salvar')"></q-btn>
        <q-btn class="q-ma-xs" :label="this.$t('encaminhar')"></q-btn>
      </div>
    </form>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import IdentificacaoPedido from '../components/IdentificacaoPedido'
import ObservacaoPedido from '../components/ObservacaoPedido'
import DestinoPedido from '../components/DestinoPedido'

export default {
  name: 'Pedido',
  data () {
    return {
      form: {
        identificacao: {
          almoxarifado: {},
          setorSolicitante: {},
          imovel: {},
          setorDestino: {},
          dataEmissao: {},
          emissor: {},
          justificativa: ''
        },
        observacao: '',
        destino: {
          destinatario: {}
        }
      }
    }
  },
  methods: {
    submit () {
      this.form.identificacao.dataEmissao = new Date()
      this.form.identificacao.emissor = {
        codigo: 123,
        nome: 'José Eduardo Urzêda Ferreira'
      }
      this.$v.form.$touch()
      if (this.$v.form.$pending || this.$v.form.$error) {
        return
      }
      console.log(this.form)
    }
  },
  created () {
    this.$store.dispatch('layout/updateTitulo', this.$t('titulo_pedido'))
  },
  validations: {
    form: {
      identificacao: {
        almoxarifado: { required },
        setorSolicitante: { required },
        imovel: { required },
        setorDestino: { required },
        dataEmissao: { required },
        emissor: { required },
        justificativa: { required }
      },
      observacao: {},
      destino: {
        destinatario: { required }
      }
    }
  },
  components: {
    IdentificacaoPedido,
    ObservacaoPedido,
    DestinoPedido
  }
}
</script>

<style>
</style>
