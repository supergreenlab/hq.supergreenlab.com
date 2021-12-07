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
    <div :id='$style.name'>{{ plant.name }}</div>
    <div :id='$style.pic' :style='{"background-image": `url(${filePath})`}'></div>
    <div :class='$style.label'>
      <PlantLabel color='#BA9650' :icon='require("~/assets/img/dashboard/icon_seeds.jpg")' title='White widow'>
        <template v-slot:left>pouet</template>
        <template v-slot:right>pouet2</template>
      </PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#0BB3A9' :icon='require("~/assets/img/dashboard/icon_environment.jpg")' title='Environment'>toto</PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#506EBA' :icon='require("~/assets/img/dashboard/icon_watering.jpg")' title='Latest watering'>toto</PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#6BBA50' :icon='require("~/assets/img/dashboard/icon_schedules.jpg")' title='Schedules'>toto</PlantLabel>
    </div>
    <div :id='$style.buttons' @mousedown='mouseDown'>
      <nuxt-link :id='$style.button' to='/'><b>View plant</b></nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['plant'],
  data() {
    return {
      filePath: null,
      loading: true,
    }
  },
  async mounted() {
    const { token } = this.$store.state.auth
    const API_URL = process.env.API_URL
    try {
      const url = `${API_URL}/feedMedias?feedid=${this.$props.plant.feedID}&deleted=false&limit=1`
      const cachedPic = this.$store.state.dashboard.cachedPics[url]
      if (cachedPic) {
        this.$data.filePath = cachedPic
        return
      }

      this.$data.loading = true
      const { data: { feedmedias } } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (feedmedias.length == 0) {
        return
      }
      const pic = `https://storage.supergreenlab.com${feedmedias[0].thumbnailPath}`
      this.$data.filePath = pic
      this.$store.commit('dashboard/addCachedPic', {url, pic})
    } catch(e) {
      console.log(e)
    }
    this.$data.loading = false
  },
  methods: {
    mouseDown(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return false
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  background-color: white
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
  padding: 5px
  border-radius: 5px

#name
  text-transform: uppercase
  font-weight: bold
  color: #454545
  margin: 10px 0 10px 0

#pic
  width: 250px
  height: 200px
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  border-radius: 5px

.label
  margin: 10px 0 10px 0

#buttons
  display: flex
  justify-content: flex-end

#button
  display: block
  background-color: #3BB30B
  text-align: center
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  white-space: nowrap
  transition: opacity 0.2s
  text-transform: uppercase
  @media only screen and (max-width: 1000px)
    padding: 7pt 22pt
    font-size: 1.1em

#button
  padding: 6pt 18pt
  font-size: 1em
  border-radius: 4pt

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

</style>
