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
    <div :id='$style.title'>{{ plant.name }}</div>
    <div :id='$style.body'>
      <div :id='$style.pic' :style='{"background-image": `url(${filePath})`}'></div>
      <div :id='$style.labels'>
        <b>PLANT INFORMATION</b>
        <div :class='$style.label'>
          <PlantLabel color='#BA9650' :icon='require("~/assets/img/dashboard/icon_seeds.jpg")' :title='plant.settings.strain'>
            <template v-slot:left><div :id='$style.seedbank'>from <b>{{ plant.settings.seedBank }}</b></div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#5F5F5F' :icon='require("~/assets/img/archives/icon_plant_type.svg")' title='Plant type'>
            <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.plantType }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#51220E' :icon='require("~/assets/img/archives/icon_medium.svg")' title='Medium'>
            <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.medium }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#20BBDD' :icon='require("~/assets/img/archives/icon_dimensions.svg")' title='Box dimensions'>
            <template v-slot:left><div :id='$style.seedbank'>{{ plant.box.settings.width }}x{{ plant.box.settings.height }}x{{ plant.box.settings.depth }}{{ plant.box.settings.unit }}</div></template>
          </PlantLabel>
        </div>
      </div>
      <div :id='$style.labels'>
        <b>LIFE EVENT DATE</b>
        <div :class='$style.label'>
          <PlantLabel color='#3BB30B' :icon='require("~/assets/img/archives/icon_germination_date.svg")' title='germination'>
          <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.germinationDate }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#FAC13C' :icon='require("~/assets/img/archives/icon_vegging_since.svg")' title='germination'>
          <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.veggingStart }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#E859DA' :icon='require("~/assets/img/archives/icon_blooming_since.svg")' title='germination'>
          <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.bloomingStart }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#7E7CE3' :icon='require("~/assets/img/archives/icon_drying_since.svg")' title='germination'>
          <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.dryingStart }}</div></template>
          </PlantLabel>
        </div>
        <div :class='$style.label'>
          <PlantLabel color='#7E7CE3' :icon='require("~/assets/img/archives/icon_curing_since.svg")' title='germination'>
          <template v-slot:left><div :id='$style.seedbank'>{{ plant.settings.curingStart }}</div></template>
          </PlantLabel>
        </div>
      </div>
      <div :id='$style.buttons' @mousedown='mouseDown'>
        <Cta :to='`/plant/${plant.id}`' title='View plant' />
      </div>
    </div>
  </section>
</template>

<script>

import load from '~/mixins/load.js'

export default {
  props: ['plant',],
  mixins: [load,],
  mounted() {
    this.loadPic()
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
  width: 100%
  display: flex
  flex-direction: column
  background-color: white
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
  border-radius: 5px

#body
  display: flex

#pic
  width: 300px
  height: 300px
  background-size: cover
  background-position: center
  background-repeat: no-repeat

#labels
  flex: 1
  display: flex
  flex-direction: column
  margin: 0 20px 10px 20px
  color: #454545

.label
  margin: 10px 0 10px 0

#buttons
  display: flex
  align-items: center
  justify-content: center
  width: 200px

</style>
