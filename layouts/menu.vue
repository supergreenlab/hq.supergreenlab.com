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
    <div :id='$style.leftbar'>
      <LeftBar />
    </div>
    <div :id='$style.body'>
      <Nuxt />
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style module lang=stylus>

#container
  display: flex
  height: 100vh

#leftbar
  display: flex
  height: 100vh

#body
  flex: 1
  display: flex
  height: 100vh
  overflow-y: auto
  background-color: #F5F5F5

</style>
