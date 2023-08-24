<!--
      Copyright (C) 2023  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :id='$style.title'>
      <img :src='icon' />&nbsp; {{ title }}
    </div>
    <slot></slot>
  </section>
</template>

<script>

export default {
  props: ['icon', 'title',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  padding: 15px
  background-color: white
  border: 1px solid #cdcdcd
  margin: 5px 0 10px 0
  border-radius: 5px

#title
  display: flex
  align-items: center
  margin: 5px 0 10px 0

#title > img
  width: 20px
  margin-right: 5px

</style>
