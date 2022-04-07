<template>
  <v-container fluid class="grey ligthen-3 pa-0 ma-0" min-height="">
    <v-sheet class="blue ligthen-3 pa-5 pt-10 pb-10" min-height="">
      <v-card>
        <v-card-title>
          User Logs

          <v-spacer></v-spacer>

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @change="getDataFromApi"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/admin/role/create">Create</v-btn>
          <!-- <v-btn color="primary" to="admin/role/create">Create</v-btn> -->
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="tabledata"
          :options.sync="options"
          :server-items-length="tabledata_total"
          :loading="loading"
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 30, 40, 50],
          }"
        >
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="closeDelete()"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="deleteItemConfirm()"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:header.id="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:header.user_id="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:header.type="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:header.description="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:item.publish="{ item }">
            {{ item.publish }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ item.created_at }}
          </template>
        </v-data-table>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { admin } from '~/mixins/admin_pages.js'
const dev = process.env.DEV_API
const prod = process.env.PROD_API
const url = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  mixins: [validationMixin, admin],

  head: () => ({
    title: 'System Users Datatable',
  }),

  data: () => ({
    form_tags: [],
    items: [],
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      { text: 'User ID', value: 'user_id' },
      { text: 'Type', value: 'type' },
      { text: 'Description', value: 'description' },
      { text: 'Change', value: 'created_at' },
      { text: 'Date/Time', value: 'updated_at' },
    ],

    item: null,

    role: [],
    switch1: true,
    form_id: '',
    form_name: '',
    form_role: 'Admin',
    form_roleId: 1,
    form_role_name: [],
    form_resetpassword: '',
    dialog: false,
    dialogDelete: false,
    deletedialog: false,
    dialogsecurity: false,
    form_resetpassword: '',
    editedIndex: -1,
    search: '',
    status_list: ['Inactive', 'Active'],
    status_list2: ['Inactive', 'Active'],
    select: ['Inactive'],
    tabledata: [],
    tabledata_total: 0,
    loading: true,
    options: {},
    selected_status: ['Inactive'],
    selectedstatus: '',
    role: [],
    data: [],
  }),
  validations: {
    form_id: { required },
    form_name: { required },
    form_role: { required },
  },
  async created() {},
  computed: {},
  watch: {
    options: {
      handler() {
        this.getDataFromApi()
      },
      deep: true,
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  async fetch() {},
  mounted() {
    this.getDataFromApi()
  },
  created() {},
  methods: {
    async update_name() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let payload = new FormData()
      let table_id = this.tabledata[this.editedIndex].id

      payload.append('id', table_id)
      payload.append('user_name', this.form_name)

      try {
        this.$axios
          .$post(`api/user/update_username/${table_id}`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.tabledata[this.editedIndex].name = this.form_name
            this.$fetch()
          })
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },
    async update_role() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let payload = new FormData()
      let table_id = this.tabledata[this.editedIndex].id

      payload.append('id', table_id)
      payload.append('role_id', this.form_role_name['id'])
      payload.append('role_name', this.form_role_name['text'])

      try {
        this.$axios
          .$post(`api/role/update_role/${table_id}`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.tabledata[this.editedIndex].role_id = this.form_role_name['id']
            this.tabledata[this.editedIndex].role_name =
              this.form_role_name['text']

            this.form_role_name = {
              text: this.form_role_name['text'],
              id: this.form_role_name['id'],
            }

            this.$fetch()
          })
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },
    async onChange(value) {},
    async changeStatus() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let payload = new FormData()
      let table_id = this.tabledata[this.editedIndex].id

      payload.append('id', table_id)
      payload.append('selectedstatus', this.selectedstatus)

      try {
        this.$axios
          .$post(`api/user/changestatus/${table_id}`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.tabledata[this.editedIndex].status = this.selectedstatus
            this.dialogsecurity = false
          })
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },

    async getDataFromApi() {
      this.loading = true
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      let payload = new FormData()
      payload.append('sortDesc', sortDesc)
      payload.append('sortBy', sortBy)
      payload.append('page', page)
      payload.append('itemsPerPage', itemsPerPage)
      payload.append('search', this.search)

      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('api/logs/datatable', payload)
        .then((res) => {
          var data = []
          var rowcount = 1
          if (page == 1) {
            rowcount = 1
          } else {
            rowcount = (page - 1) * itemsPerPage + 1
          }

          for (const [key, value] of Object.entries(res.data)) {
            data.push({
              id: value.id,
              no: rowcount,
              user_id: value.meta['user_name'],
              // user_id: value.user_id,

              type: value.type_desc,
              description: value.description,
              created_at: value.created,
              updated_at: value.updated,
            })
            rowcount++
          }

          this.tabledata = data
          this.tabledata_total = res.total
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
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
