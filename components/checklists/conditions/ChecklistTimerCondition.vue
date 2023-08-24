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
  <ChecklistSection :icon='require("~/assets/img/icon_reminder.svg")' title='Checklist timer condition'>
    <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :value='date' @input='onChange($event.target.value)' />
  </ChecklistSection>
</template>

<script>

export default {
  props: ['date', 'onChange'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

</style>
