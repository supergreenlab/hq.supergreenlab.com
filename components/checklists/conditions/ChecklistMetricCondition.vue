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
  <ChecklistSection :icon='require("~/assets/img/icon_monitoring.svg")' title='Checklist metric condition'>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <b>Monitored metric: </b>&nbsp;<ChecklistMetric :value='condition.key' :onChange='v => onChange(Object.assign({}, condition, {key: v}))' />
      </div>
    </div>
    <div :class='$style.line'>
      <div>
        <input type='checkbox' :checked='!condition.inRange' @input='e => onChange(Object.assign({}, condition, {inRange: !condition.inRange}))' />&nbsp;Trigger this condition when the value is OUT of this range.
      </div>
      <div>
        <input type='checkbox' :checked='condition.inRange' @input='e => onChange(Object.assign({}, condition, {inRange: !condition.inRange}))' />&nbsp;Trigger this condition when the value is IN of this range.
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <div :class='$style.field'>
          Minimum value:
          <input :value='condition.min' @input='e => onChange(Object.assign({}, condition, {min: e.target.value}))' />
        </div>
        <div :class='$style.field'>
          Maximum value:
          <input :value='condition.max' @input='e => onChange(Object.assign({}, condition, {max: e.target.value}))' />
        </div>
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.field'>
        For how long?
        <ConditionDuration :duration='condition.duration' :durationUnit='condition.durationUnit' :onChange='(duration, durationUnit) => onChange(Object.assign({}, condition, {duration, durationUnit}))' />
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <div>
          <input type='checkbox' :checked='condition.daysInRow' @input='e => onChange(Object.assign({}, condition, {daysInRow: !condition.daysInRow}))' />&nbsp;This should repeat multiple days in a row.
        </div>
      </div>
    </div>
    <div v-if='condition.daysInRow' :class='$style.line'>
      <ConditionDuration :duration='condition.nDaysInRow' durationUnit='DAYS' :fixedDuration='true' :onChange='(duration) => onChange(Object.assign({}, condition, {nDaysInRow: duration}))' />
    </div>
  </ChecklistSection>
</template>

<script>

export default {
  props: ['condition', 'onChange'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.line
  margin: 10px 0

.field
  display: flex
  flex-direction: column
  margin-right: 10px

.field > input
  height: 35px

.row
  display: flex
  align-items: center

.row > b
  font-weight: bold

</style>
