<template>
  <div class="q-ma-sm border-list">
    <q-collapsible icon="bookmark" :label="this.$t('observacoes')" opened class="teste">
      <div class="row">
        <div class="col q-pl-sm q-pr-sm">
          <q-field
            orientation="vertical"
            :error="validator.$error"
          >
            <q-input
              v-model="model"
              :placeholder="$t('observacoes')"
              type="textarea"
              :max-height="100"
              rows="3"
            />
          </q-field>
        </div>
      </div>
    </q-collapsible>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true },
    validator: { type: Object, required: true }
  },
  data () {
    return {}
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
  }
}
</script>

<style>
</style>
