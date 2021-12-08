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
      <PlantLabel color='#BA9650' :icon='require("~/assets/img/dashboard/icon_seeds.jpg")' :title='plant.settings.strain'>
        <template v-slot:left><div :id='$style.seedbank'>from <b>{{ plant.settings.seedBank }}</b></div></template>
      </PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#0BB3A9' :icon='require("~/assets/img/dashboard/icon_environment.jpg")' title='Environment'>
        <template v-slot:left>
          <div :id='$style.environment'>
            <div :class='$style.metric' :style='{color: "green"}'>
              <img src='~/assets/img/dashboard/icon_temperature.png' /> {{ metrics.temperature }}°
            </div>
            <div :class='$style.metric' :style='{color: "red"}'>
              <img src='~/assets/img/dashboard/icon_humidity.png' /> {{ metrics.humidity }}%
            </div>
          </div>
        </template>
        <template v-slot:right>
          <div :id='$style.daystatus' :style='{color: "green"}'>
            <img src='~/assets/img/dashboard/icon_sunny.png' />
            Sunny
          </div>
        </template>
      </PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#506EBA' :icon='require("~/assets/img/dashboard/icon_watering.jpg")' title='Latest watering'>
        <template v-slot:left>
          <div :id='$style.lastwatering'>{{ parseInt(((new Date()) - Date.parse(lastWatering.date)) / 1000 / 60 / 60 / 24) }} days {{ parseInt((((new Date()) - Date.parse(lastWatering.date)) / 1000 / 60 / 60) % 24) }} hours</div>
        </template>
      </PlantLabel>
    </div>
    <div :class='$style.label'>
      <PlantLabel color='#6BBA50' :icon='require("~/assets/img/dashboard/icon_schedules.jpg")' title='Schedules'>
        <template v-slot:left>
          {{ schedules }}
        </template>
      </PlantLabel>
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
      loadingPic: true,

      metrics: {},
      loadingMetrics: true,

      lastWatering: {},
      loadingLastWatering: true,
    }
  },
  mounted() {
    this.loadLastWatering()
    this.loadMetrics()
    this.loadPic()
  },
  computed: {
    schedules() {
      const { plant } = this.$props
      if (!plant.box.settings) {
        return 'Not set'
      }

      const on_hour = (plant.box.settings.schedules[plant.box.settings.schedule] || {}).ON_HOUR
      const on_min = (plant.box.settings.schedules[plant.box.settings.schedule] || {}).ON_MIN
      const off_hour = (plant.box.settings.schedules[plant.box.settings.schedule] || {}).OFF_HOUR
      const off_min = (plant.box.settings.schedules[plant.box.settings.schedule] || {}).OFF_MIN

      return `From ${on_hour.toString().padStart(2, '0')}:${on_min.toString().padStart(2, '0')} to ${off_hour.toString().padStart(2, '0')}:${off_min.toString().padStart(2, '0')}`
    },
  },
  methods: {
    mouseDown(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return false
    },

    async loadLastWatering() {
      const { token } = this.$store.state.auth
      const API_URL = process.env.API_URL

      try {
        const url = `${API_URL}/feedEntries?type=FE_WATER&feedid=${this.$props.plant.feedID}&limit=1`
        const cached = this.$store.state.dashboard.cached[url]
        if (cached) {
          this.$data.lastWatering = cached
          return
        }
        const { data: { feedentries } } = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        if (!feedentries.length) {
          return
        }

        this.$store.commit('dashboard/addCached', {key: url, item: feedentries[0]})
        this.$data.lastWatering = feedentries[0]
      } catch(e) {
        console.log(e)
      }
    },

    async loadMetrics() {
      const { token } = this.$store.state.auth
      const API_URL = process.env.API_URL

      if (!this.$props.plant.box.device) {
        this.$data.loadingMetrics = false
        return
      }

      try {
        const url = `${API_URL}/device/${this.$props.plant.box.deviceID}/params?params=BOX_${this.$props.plant.box.deviceBox}_TEMP&params=BOX_${this.$props.plant.box.deviceBox}_HUMI`
        const cached = this.$store.state.dashboard.cached[url]
        if (cached) {
          this.$data.metrics = cached
          return
        }

        this.$data.loadingMetrics = true
        const { data: { params, }, } = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        const metrics = {
          temperature: params[`${this.$props.plant.box.device.identifier}.KV.BOX_${this.$props.plant.box.deviceBox}_TEMP`],
          humidity: params[`${this.$props.plant.box.device.identifier}.KV.BOX_${this.$props.plant.box.deviceBox}_HUMI`],
        }
        this.$store.commit('dashboard/addCached', {key: url, item: metrics})
        this.$data.metrics = metrics
      } catch(e) {
        console.log(e)
      }
      this.$data.loadingMetrics = false
    },

    async loadPic() {
      const { token } = this.$store.state.auth
      const API_URL = process.env.API_URL
      try {
        const url = `${API_URL}/feedMedias?feedid=${this.$props.plant.feedID}&deleted=false&limit=1`
        const cached = this.$store.state.dashboard.cached[url]
        if (cached) {
          this.$data.filePath = cached
          return
        }

        this.$data.loadingPic = true
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
        this.$store.commit('dashboard/addCached', {key: url, item: pic})
      } catch(e) {
        console.log(e)
      }
      this.$data.loadingPic = false
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

#seedbank
  white-space: nowrap
  color: #454545

#environment
  display: flex

.metric
  display: flex
  align-items: center
  font-weight: bold
  font-size: 1.5em
  margin-right: 5px

.metric > img
  margin-right: 3px

#daystatus
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  font-weight: bold
  margin-right: 10px

#lastwatering
  font-family: Roboto
  font-weight: 300
  font-size: 1.3em
  color: #454545

</style>
