<template>
  <v-container fluid class="grey ligthen-3 pa-0 ma-0" min-height="">
    <v-sheet class="blue ligthen-3 pa-5 pt-10 pb-10" min-height="">
      <v-card>
        <v-dialog
          persistent
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card tile>
            <!-- <v-toolbar flat dark color="primary" max-height="50vh">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="SaveEdited"> Save </v-btn>
              </v-toolbar-items>
            </v-toolbar> -->

            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="form_title"
                    label="Title"
                    @blur="$v.form_title.$touch()"
                    @input="$v.form_title.$touch()"
                  ></v-text-field>
                  <template v-if="$v.form_title.$error">
                    <div
                      v-if="!$v.form_title.required"
                      class="errorMessage red--text"
                    >
                      Title is required.
                    </div>
                  </template>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="form_headline"
                    label="Headline"
                    @blur="$v.form_headline.$touch()"
                    @input="$v.form_headline.$touch()"
                  ></v-textarea>
                  <template v-if="$v.form_headline.$error">
                    <div
                      v-if="!$v.form_headline.required"
                      class="errorMessage red--text"
                    >
                      Headline is required.
                    </div>
                  </template>
                </v-col>
              </v-row>
              <v-row> </v-row>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="form_tags"
                    :items="items"
                    label="Tags"
                    multiple
                    chips
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="data.item.slice(0, 1).toUpperCase()"
                        ></v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
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
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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

const dev = process.env.DEV_API
const prod = process.env.PROD_API
const url = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  mixins: [validationMixin],
  head: () => ({
    title: 'Systeme Users Datatable',
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
    ],
    form_content: '',
    form_title: '',
    form_headline: '',
    form_publish: '',
    dialog: false,
    dialogDelete: false,
    deletedialog: false,
    editedIndex: -1,
    search: '',
    tabledata: [],
    tabledata_total: 0,
    loading: true,
    options: {},
  }),
  validations: {
    form_content: { required },
    form_title: { required },
    form_headline: { required },
    form_publish: { required },
  },
  async created() {},
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.form_title.$dirty) return errors
      !this.$v.form_title.required && errors.push('Title is required.')
      return errors
    },
    contentErrors() {
      const errors = []
      if (!this.$v.form_content.$dirty) return errors
      !this.$v.form_content.required && errors.push('Content is required.')
      return errors
    },
  },
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
  methods: {
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
              no: rowcount,
              name: value.name,
              email: value.email,
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
    editItem(item) {
      this.image_id = this.tabledata[this.tabledata.indexOf(item)].ckeditor_log
      this.form_title = this.tabledata[this.tabledata.indexOf(item)].title
      this.form_headline = this.tabledata[this.tabledata.indexOf(item)].headline
      this.form_image = this.tabledata[this.tabledata.indexOf(item)].image
      this.form_content = this.tabledata[this.tabledata.indexOf(item)].content
      this.form_tags = this.tabledata[this.tabledata.indexOf(item)].tags
      this.form_publish =
        this.tabledata[this.tabledata.indexOf(item)].publishvalue
      this.editedIndex = this.tabledata.indexOf(item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.tabledata.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
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
