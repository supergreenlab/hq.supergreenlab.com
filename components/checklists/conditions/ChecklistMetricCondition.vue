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
        <b>Monitored metric: </b>&nbsp;<ChecklistMetric />
      </div>
    </div>
    <div :class='$style.line'>
      <div>
        <input type='checkbox' />&nbsp;Trigger this condition when the value is OUT of this range.
      </div>
      <div>
        <input type='checkbox' />&nbsp;Trigger this condition when the value is IN of this range.
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <div :class='$style.field'>
          Minimum value:
          <input />
        </div>
        <div :class='$style.field'>
          Maximum value:
          <input />
        </div>
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.field'>
        For how long?
        <ConditionDuration />
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.row'>
        <div>
          <input type='checkbox' />&nbsp;This should repeat multiple days in a row.
          <ConditionDuration />
        </div>
      </div>
    </div>
  </ChecklistSection>
</template>

<script>

export default {
  props: [],
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
