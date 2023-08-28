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
    <div :id='$style.body'>
      <h2>Collection Info</h2>
      <CollectionInfos :collection='collection' :onChange='c => this.$data.collection = c' />
      <div :id='$style.seeds'>
        <h2>Seeds</h2>
        <div v-for='(seed, i) in checklistSeeds' :key='seed.id' :class='$style.seed' @click='() => $router.push(`/checklistseed/${seed.id}`)'>
          <div :class='$style.info'>
            <div>
              <h3>{{ i+1 }}. {{ seed.title }}</h3>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ seed.description }}
            </div>
            <div>
              <a href='javascript:void(0)' @click='(e) => onRemove(e, seed.id)'>Remove</a>&nbsp;
              <a href='javascript:void(0)'>View</a>
            </div>
          </div>
          <div :class='$style.config'>
            <h4>Conditions</h4>
            <div v-for='c in conditions(seed)' :class='$style.condaction' v-html='Object.keys(c).map((k) => `<b>${k}</b>: ${c[k]}`).join("<br />")'></div>
            <h4>Exit Conditions</h4>
            <div v-for='c in exitConditions(seed)' :class='$style.condaction' v-html='Object.keys(c).map((k) => `<b>${k}</b>: ${c[k]}`).join("<br />")'></div>
            <h4>Actions</h4>
            <div v-for='c in actions(seed)' :class='$style.condaction' v-html='Object.keys(c).map((k) => `<b>${k}</b>: ${c[k]}`).join("<br />")'></div>
          </div>
          <div :class='$style.separator'></div>
        </div>
      </div>
      <div :id='$style.button'>
        <nuxt-link :to='`/checklistseed/${collection.id}_new`' :class='!collection.id ? $style.disabled : ""'>+ Add checklist seed</nuxt-link>
      </div>
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
    if (this.$props.collectionID != 'new') {
      this.loadChecklistSeeds()
    }
  },
  computed: {
    conditions() {
      return (checklistSeed) => {
        return JSON.parse(checklistSeed.conditions)
      }
    },
    exitConditions() {
      return (checklistSeed) => {
        return JSON.parse(checklistSeed.exitConditions)
      }
    },
    actions() {
      return (checklistSeed) => {
        return JSON.parse(checklistSeed.actions)
      }
    },
  },
  methods: {
    async loadChecklistSeeds() {
      const { token } = this.$store.state.auth
      const { data: { checklistseeds: checklistSeeds } } = await axios.get(`${API_URL}/checklistcollection/${this.$props.collectionID}/seeds`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      this.$data.checklistSeeds = checklistSeeds
    },
    async onRemove(e, checklistSeedID) {
      e.stopPropagation()
      e.preventDefault()

      const c = confirm("Are you sure?")
      if (!c) {
        return
      }

      const { token } = this.$store.state.auth
      await axios.delete(`${API_URL}/checklistseed/${checklistSeedID}`, {
        headers: {'Authorization': `Bearer ${token}`}
      })

      this.loadChecklistSeeds()
    },
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

#body
  display: flex
  flex-direction: column
  background-color: white
  padding: 10px 15px
  padding-bottom: 60px

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
  max-width: 790px
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

#seeds
  margin: 10px 0

.seed
  display: flex
  flex-direction: column
  cursor: pointer
  margin-bottom: 10px

.info
  display: flex
  justify-content: space-between
  align-items: center
  padding: 20px 10px
  cursor: pointer

.info h3
  color: #3bb30b
  margin-bottom: 5px

.seed:hover
  background-color: #fafafa

.config
  margin: 0 30px 20px 30px

.config > h4
  margin: 20px 0 5px 0

.separator
  border: 2px dashed #dedede

.condaction
  margin: 5px 0 10px 10px
  border-bottom: 1px solid #ababab
  padding-bottom: 5px

</style>
