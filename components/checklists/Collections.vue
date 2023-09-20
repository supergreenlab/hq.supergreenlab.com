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
    <div v-for="collection in collections" :class='$style.collection'>
      <h2>{{ collection.title }}</h2>
      <p>{{ collection.description }}</p>
      <nuxt-link :to='`/collection/${collection.id}`'>View</nuxt-link>
    </div>
    <nuxt-link :to='`/collection/new`'>Add new collection</nuxt-link>
  </section>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch('checklists/loadCollections')
  },
  computed: {
    collections() {
      return this.$store.state.checklists.collections
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  user-select: none

.collection
  margin: 10px 20px

</style>
