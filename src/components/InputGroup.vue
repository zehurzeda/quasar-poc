<template>
  <div>
    <div v-if="valueSelected">
      <q-input
        v-model="valueSelected"
        readonly
        :after="[
          {
            icon: 'close',
            content: true,
            handler () {
              clean()
            }
          }
        ]"
      />
    </div>
    <div v-else class="row no-wrap">
      <slot name="inputs"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    valueSelected: { type: String }
  },
  data () {
    return {}
  },
  methods: {
    clean () {
      this.$emit('clean')
    }
  }
}
</script>

<style>
</style>
