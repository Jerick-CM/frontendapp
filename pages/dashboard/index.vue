<template>
  <v-app id="inspire">
    <!-- <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>[ {{ this.$auth.$state['user'].name }} ]</div>
        <div>{{ this.$auth.$state['user'].email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <highchart :options="pieoptions" />
          </v-col>
          <v-col>
            <highchart :options="lineoptions" />
          </v-col>
        </v-row>
        <v-row> </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
var pieoptions = {
  chart: {
    renderTo: 'container',
    type: 'pie',
  },
  series: [
    {
      name: 'Line Chart',
      data: [1, 2, 3, 4],
    },
  ],
}
var lineoptions = {
  chart: {
    renderTo: 'container',
    type: 'line',
  },
  series: [
    {
      name: 'Line Chart',
      data: [10, 20, 30, 40],
    },
  ],
}
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Dashboard'],
      ['mdi-send', 'Users'],
      ['mdi-delete', 'Logs'],
      ['mdi-alert-octagon', 'Admin'],
    ],
  }),
  async created() {
    this.pieoptions = pieoptions
    this.lineoptions = lineoptions
  },
  computed: {
    email() {
      return this.$auth.$state['user'].email
    },
  },
}
</script>
