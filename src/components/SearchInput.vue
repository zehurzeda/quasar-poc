<template>
  <div class="row">
    <div class="col-sm-12 q-pl-sm q-pr-sm">
      <div>
        <q-field
          :label="this.required ? `* ${this.label}` : this.label"
          orientation="vertical"
        >
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
          <div v-else class="row no-wrap" >
            <slot name="inputs" v-bind:loading="loading"></slot>
          </div>
        </q-field>
      </div>
      <search-auto-complete
        :objects="objects"
        ref="autoComplete"
        @onSelect="select"
      >
        <template slot="item" slot-scope="slotProps">
          <slot name="templateAutocomplete" v-bind:value="slotProps"></slot>
        </template>
      </search-auto-complete>
    </div>
    <slot name="modal"></slot>
  </div>
</template>

<script>
import SearchAutoComplete from './SearchAutoComplete'

export default {
  props: {
    required: { type: Boolean, default: false },
    label: { type: String, required: true },
    filter: { type: Object, required: true },
    searchMethod: { type: Function, required: true },
    minCharacter: { type: Number, default: 3 },
    debounce: { type: Number, default: 500 },
    valueSelected: { required: true }
  },
  data () {
    return {
      objects: [],
      timer: null,
      loading: false
    }
  },
  methods: {
    changeInput (val) {
      this.clearSearch()
      if (val.length >= this.minCharacter) {
        this.delayTrigger()
      } else {
        this.$refs.autoComplete.close()
      }
    },
    clean () {
      this.$emit('clean')
    },
    openPopover () {
      this.$refs.autoComplete.open()
    },
    select (object) {
      this.$refs.autoComplete.close()
      this.$emit('onSelect', object)
    },
    clearSearch () {
      clearTimeout(this.timer)
      this.loading = false
    },
    delayTrigger () {
      this.clearSearch()
      this.timer = setTimeout(this.search, this.debounce)
    },
    async search () {
      this.loading = true
      try {
        this.objects = await this.searchMethod(this.filter)
        if (this.objects.length > 0) {
          this.$refs.autoComplete.open()
        } else {
          this.$refs.autoComplete.close()
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
  components: {
    SearchAutoComplete
  }
}
</script>

<style>
</style>
