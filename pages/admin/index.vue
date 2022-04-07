<template>
  <v-container fluid class="grey ligthen-3 pa-0 ma-0" min-height="">
    <v-sheet class="blue ligthen-3 pa-5 pt-10 pb-10" min-height="">
      <v-card>
        <v-dialog
          v-model="dialogsecurity"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card tile>
            <v-toolbar flat dark color="primary" max-height="50vh">
              <v-btn icon dark @click="dialogsecurity = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    class="pt-5"
                    v-model="form_resetpassword"
                    label="Enter the desired reset password"
                  ></v-text-field>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="resetPassword()"
                    >Reset Password</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-combobox
                    v-model="selectedstatus"
                    :items="status_list2"
                    label="Toggle account enable/disable"
                  ></v-combobox>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="changeStatus()"
                    >Save</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-card-text>

            <div style="flex: 1 1 auto"></div>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card tile>
            <v-toolbar flat dark color="primary" max-height="50vh">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <!-- <v-btn dark text @click="save_account"> Save </v-btn> -->
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    class="pt-5"
                    v-model="form_name"
                    label="Name"
                    @blur="$v.form_name.$touch()"
                    @input="$v.form_name.$touch()"
                  ></v-text-field>
                  <template v-if="$v.form_name.$error">
                    <div
                      v-if="!$v.form_name.required"
                      class="errorMessage red--text"
                    >
                      Name is required.
                    </div>
                  </template>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="update_name()"
                    >save</v-btn
                  >
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="form_role_name"
                    item-text="text"
                    item-value="id"
                    :items="items"
                    @change="onChange"
                    return-object
                  ></v-select>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="update_role()"
                    >save</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>

            <div style="flex: 1 1 auto"></div>
          </v-card>
        </v-dialog>

        <v-card-title>
          System Users Table

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

          <v-btn color="primary" to="admin/user/create">Create</v-btn>
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
          <template v-slot:header.name="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:item.publish="{ item }">
            {{ item.publish }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ item.created_at }}
          </template>
          <template v-slot:item.id="{ item }">
            <v-icon small class="mr-2" @click="secureAccount(item)">
              mdi-key
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },

      { text: 'Change', value: 'created_at' },
      { text: 'Date/Time', value: 'updated_at' },
      { text: 'Action', value: 'id', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
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
  async fetch() {
    await this.$axios.$get('/sanctum/csrf-cookie')
    let response = await this.$axios.$get('api/role/data')

    this.items = response.data.map((d) => ({
      id: d.id,
      text: d.name,
    }))
  },
  mounted() {
    this.getDataFromApi()
  },
  created() {
    // console.log('test return')
  },
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
    async onChange(value) {
      // console.log(value)
    },
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
    async resetPassword() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let payload = new FormData()
      let table_id = this.tabledata[this.editedIndex].id
      let newpassword = this.form_resetpassword

      payload.append('id', table_id)
      payload.append('newpassword', newpassword)

      try {
        this.$axios
          .$post(`api/user/resetpassword/${table_id}`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {})
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },

    // async save_account() {},

    editItem(item) {
      this.form_id = this.tabledata[this.tabledata.indexOf(item)].id
      this.form_name = this.tabledata[this.tabledata.indexOf(item)].name
      this.form_role_id = this.tabledata[this.tabledata.indexOf(item)].role_id
      this.form_role_name = {
        text: this.tabledata[this.tabledata.indexOf(item)].role_name,
        id: this.form_role_id,
      }

      this.editedIndex = this.tabledata.indexOf(item)

      console.log(this.form_role_name)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItem(item) {
      this.editedIndex = this.tabledata.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    secureAccount(item) {
      this.dialogsecurity = true
      this.editedIndex = this.tabledata.indexOf(item)
      this.form_id = this.tabledata[this.tabledata.indexOf(item)].id
      this.selectedstatus = this.tabledata[this.tabledata.indexOf(item)].status

      // this.tabledata.splice(this.editedIndex, 1) delete table row
      // this.selected_status = [this.selected]
      // console.log(this.selected_status)
      // console.log(this.selected)
      // console.log([this.selected])
    },

    async deleteItemConfirm() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      let table_id = this.tabledata[this.editedIndex].id
      try {
        this.$axios
          .$delete(`api/user/delete/${table_id}`)
          .then((res) => {})
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
      this.tabledata.splice(this.editedIndex, 1)
      this.closeDelete()
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
        .$post('api/user/datatable', payload)
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
              name: value.name,
              email: value.email,
              role_name: value.role_name,
              role_id: value.role_id,
              created_at: value.created,
              updated_at: value.updated,
              is_active: value.is_active,
              status: value.is_active ? 'Active' : 'Inactive',
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
