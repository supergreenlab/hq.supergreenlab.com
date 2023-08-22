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
    Condition Selector
    <a href='javascript:void(0)' @click='onCreateAfterCard'>After card</a><br />
    <a href='javascript:void(0)' @click='onCreateMetric'>Metric monitoring</a><br />
    <a href='javascript:void(0)' @click='onCreateAfterPhase'>After phase</a><br />
    <a href='javascript:void(0)' @click='onCreateTimer'>Timer</a><br />
  </section>
</template>

<script>

export default {
  props: ['onConditionCreated'],
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

#container
  display: flex
  flex-direction: column
  user-select: none

</style>
