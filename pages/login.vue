<template>
  <v-app id="login">
    <v-main>
      <v-container fluid>
        <!-- class="fill-height" -->
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-8">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large href="#" target="_blank" v-on="on">
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    v-model="email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click.prevent="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      email: '',
      password: '',
      user: '',
    }
  },
  methods: {
    async login() {
      await this.$axios.$get('/sanctum/csrf-cookie')
      try {
        this.$auth
          .loginWith('laravelSanctum', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then((response) => {
            console.log('Response is' + response)
            console.log(response)
            console.dir(response)
          })
          .catch((error) => {
            console.log(error)

            console.log('err onRejected')

            // this.alert = ''
            // this.error_msg = error.response.data
          })
      } catch (error) {
        console.log(error.response.data)
        if (error.response.status === 422) console.log(error.response.data)
      }
      // console.log(api)
      // alert('To be implemented')
    },
  },
}
</script>
