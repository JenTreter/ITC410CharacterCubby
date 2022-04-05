<template>
  <div>
      <v-btn v-if="isAuthenticated" @click="logout()">Log Out</v-btn>
      <v-btn v-else @click="login()">Log In</v-btn>
  </div>

</template>

<script>
export default {
  name: 'IndexPage',

  methods: {
    login () {
      this.$store.dispatch('users/loginUser', {
        username: 'JellyCat',
        password: 'jumpingjellybeans8!'
      })
    },
    logout () {
      this.$store.dispatch('users/logoutUser')
    }
  },

  computed: {
    user () {
      return this.$store.state.users.user
    },
    isAuthenticated () {
      return this.user !== null
    }
  }
}
</script>
