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
    <div :id='$style.iconcontainer' :style='{"background-color": color}'>
      <img :id='$style.icon' :src='icon' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.bodyleft'>
        <div :id='$style.title' :style='{color}'>{{ title }}</div>
        <slot name='left' />
      </div>
      <div :id='$style.bodyright'>
        <slot name='right' />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['color', 'icon', 'title'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  border-radius: 5px
  overflow: hidden
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

#iconcontainer
  padding: 5px

#iconcontainer > img
  width: 30px
  height: 30px
  border-radius: 15px
  background-color: white

#body
  flex: 1
  display: flex
  margin: 0 0 0 5px

#bodyleft
  flex: 1
  display: flex
  flex-direction: column

#bodyright
  display: flex
  align-items: center
  justify-content: center
  padding: 5px

#title
  font-weight: bold
  text-transform: uppercase

</style>
