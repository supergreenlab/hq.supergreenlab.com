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
    <img :src='`https://storage.supergreenlab.com${user.pic}`' width='50pt' height='50pt' />
    {{ user.nickname }}
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.me
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  color: white
  padding: 10pt
  font-weight: bold

#container > img
  border-radius: 25pt
  margin-bottom: 10pt

</style>
