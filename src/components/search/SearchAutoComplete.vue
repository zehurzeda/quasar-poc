<template>
  <div class="row">
    <q-popover ref="popover" class="full-width" no-focus>
      <q-list link separator class="scroll full-width">
        <q-item
          v-for="object in objects"
          :key="object.id"
          v-close-overlay
          @click.native="$emit('onSelect', object);"
        >
          <q-item-main>
            <slot name="item" v-bind:object="object">
            </slot>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </div>
</template>

<script>
export default {
  props: {
    objects: { type: Array, required: true }
  },
  data () {
    return {}
  },
  methods: {
    toogle () {
      this.$refs.popover.toogle()
    },
    open () {
      this.$refs.popover.show()
    },
    close () {
      this.$refs.popover.hide()
    }
  }
}
</script>

<style>
</style>
