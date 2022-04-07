<template>
  <v-container fluid class="grey ligthen-3 pa-0 ma-0" min-height="800vh">
    <v-sheet class="blue ligthen-3 pa-5 pt-10 pb-10" min-height="200vh">
      <form class="white pa-5" action="">
        <v-row
          ><v-col>
            <v-btn color="primary" depressed to="/admin"> BACK </v-btn>
          </v-col></v-row
        >
        <v-row>
          <v-col>
            <v-text-field
              class="ma-2 pa-2"
              v-model="name"
              :error-messages="nameErrors"
              :counter="25"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <v-text-field
              class="ma-2 pa-2"
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="ma-2 pa-2"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 6 characters"
              counter
              :error-messages="passwordErrors"
              @click:append="show1 = !show1"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn class="ml-0" color="success" v-on:click="register()">
              <label class="white-font">Register</label>
            </v-btn>
            <v-btn
              depressed
              color="primary"
              @click="clear"
              class="mr-4 ma-2 pa-2"
            >
              clear
            </v-btn>
          </v-col>
          <v-col> </v-col>
        </v-row>
      </form>
    </v-sheet>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { Vuelidate, validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'

const dev = process.env.DEV_API
const prod = process.env.PROD_API
const url = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  head: () => ({
    title: 'Create User',
  }),
  mixins: [validationMixin],
  data: () => ({
    alert: 'd-none',
    error_msg: '',
    loading: false,
    form: {
      name: '',
      email: '',
      password: '',
    },
    name: '',
    email: '',
    password: '',
    show1: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 6 characters',
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  validations: {
    name: { required, maxLength: maxLength(25) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  components: {},
  async mounted() {},
  async fetch() {},
  async created() {},
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const passerrors = []
      if (!this.$v.password.$dirty) return passerrors
      !this.$v.password.required && passerrors.push('Password is required')
      return passerrors
    },
  },
  methods: {
    async register() {

      this.$v.email.$touch()
      this.$v.password.$touch()
      this.$v.name.$touch()
      this.$v.$touch()

      if (!this.$v.$invalid) {

        this.alert = 'd-none'
        this.loading = true
        this.form.email = (this.email).trim()
        this.form.password = this.password
        this.form.name = this.name

        // try {
        //   await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
        // } catch (error) {
        //   if (error.response.status === 422) console.log(error.response.data)
        // }

        // try {

        await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
        let payload = new FormData()
        payload.append('email', this.email)
        payload.append('password', this.password)
        payload.append('name', this.name)

        try {
          this.$axios
            .$post(`api/user/register`, payload, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {})
            .catch((error) => {})
            .finally(() => {})
        } catch (error) {}
        // } catch (error) {
        //   this.alert = ''
        //   this.error_msg = error.response.data
        //   if (error.response.status === 422) {
        //     console.log(error.response.data)
        //   }
        // }
        this.loading = false
      }
    },
    clear() {
      this.$v.$reset()
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''

      this.name = ''
      this.email = ''
      this.password = ''
      this.select = null
      this.alert = 'd-none'
      this.error_msg = ''
      this.$v.$reset()
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
