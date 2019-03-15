<template>
  <div>
    <input-group :valueSelected="valueSelected" @clean="clean">
      <template slot="inputs">
        <q-input
          class="border col-lg-1 col-md-2 col-sm-4"
          v-model="smallInputModel"
          :placeholder="placeholderSmall"
          ref="smallInput"/>
        <q-input
          class="border col-lg-11 col-md-10 col-sm-8"
          v-model="bigInputModel"
          :placeholder="placeholderBig"
          :loading="loading"
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
    </input-group>
  </div>
</template>

<script>
import InputGroup from './InputGroup'

export default {
  props: {
    placeholderSmall: { type: String },
    valueSmallInput: { type: String },
    placeholderBig: { type: String },
    valueBigInput: { type: String },
    valueSelected: { type: String },
    loading: { type: Boolean },
    openModal: { type: Function }
  },
  data () {
    return {}
  },
  methods: {
    clean () {
      this.$emit('clean')
      this.$nextTick(() => this.$refs.smallInput.focus())
    }
  },
  computed: {
    smallInputModel: {
      get: function () {
        return this.valueSmallInput
      },
      set: function (val) {
        this.$emit('onChangeSmall', val)
      }
    },
    bigInputModel: {
      get: function () {
        return this.valueBigInput
      },
      set: function (val) {
        this.$emit('onChangeBig', val)
      }
    }
  },
  components: {
    InputGroup
  }
}
</script>

<style>
</style>
