<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <section :id='$style.container'>
    <img :id='$style.logo' src='~/assets/img/logo.svg' />
    <div :id='$style.separator'></div>
    <LeftBarItem :icon='require("~/assets/img/icon_dashboard.svg")' title='Dashboard' to='/' />
    <LeftBarItem :icon='require("~/assets/img/icon_archives.svg")' title='Archives' to='/archives' />
    <LeftBarItem v-if='isSGL' :icon='require("~/assets/img/icon_checklist.svg")' title='Checklist' to='/collections' />
    <div :id='$style.spacer'></div>
    <User />
  </section>
</template>

<script>
export default {
  computed: {
    isSGL() {
      return process.env.NODE_ENV == "development" || (this.$store.state.auth.loggedIn && this.$store.state.auth.me.id=='9dade237-135b-4ee3-8c85-a60a03b1d84d')
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  background-color: #454545

#logo
  padding: 10pt

#separator
  background-color: white
  height: 2px
  width: 100%
  margin: 10pt 0

#spacer
  flex: 1

</style>
