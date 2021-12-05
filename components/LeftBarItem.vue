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
  <section :id='$style.container' :class='selected ? $style.selected : ""'>
    <nuxt-link :to='to'>
      <img :src='icon' />
    </nuxt-link>
    <nuxt-link :to='to'>
      {{ title }}
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['icon', 'title', 'to'],
  computed: {
    selected() {
      return this.$route.path == this.$props.to
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  justify-content: center
  padding: 10pt 5pt
  margin: 0 5pt
  transition: background-color 0.3s

#container > a
  color: white
  text-decoration: none
  text-align: center

.selected
  background-color: rgba(255, 255, 255, 0.2)
  border-radius: 5pt
  font-weight: bold

</style>
