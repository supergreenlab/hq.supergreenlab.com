<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
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
  <section :id="$style.container">
    <PlantInfo v-if='plant' :plant="plant"></PlantInfo>
    <Feed :lib='lib' :plantID='plantID' />
    <portal-target name='root'>
    </portal-target>
  </section>
</template>

<script>
import * as lib from "~/lib/plant";

const wrapToken = (lib, token) => Object.keys(lib).reduce((acc, k) => Object.assign(acc, {}, {[k]: function() { return lib[k](token, ...arguments) }}), {})

export default {
  layout: 'menu',
  head() {
    return {
      title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout this plant in the SuperGreenLab app - Grow diary and community for growers.',
        },
      ],
    }
  },
  data() {
    return {
      plant: null,
    }
  },
  async mounted() {
    const { token } = this.$store.state.auth
    const plant = await lib.getPlantById(token, this.$route.params.id)
    this.plant = plant;
  },
  computed: {
    lib() { return wrapToken(lib, this.$store.state.auth.token) },
    plantID() {
      return this.$route.params.id
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  flex: 1

</style>
