<template>
  <v-footer color="primary lighten-1">
    <v-card
      color="dark"
      flat
      tile
      width="100%"
      class="primary lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn target="_blank" href="#" class="mx-4" icon>
          <v-icon size="24px" class=""> mdi-twitter </v-icon>
          <v-icon small color="">mdi-arrow-top-right-thick</v-icon>
        </v-btn>
        <v-btn target="_blank" href="#" class="mx-4" icon>
          <v-icon size="24px" class=""> mdi-facebook </v-icon>
          <v-icon small color="blue">mdi-arrow-top-right-thick</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-btn
          v-for="(item, i) in footerlist"
          :to="item.link"
          :key="i"
          plain
          text
          tile
          rounded
          class="ma-2"
          ><v-icon>{{ item.icon }}</v-icon
          >&zwnj;&zwnj; {{ item.label }}
        </v-btn>
      </v-card-text>

      <v-card-text class="pt-0">
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="darkMode">
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode On</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="darkMode">
              <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode Off</span>
        </v-tooltip>
      </v-card-text>
      <!-- <v-card-text class="d-flex justify-center mb-6" color="info">
      </v-card-text> -->
      <v-card-text class="pt-0" color="info">
        All rights reserved.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="pt-0">
        March 2022 - Present
        {{ new Date().getFullYear() }} —
        <strong>I.T. OFFICE</strong>
      </v-card-text>

      <v-btn
        v-scroll="onScroll"
        v-show="gototop"
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up-bold-hexagon-outline</v-icon>
      </v-btn>
    </v-card>
  </v-footer>
</template>

<script>
import { nav_footer } from '~/mixins/nav_footer.js'
export default {
  mixins: [nav_footer],
  data: () => ({
    gototop: false,
    selectedItem: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
  }),
  computed: {},
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.gototop = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
