<template>
  <div align="center">
      <!-- <v-btn v-if="isAuthenticated" @click="logout()">Log Out</v-btn>
      <v-btn v-else @click="login()">Log In</v-btn> -->
      <p v-if="isAuthenticated">Welcome, {{username}}!</p>
      <!-- <random-word v-on:picker="picker" label="Current Nature"></random-word> -->
  </div>

</template>

<script>

// import RandomWord from '../components/RandomWord.vue'

export default {
  name: 'IndexPage',
  components: {
    // RandomWord
  },
   data () {
    const user = this.$store.state.users.user
    return user === null
      ? {
        // chosenNature: '',
        title: 'Create a New Account',
        name: '',
        username: '',
        password: ''
      }
      : {
        // chosenNature: '',
        title: 'Update your Account',
        name: user.name,
        username: user.username,
        password: ''
      }
    
  },

  methods: {
    login () {
      this.$store.dispatch('users/loginUser', {
        username: 'JellyCat',
        password: 'jumpingjellybeans8!'
      })
    },
    logout () {
      this.$store.dispatch('users/logoutUser')
    },
    // picker(chosenNature){
    //   this.chosenNature = chosenNature;
    // }
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
