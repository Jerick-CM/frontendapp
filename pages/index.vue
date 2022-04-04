<template>
  <v-container fluid>
    <v-row>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card fluid
              class="d-flex align-stretch"
              color="grey lighten-2"
              flat
              height="850"
              tile
            >
              <!-- Top Page -->
              <v-img
                max-height="1500"
                aspect-ratio="1.7"
                src="/images/Malolos_City_Hall.jpg"
              >
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- <v-row>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card
              class="d-flex align-stretch"
              color="grey lighten-2"
              flat
              height="500"
              tile
            >
              Mid Page
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row> -->
    <!-- <v-row>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card
              class="d-flex align-stretch"
              color="grey lighten-2"
              flat
              height="500"
              tile
            >
              Bottom Page
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  props: [],
  layout: 'default',
  head() {
    return {
      title: 'Homepage ',
      meta: [
        {
          hid: 'Homepage ',
          name: 'Homepage ',
          content: 'IT OFFICE OFFICIAL HOMEPAGE',
        },
      ],
    }
  },
}
</script>

<style scoped>
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
