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
  <ChecklistSection :icon='require("~/assets/img/icon_message.svg")' title='Checklist message action' :onClose='onClose'>
    <div :class='$style.line'>
      <h4>Notification title</h4>
      <input type='text' placeholder='Ex: Check that ...'  :value='action.title' @input='e => onChange(Object.assign({}, action, {title: e.target.value}))' />
    </div>
    <div :class='$style.line'>
      <h4>Description</h4>
      <textarea type='text' placeholder='...' :value='action.instructions' @input='e => onChange(Object.assign({}, action, {instructions: e.target.value}))' ></textarea>
    </div>
  </ChecklistSection>
</template>

<script>

export default {
  props: ['action', 'onChange', 'onClose'],
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

.line > input
  padding: 5px

.line > textarea
  padding: 5px
  width: 100%
  height: 200px
  box-sizing: border-box

</style>
