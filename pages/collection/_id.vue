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
    <PageTitle title='Checklist collections' />
    <div :id='$style.body'>
      <Collection :collection='collection' />
    </div>
  </section>
</template>

<script>
export default {
  layout: 'menu',
  mounted() {
    console.log(this.$route.params.id)
  },
  computed: {
    collection() {
      return this.$store.state.checklists.collections.find((c) => c.id == this.$route.params.id)
    },
  },
}
</script>

<style module lang=stylus>

#container
  flex: 1
  display: flex
  flex-direction: column
  height: 100vh
  overflow-y: auto

#leftbar
  display: flex
  width: 50pt
  height: 100vh

#body
  flex: 1
  width: 100%
  max-width: 800px
  max-height: 100%
  background-color: white
  margin: 0 20px
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

</style>
