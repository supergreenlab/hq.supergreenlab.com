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
    <div :id='$style.pic' :style='{"background-image": `url(${filePath})`}' />
  </section>
</template>

<script>
import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'
import axios from 'axios'

export default {
  props: ['timelapse', 'dragged',],
  data() {
    return {
      video: null,
      filePath: null,
      loading: true,
    }
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
      this.$store.commit('dashboard/addCachedPic', {url, pic})
    } catch(e) {
      console.log(e)
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
  width: 400px
  height: 300px
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  border-radius: 5px

</style>
