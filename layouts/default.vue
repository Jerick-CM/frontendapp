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
          v-if="$auth.user && $auth.loggedIn && $auth.user['is_admin'] == '1'"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          to="/admin/role"
        >
          <v-icon>mdi-abacus</v-icon>
          Roles</v-btn
        >
        <v-btn
          v-if="$auth.user && $auth.loggedIn && $auth.user['is_admin'] == '1'"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          to="/admin/logs"
        >
          <v-icon>mdi-abacus</v-icon>
          Logs</v-btn
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
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
          to="/dashboard/user"
        >
          <v-icon>mdi-monitor-dashboard</v-icon>
          user</v-btn
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
      <div class="hidden-md-and-up">
        <!-- class="pa-4 ml-5 mr-5" -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <!-- class="pr-4 pl-4 ml-5 mr-5" -->
            <v-btn v-bind="attrs" v-on="on"> Menu </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in Menu"
              :key="index"
              :to="item.link"
            >
              <v-list-item-title class="pr-5 pl-5 ml-5 mr-5">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$auth.loggedIn" @click.prevent="logout()">
              <v-icon>mdi-logout</v-icon>
              <v-list-item-title class="pr-5 pl-5 ml-5 mr-5"
                >Logout</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
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
      Menu: [
        { title: 'admin', link: 'admin' },
        { title: 'dashboard', link: '/dashboard' },
        { title: 'user', link: '/dashboard/user' },
        { title: 'logs', link: '/admin/logs' },
      ],
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
