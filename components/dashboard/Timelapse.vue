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
  <section :id='$style.container' :style='{opacity: dragged ? 0.8 : 1}'>
    <div :id='$style.pic' :style='{"background-image": `url(${filePath})`}'>
      <div v-if='(!livePic && loadingVideo) || (livePic && loadingPic)' :id='$style.loading'>
        Loading..
      </div>
      <video width='100%' height='100%' v-if='videoPath' autoplay loop playsinline muted defaultMuted :style='{opacity: livePic ? 0 : 1}' @loadeddata='videoLoadedData'>
        <source :src="videoPath" type="video/mp4">
      </video>
    </div>
    <div :id='$style.buttons' @mousedown='mouseDown'>
      <a href='javascript:void(0)' @click='setToday' :class='livePic ? $style.selected : ""'><img src='~/assets/img/dashboard/icon_today.svg' /> Today</a>
      <a href='javascript:void(0)' @click='setYesterday' :class='!livePic ? $style.selected : ""'><img src='~/assets/img/dashboard/icon_yesterday.svg' /> Yesterday</a>
    </div>
  </section>
</template>

<script>
import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'
import axios from 'axios'

export default {
  props: ['timelapse', 'dragged',],
  data() {
    return {
      loadingVideo: true,
      loadingPic: true,
      livePic: true,
      videoPath: null,
      filePath: null,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.$data.livePic = !this.$data.livePic
    }, 20000)
  },
  destroy() {
    clearInterval(this.interval)
  },
  async created() {
    const { timelapse } = this.$props
    const plant = this.$store.state.lab.plants.find(p => p.id == timelapse.plantID)
    const { token } = this.$store.state.auth
    const API_URL = process.env.API_URL
    try {
      const url = `${API_URL}/timelapse/${timelapse.id}/latest`
      const cachedPic = this.$store.state.dashboard.cachedPics[url]
      if (cachedPic) {
        this.$data.loadingPic = false
        this.$data.filePath = cachedPic
        return
      }
      const { data } = await axios.get(url, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      const { data: dataOverlay } = await axios.post(`${API_URL}/sgloverlay`, {
        box: Object.assign({}, plant.box, {settings: JSON.stringify(plant.box.settings), device: undefined,}),
        plant: Object.assign({}, plant, {settings: JSON.stringify(plant.settings), box: undefined, timelapses: undefined,}),
        meta: JSON.parse(data.meta),
        url: `https://storage.supergreenlab.com${data.filePath}`,
        host: "storage.supergreenlab.com",
      }, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const pic = `data:image/gif;base64,${Buffer.from(dataOverlay, 'binary').toString('base64')}`
      this.$data.filePath = pic
      this.$data.loadingPic = false
      this.$store.commit('dashboard/addCachedPic', {url, pic})
    } catch(e) {
      console.log(e)
    }

    try {
      const { data: { feedentries } } = await axios.get(`${API_URL}/feedEntries?type=FE_TIMELAPSE&feedid=${timelapse.plant.feedID}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      const { data: { feedmedias } } = await axios.get(`${API_URL}/feedMedias?feedentryid=${feedentries[0].id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      this.$data.videoPath = `https://storage.supergreenlab.com${feedmedias[0].filePath}`
    } catch(e) {
      console.log(e)
    }
  },
  methods: {
    videoLoadedData(e) {
      this.$data.loadingVideo = false
    },
    mouseDown(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return false
    },
    setToday(e) {
      clearInterval(this.interval)
      this.$data.livePic = true
    },
    setYesterday(e) {
      clearInterval(this.interval)
      this.$data.livePic = false
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  transition: opacity 0.3

#pic
  position: relative
  width: 400px
  height: 300px
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  border-radius: 5px

#buttons
  display: flex
  margin: 5px 0 0 0

#buttons > a
  display: block
  text-decoration: none
  margin-right: 5px
  color: #454545
  border-bottom: 2px solid #bcbcbc

.selected
  border-bottom: 2px solid #3bb30b !important

#loading
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  font-weight: bold
  background-color: rgba(255, 255, 255, 0.3)

</style>
