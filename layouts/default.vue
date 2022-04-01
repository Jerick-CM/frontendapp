<template>
  <v-app dark>
    <v-app-bar fixed app>
      <!-- <div
        plain
        text
        class="hidden-md-and-up font-kalamreg hand"
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon color="green" x-large>mdi-message-arrow-left</v-icon> Menu
      </div> -->
      <v-spacer />
      <v-spacer />

      <!-- <div class="hidden-sm-and-down">
        <v-icon color="blue" @click.stop="rightDrawer = !rightDrawer"
          >mdi-page-next-outline</v-icon
        >
        <v-btn plain text tile class="blue--text pa-1 ma-1 mr-10" to="/">
          <v-img src="" width="4rem"></v-img>
        </v-btn>

        <v-btn
          v-for="(item, i) in navlist"
          :key="i"
          :to="item.link"
          plain
          text
          tile
          rounded
          class="pa-1 ma-1"
        >
          <v-icon>{{ item.icons }}</v-icon> {{ item.label }}
        </v-btn> -->

      <!-- <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="blue">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in more"
              :key="index"
              :to="item.link"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

      <!-- </div> -->

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
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <Nav
          :dialog_login="dialog_login"
          :search="search"
          @update-login="updateLogin"

        />
      </v-list>

    </v-navigation-drawer> -->

    <FooterNav />

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { navlist } from '~/mixins/navlist.js'

export default {
  name: 'DefaultLayout',
  mixins: [navlist],
  data() {
    return {
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
  },
}
</script>
