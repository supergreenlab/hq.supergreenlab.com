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
  <ChecklistSection>
    Checklist diary action
    <div :class='$style.line'>
      <ChecklistCardType />
    </div>
    <div :class='$style.line'>
      <h4>Instructions</h4>
      <textarea type='text' placeholder='Ex: When the temperature get too high, ...'></textarea>
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
  margin: 5px 0

.line > h4
  margin-bottom: 5px
  color: #454545

.line > textarea
  width: 100%
  height: 200px
  box-sizing: border-box

</style>
