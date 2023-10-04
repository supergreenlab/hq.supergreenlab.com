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
    <div :id='$style.header'>
      <div :id='$style.title'>
        <img :src='icon' />&nbsp;{{ title }}
      </div>
      <div>
        <a v-if='onMoveUp' href='javascript:void(0)' @click='onMoveUp'><img src='~/assets/img/icon_up_arrow.svg' />&nbsp;</a>
        <a v-if='onMoveDown' href='javascript:void(0)' @click='onMoveDown'><img src='~/assets/img/icon_down_arrow.svg' />&nbsp;</a>
        <a v-if='onClose' href='javascript:void(0)' @click='handleClose'>X</a>
      </div>
    </div>
    <slot></slot>
  </section>
</template>

<script>

export default {
  props: ['icon', 'title', 'onClose', 'onMoveUp', 'onMoveDown'],
  methods: {
    handleClose() {
      const c = confirm("Are you sure?")
      if (c) {
        this.$props.onClose()
      }
    },
  },
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

#header
  display: flex
  justify-content: space-between

#header a
  text-decoration: none
  font-weight: bold
  color: #454545

#header img
  height: 11px

#title
  display: flex
  align-items: center
  margin: 5px 0 10px 0

#title > img
  width: 20px
  margin-right: 5px

</style>
