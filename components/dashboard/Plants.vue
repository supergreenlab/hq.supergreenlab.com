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
    <SectionTitle :icon='require("~/assets/img/dashboard/icon_plants.svg")' title='Plants' />
    <div :id='$style.plants'>
      <div :class='$style.plant' v-for='p in plants' :key='p.id'>
        <Plant :plant='p' />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    plants() {
      return this.$store.state.lab.plants.filter(p => !p.archived)
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#plants
  display: flex
  margin: 10px
  flex-wrap: wrap

.plant
  display: flex

</style>
