<template>

  <v-app dark>

    <v-app-bar fixed app>

      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />

      <div class="hidden-sm-and-down">
        <!-- <v-btn
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          @click.prevent="searchme"
        >
          <v-icon v-if="search == false">mdi-magnify-plus</v-icon>
          <v-icon v-else>mdi-magnify-minus</v-icon>

          Search</v-btn
        > -->

        <v-btn
          v-if="$auth.user && $auth.loggedIn && $auth.user['is_admin'] == '1'"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          to="/admin"
        >
          <v-icon>mdi-account-tie</v-icon>
          Admin</v-btn
        >

        <v-btn
          v-if="$auth.loggedIn"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          to="/dashboard"
        >
          <v-icon>mdi-monitor-dashboard</v-icon>
          Dashboard</v-btn
        >

        <v-btn
          v-if="$auth.loggedIn"
          @click.prevent="logout()"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
        >
          <v-icon>mdi-logout</v-icon>
          Logout</v-btn
        >

        <v-btn
          v-if="!$auth.loggedIn"
          @click.prevent="dialog_login = true"
          plain
          tile
          rounded
          class="pa-1 ma-1"
        >
          <v-icon>mdi-logout</v-icon>
          Login</v-btn
        >
      </div>
      <v-spacer />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <Nav
          :dialog_login="dialog_login"
          :search="search"
          @update-login="updateLogin"
        />
      </v-list>
    </v-navigation-drawer>

    <FooterNav />
  </v-app>
</template>

<script>
import { navlist } from '~/mixins/navlist.js'

export default {
  name: 'DefaultLayout',
  mixins: [navlist],
  data() {
    return {
      search: '',
      dialog_login: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    updateLogin(value) {
      this.dialog_login = value
    },
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
