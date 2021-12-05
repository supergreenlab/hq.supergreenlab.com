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
    <div :id='$style.pic' :style='{"background-image": `url(${filePath})`}' />
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['timelapse'],
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
      const { data } = await axios.get(`${API_URL}/timelapse/${timelapse.id}/latest`, {
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
      this.$data.filePath = `data:image/gif;base64,${Buffer.from(dataOverlay, 'binary').toString('base64')}`
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

#pic
  width: 300px
  height: 200px
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  border-radius: 5px

</style>
