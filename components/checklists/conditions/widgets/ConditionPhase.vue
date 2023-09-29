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
    <select :value='value' @input='e => onChange(e.target.value)'>
      <option disabled selected hidden>Choose phase</option>
      <option value='CLONING'>Cloning</option>
      <option value='SEED'>Seedling</option>
      <option value='VEGGING'>Vegging</option>
      <option value='BLOOMING'>Blooming</option>
      <option value='DRYING'>Drying</option>
      <option value='CURING'>Curing</option>
    </select>
  </section>
</template>

<script>

export default {
  props: ['value', 'onChange'],
}
</script>

<style module lang=stylus>

#container
  display: flex

#container > input
  height: 30px
  margin-right: 5px

</style>
