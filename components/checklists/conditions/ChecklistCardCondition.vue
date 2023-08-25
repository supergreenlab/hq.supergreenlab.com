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
  <ChecklistSection :icon='require("~/assets/img/icon_diary.svg")' title='Checklist card condition'>
    <div :class='$style.line'>
      After:&nbsp;&nbsp;<ChecklistCardType :value='condition.phase' :onChange='(v) => onChange(Object.assign({}, condition, {entryType: v}))' />
    </div>
    <ConditionDuration :duration='condition.duration' :durationUnit='condition.durationUnit' :onChange='(duration, durationUnit) => onChange(Object.assign({}, condition, {duration, durationUnit}))' />
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
  padding: 10px
  background-color: white
  border: 1px solid #cdcdcd
  margin: 5px 10px

.line
  display: flex
  align-items: center
  margin: 10px 0

</style>
