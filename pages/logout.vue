<template>
  <v-container fluid class="grey ligthen-3 pa-0 ma-0" min-height="">
    <!-- test page -->
  </v-container>
</template>

<script>
const dev = process.env.DEV_API
const prod = process.env.PROD_API
const url = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  mixins: [],
  head: () => ({
    title: 'Logout Page',
  }),

  data: () => ({}),

  async created() {},
  computed: {},
  watch: {},
  async fetch() {
    try {
      this.$auth.logout()
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped>
ul.clean {
  list-style: none !important;
  list-style-type: none !important;
}
.ck-editor__editable {
  height: 350px;
}
.ck.ck-content.ck-editor__editable {
  height: 350px;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
  height: 350px;
}
.ck.ck-content.ck-editor__editable_inline {
  height: 350px;
}
</style>
