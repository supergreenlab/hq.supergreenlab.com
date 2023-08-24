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
  <ChecklistSection :icon='require("~/assets/img/icon_checklist.svg")' title='Infos'>
    <div :class='$style.line'>
      <h4>Category:</h4>
      <ChecklistCategory />
    </div>
    <div :class='$style.line'>
      <h4>Title</h4>
      <input type='text' placeholder='ex: Check for XXX' />
    </div>
    <div :class='$style.line'>
      <h4>Description</h4>
      <textarea placeholder='ex: When the temperature gets too high, some fungus might develop on your leaves...'></textarea>
    </div>
    <div :class='$style.line'>
      <div :class='$style.field'>
        <input type='checkbox' />&nbsp;This checklist entry can repeat. Entries that don\’t repeat will be removed from your checklist when checked.
      </div>
    </div>
    <div :class='$style.line'>
      <div :class='$style.field'>
        <input type='checkbox' />&nbsp;Make this checklist entry public so others can add it to their checklist too.
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

.line h4
  color: #454545
  margin-bottom: 8px

.line
  display: flex
  flex-direction: column
  margin-bottom: 10px

.line > h4
  margin-bottom: 5px
  color: #454545

.line > textarea
  width: 100%
  height: 200px
  box-sizing: border-box

.field
  display: flex

.field > input
  margin-right: 10px

</style>
