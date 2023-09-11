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
  <ChecklistSection :icon='require("~/assets/img/icon_reminder.svg")' title='Checklist timer condition' :onClose='onClose'>
    <div :class='$style.line'>
      <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :value='condition.date' @input='v => onChange(Object.assign({}, condition, {date: v}))' />
    </div>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <input type='checkbox' :checked='condition.repeat' @input='e => onChange(Object.assign({}, condition, {repeat: !condition.repeat}))' />&nbsp;This checklist seed should repeat
      </div>
    </div>
    <div :class='$style.line' v-if='condition.repeat'>
      <ConditionDuration :duration='condition.repeatDuration' :durationUnit='condition.durationUnit' :onChange='(duration, durationUnit) => onChange(Object.assign({}, condition, {repeatDuration: duration, durationUnit}))' />
    </div>
  </ChecklistSection>
</template>

<script>

export default {
  props: ['condition', 'onChange', 'onClose',],
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
