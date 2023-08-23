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
      <h3>Condition Selector</h3>
      <a href='javascript:void(0)' @click='onCreateAfterCard'>After card</a><br />
      <a href='javascript:void(0)' @click='onCreateMetric'>Metric monitoring</a><br />
      <a href='javascript:void(0)' @click='onCreateAfterPhase'>After phase</a><br />
      <a href='javascript:void(0)' @click='onCreateTimer'>Timer</a><br />
    </section>
  </div>
</template>

<script>

export default {
  props: ['onConditionCreated', 'onClose',],
  data() {
    return {
    }
  },
  methods: {
    onCreateAfterCard() {
      this.$props.onConditionCreated({
        type: 'after_card',
      })
    },
    onCreateMetric() {
      this.$props.onConditionCreated({
        type: 'metric',
      })
    },
    onCreateAfterPhase() {
      this.$props.onConditionCreated({
        type: 'after_phase',
      })
    },
    onCreateTimer() {
      this.$props.onConditionCreated({
        type: 'timer',
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
