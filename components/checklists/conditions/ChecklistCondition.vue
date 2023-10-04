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
    <ChecklistCardCondition v-if='condition.type == "after_card"' :condition='condition.params || condition' :onChange='onChange' :onMoveUp='onMoveUp' :onMoveDown='onMoveDown' :onClose='onClose' />
    <ChecklistMetricCondition v-if='condition.type == "metric"' :condition='condition.params || condition' :onChange='onChange' :onMoveUp='onMoveUp' :onMoveDown='onMoveDown' :onClose='onClose' />
    <ChecklistPhaseCondition v-if='condition.type == "after_phase"' :condition='condition.params || condition' :onChange='onChange' :onMoveUp='onMoveUp' :onMoveDown='onMoveDown' :onClose='onClose' />
    <ChecklistTimerCondition v-if='condition.type == "timer"' :condition='condition.params || condition' :onChange='onChange' :onMoveUp='onMoveUp' :onMoveDown='onMoveDown' :onClose='onClose' />
  </section>
</template>

<script>

export default {
  props: ['condition', 'onChange', 'onMoveDown', 'onMoveUp', 'onClose'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

</style>
