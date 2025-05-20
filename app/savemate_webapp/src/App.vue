<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <template v-if="!isAuthenticated">
        <v-btn router-link to="/login" text>
          <span class="mr-2">Login Account</span>
          <v-icon>mdi-lock</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left>mdi-account-circle</v-icon> Profile
            </v-btn>
          </template>
          <v-list>
            <v-list-item router-link to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item router-link to="/settings">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <SideDrawer />
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import '@/assets/fonts.css'
import SideDrawer from './components/SideDrawer.vue'

export default {
  name: 'App',
  components: {
    SideDrawer
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Kumbh Sans', sans-serif !important;
}

.v-card-title,
.v-card-text,
.v-btn,
h1, h2, h3, h4, h5, h6,
p {
  font-family: 'Kumbh Sans', sans-serif !important;
}

.v-card-title,
.v-card-text,
.v-btn,
.v-list-item-title,
.v-list-item-subtitle,
h1, h2, h3, h4, h5, h6,
.display-2,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6,
.subtitle-1 {
  font-family: 'Kumbh Sans', sans-serif !important;
}
</style>
