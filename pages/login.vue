<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <section :id="$style.container">
    <form @submit='loginHandler'>
      <div :id='$style.body'>
        <div :id='$style.title'>S<span :id='$style.green'>G</span>L LOGIN</div>
        <div :id='$style.fields'>
          <input type='text' placeholder='Login' v-model='login' @change=''/>
          <input type='password' placeholder='Password' v-model='password' />
        </div>
        <div>
          <recaptcha
              v-if='!token'
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
              />
        </div>
        <div :id='$style.app'>No account yet? create one on the <a target='_blank' href='https://www.supergreenlab.com/app'>sgl app</a></div>
        <span :id='$style.error' v-if='error'>Wrong login/password</span>
        <div :id='$style.button'>
          <button @click='loginHandler'>LOGIN</button>
        </div>
        <div v-if='loading' :id='$style.loading'>Loading...</div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      token: '',
      loadingCaptcha: false,
    }
  },
  watch: {
    loggedIn(val) {
      if (val == true) {
        this.$router.replace(this.$route.query.r || '/')
      }
    },
  },
  async mounted() {
    try {
      setTimeout(() => {
        this.$recaptcha.init()
      }, 500)
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    loginHandler(e) {
      e.preventDefault()
      e.stopPropagation()
      const { login, password, token } = this.$data
      this.$store.dispatch('auth/login', { login, password, token })
      return false
    },
    onError() {
    },
    async onSuccess() {
      console.log('1')
      if (this.$data.loadingCaptcha) {
        return
      }
      this.$data.loadingCaptcha = true
      const token = await this.$recaptcha.getResponse()
      console.log('pouet: ', token)
      this.$recaptcha.destroy()
      this.$data.token = token
    },
    onExpired() {
    },
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    error() {
      return this.$store.state.auth.error
    },
  },
}
</script>

<style module lang=stylus>
#container
  display: flex
  height: 100vh
  justify-content: center
  align-items: center

#body
  position: relative
  display: flex
  flex-direction: column

#body > input
  margin: 3pt 0
  padding: 3pt 6pt

#green
  color: #3bb30b

#title
  color: #454545
  font-weight: bold

#button
  display: flex
  justify-content: flex-end
  align-items: flex-end
  padding: 15pt 0 0 0

#button > button
  border: none
  color: white
  border-radius: 2.5px
  background-color: #3bb30b
  padding: 2pt 20pt
  cursor: pointer

#button > button:hover
  background-color: #4bc31b

#button > button:active
  background-color: #2ba300

#error
  color: red

#app
  color: #454545

#loading
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(255, 255, 255, 0.5)
  top: 0
  left: 0
  width: 100%
  height: 100%
  color: #454545
  font-weight: bold

#fields
  display: flex
  flex-direction: column

#fields > input
  margin: 5px 0
  padding: 5px

</style>
