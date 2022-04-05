<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit()">
      <v-text-field label="Username" v-model="username" dense outlined></v-text-field>
      <v-text-field label="Password" type="password" v-model="password" dense outlined></v-text-field>
      <div class="right">
        <v-btn color="primary" type="submit">Log In</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  middleware: ['no-auth'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const success = await this.$store.dispatch('users/loginUser', {
        username: this.username,
        password: this.password
      })
      if (success) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .container > div {
    max-width: 500px;
    margin: 0 auto;
  }
  .right {
    text-align: right;
  }
</style>