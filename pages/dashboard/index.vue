<template>
  <v-app id="dashboard">
    <!-- <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar color="blue" size="64" class="mb-4 white--text">
          {{ this.$auth.$state['user'].name.charAt(0).toUpperCase() }}
        </v-avatar>

        <div>[ {{ this.$auth.$state['user'].name }} ]</div>
        <div>{{ this.$auth.$state['user'].email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          link
          :to="to"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-main> -->
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="6" md="4">
          <v-card elevation="9" outlined
            ><highchart :options="pieoptions"
          /></v-card>
        </v-col>
        <v-col cols="12" lg="6" md="4">
          <v-card elevation="9" outlined>
            <highchart :options="lineoptions"
          /></v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="6" md="4">
          <v-card elevation="9" outlined
            ><highchart :options="baroptions"
          /></v-card>
        </v-col>
        <v-col cols="12" lg="6" md="4">
          <v-card elevation="9" outlined>
            <highchart :options="splineoptions"
          /></v-card>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </v-container>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
var pieoptions = {
  chart: {
    renderTo: 'container',
    type: 'pie',
    title: 'Pie',
  },
  title: {
    text: 'Pie',
  },
  series: [
    {
      name: 'Line Chart',
      data: [1, 2, 3, 4],
    },
  ],
  credits: {
    enabled: false
  },
}
var lineoptions = {
  chart: {
    renderTo: 'container',
    type: 'line',
  },
  title: {
    text: 'Line',
  },
  series: [
    {
      name: 'Line Chart',
      data: [10, 20, 30, 40],
    },
  ],
  credits: {
    enabled: false
  },
}

var baroptions = {
  chart: {
    renderTo: 'container',
    type: 'bar',
    title: 'Pie',
  },
  title: {
    text: 'Bar',
  },
  series: [
    {
      name: 'Line Chart',
      data: [1, 2, 3, 4],
    },
  ],
  credits: {
    enabled: false
  },
}

var splineoptions = {
  chart: {
    renderTo: 'container',
    type: 'area',
  },
  title: {
    text: 'Area',
  },
  series: [
    {
      name: 'Line Chart',
      data: [10, 20, 30, 40],
    },
  ],
  credits: {
    enabled: false
  },
}

export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Dashboard', '/dashboard'],
      ['mdi-send', 'Users', '/dashboard/user'],
      ['mdi-delete', 'Logs', '/admin/logs'],
      ['mdi-alert-octagon', 'Admin'],
    ],
  }),
  async created() {
    this.pieoptions = pieoptions
    this.lineoptions = lineoptions

    this.baroptions = baroptions
    this.splineoptions = splineoptions
  },
  computed: {
    email() {
      return this.$auth.$state['user'].email
    },
  },
  methods: {},
}
</script>
