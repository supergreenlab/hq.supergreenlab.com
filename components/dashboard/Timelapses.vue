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
    <SectionTitle :icon='require("~/assets/img/dashboard/icon_liveviews.svg")' title='Live views' />
    <div :id='$style.timelapses'>
      <div :class='$style.timelapse' v-for='t in timelapses' :key='t.id'>
        <Timelapse :timelapse='t' />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    timelapses() {
      return this.$store.state.lab.timelapses.filter(t => !t.plant.archived)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#timelapses
  display: flex
  margin: 10px
  flex-wrap: wrap

.timelapse
  display: flex
  margin: 10px

</style>
