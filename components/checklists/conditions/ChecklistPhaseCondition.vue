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
  <ChecklistSection :icon='require("~/assets/img/icon_phase.svg")' title='Checklist phase action' :onMoveUp='onMoveUp' :onMoveDown='onMoveDown' :onClose='onClose'>
    <div :class='$style.line'>
      When plant is:&nbsp;<ConditionPhase :value='condition.phase' :onChange='(v) => onChange(Object.assign({}, condition, {phase: v}))' />
    </div>
    <div :class='$style.line'>
      <ConditionDuration :duration='condition.duration' :durationUnit='condition.durationUnit' :onChange='(duration, durationUnit) => onChange(Object.assign({}, condition, {duration, durationUnit}))' />
    </div>
  </ChecklistSection>
</template>

<script>

export default {
  props: ['condition', 'onChange', 'onMoveUp', 'onMoveDown', 'onClose'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.line
  display: flex
  align-items: center
  margin: 10px 0

</style>
