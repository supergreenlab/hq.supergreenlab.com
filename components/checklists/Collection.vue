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
    <CollectionInfos :collection='collection' :onChange='c => this.$data.collection = c' />
    <ChecklistSeed v-for='seed in checklistSeeds' :key='seed.id' :seed='seed' />
    <div :id='$style.button'>
      <nuxt-link :to='`/checklistseed/${collection.id}_new`' :class='!collection.id ? $style.disabled : ""'>+ Add checklist seed</nuxt-link>
    </div>

    <div :id='$style.bottom'>
      <a href='javascript:void(0)' @click='onSave' :id='$style.save'>Save</a>
    </div>

  </section>
</template>

<script>

import axios from 'axios'

const API_URL=process.env.API_URL

export default {
  props: ['collectionID',],
  data() {
    return {
      collection: {},
      checklistSeeds: [],
    }
  },
  mounted() {
    this.$data.collection = this.$store.state.checklists.collections.find(c => c.id == this.$props.collectionID) || {}
  },
  computed: {
  },
  methods: {
    async onSave() {
      const { token } = this.$store.state.auth
      if (this.$data.collection.id) {
        await axios.put(`${API_URL}/checklistcollection`, this.$data.collection, {
          headers: {'Authorization': `Bearer ${token}`}
        })
      } else {
        const resp = await axios.post(`${API_URL}/checklistcollection`, this.$data.collection, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        this.$data.collection = Object.assign({}, this.$data.collection, {id: resp.data.id})
        this.$router.replace(`/collection/${resp.data.id}`)
      }
      this.$store.commit("checklists/setCollection", this.$data.collection)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#button
  display: flex
  justify-content: flex-end

#button > a
  background-color: #3bb30b
  padding: 10px 25px
  border-radius: 3px
  color: white
  text-decoration: none

#bottom
  display: flex
  align-items: center
  justify-content: flex-end
  position: absolute
  background-color: white
  bottom: 0
  left: 120px
  width: 100%
  max-width: 780px
  padding: 10px

#save
  background-color: #3bb30b
  padding: 6px 30px
  color: white
  text-decoration: none
  border-radius: 3px

.disabled
  background-color: #ababab !important
  pointer-events: none

</style>
