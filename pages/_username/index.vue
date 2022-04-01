<template>
  <v-container fluid class="">
    <v-row class="mb-5 pb-5">
      <v-container>
        <v-row>
          <v-col class="mb-0 pb-0">
            <v-container>
              <v-row>
                <v-col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="8"
                  xl="8"
                  cols="12"
                  class="pa-0 ma-0"
                >
                  <v-container class="mr-0 pr-0 tag-border">
                    <v-row>
                      <v-col class="mr-2">
                        <h1>Profile Username : {{ username }}</h1>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="4"
                  xl="4"
                  cols="12"
                  class="pa-0 ma-0"
                >
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <Services />
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Profile ' + this.username,
      meta: [
        {
          hid: 'Profile',
          name: 'Profile',
          content: 'Profile',
        },
      ],
    }
  },

  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      loading: false,
      profile: [],
      selection: 0,
      content: [],
      length: null,
      loading: false,
      page: 2,
      transparent: 'rgba(255, 255, 255, 0)',
      blogs_load: false,
      news_load: false,
      posts_load: false,
      selection: 0,
      content: [],
      news: [],
      posts: [],
      nuxt: [],
      selectedItem: 0,
      show: true,
      title: '',
      model: 6,
      rounded: ['0', 'sm', 'md', 'lg', 'xl', 'pill', 'circle'],
      links: [],

      posts_content: 0,
      news_content: 0,

      tags: [],
      load_tags: false,
      total_tags: 0,
      height: '200px',
      blogs_load: false,
      blogs_content: [],
      blogs_total: 0,

      nuxt: [],
      laravel: [],
      vue: [],
      load_nuxt: false,
      load_laravel: false,
      load_vue: false,

      show_nuxt: false,
      show_laravel: false,
      show_vue: false,
      blogs_in_random: [],
      blogs_in_latest: [],
    }
  },
  async fetch() {},
  async watch() {},
  async asyncData({ $axios, error, params }) {},
  computed: {
    username() {
      return this.$route.params.username
    },
  },
  methods: {},
  async mounted() {},
  components: {},
  watch: {},
}
</script>
<style scoped>
ul.clean {
  list-style: none !important;
  list-style-type: none !important;
}
.dont-break-out {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
.font-lulu {
  font-family: 'Lulu', sans-serif;
}
.font-halimun {
  font-family: 'Halimun', sans-serif;
}
/* .font-kalamreg {
  font-family: 'Kalam-Regular', sans-serif;
  line-height: 1.2;
} */
.font-barlowreg {
  font-family: 'Barlow-Regular', sans-serif;
}

.title1 {
  text-decoration: none;
}
.v-application a {
  color: rgb(66, 77, 238);
  text-decoration: none;
}

.adj-title {
  min-height: 2rem;
  line-height: 1rem;
  margin: 0px;
  padding: 0px;
}

.hr-blue {
  border: 3px solid blue;
}
.hr-red {
  border: 3px solid red;
}
.hr-orange {
  border: 3px solid orange;
}
.hr-black {
  border: 3px solid black;
}
ul.clean {
  list-style: none !important;
  list-style-type: none !important;
}
.text-justify {
  text-align: justify;
  text-justify: inter-word;
}
.hr-brown {
  border: 3px solid brown;
}
.tag-border {
  border-right: 0.4rem solid #add8e6;
  border-top: 0.4rem solid #add8e6;
}
</style>
