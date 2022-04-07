<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" id="toolbar-title" />
      <v-btn text @click="$router.push('/')">Home</v-btn>
      <!-- <v-btn text @click="$router.push('/users')">Profile</v-btn> -->
      <v-spacer />
      <v-btn v-if="isAuthenticated" @click="logout()">Log Out</v-btn>
      <v-btn v-else @click="$router.push('/login')">Log In</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Character Cubby'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('users/logoutUser')
    }
  },
  computed: {
    isAuthenticated () {
      return this.user !== null
    },
    user () {
      return this.$store.state.users.user
    }
  }
}
</script>

<style scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>