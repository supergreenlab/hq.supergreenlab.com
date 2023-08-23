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
  <div :id='$style.background' @click='onClose'>
    <section :id='$style.container'>
      <h3>Action Selector</h3>
      <a href='javascript:void(0)' @click='onCreateBuyProduct'>Buy product</a><br />
      <a href='javascript:void(0)' @click='onCreateDiaryCard'>Create card</a><br />
      <a href='javascript:void(0)' @click='onCreateMessage'>Message</a><br />
      <a href='javascript:void(0)' @click='onCreateWebpage'>Webpage</a>
    </section>
  </div>
</template>

<script>

export default {
  props: ['onActionCreated', 'onClose'],
  data() {
    return {
    }
  },
  methods: {
    onCreateBuyProduct() {
      this.$props.onActionCreated({
        type: 'buy_product',
      })
    },
    onCreateDiaryCard() {
      this.$props.onActionCreated({
        type: 'card',
      })
    },
    onCreateMessage() {
      this.$props.onActionCreated({
        type: 'message',
      })
    },
    onCreateWebpage() {
      this.$props.onActionCreated({
        type: 'webpage',
      })
    },
  },
}
</script>

<style module lang=stylus>

#background
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color: rgba(255, 255, 255, 0.8)

#container
  display: flex
  flex-direction: column
  user-select: none
  background-color: white
  padding: 20px
  border: 1px solid #cdcdcd
  border-radius: 5px

</style>
