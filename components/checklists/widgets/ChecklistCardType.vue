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
      <option disabled selected hidden>Choose card type</option>
      <option value='FE_WATER'>Watering</option>
      <option value='FE_LIGHT'>Light</option>
      <option value='FE_VENTILATION'>Ventilation</option>
      <option value='FE_MEDIA'>Media</option>
      <option value='FE_MEASURE'>Measure</option>
      <option value='FE_NUTRIENT_MIX'>Nutrient mix</option>
      <option value='FE_TRANSPLANT'>Transplant</option>
      <option value='FE_BENDING'>Bending</option>
      <option value='FE_FIMMING'>Fimming</option>
      <option value='FE_TOPPING'>Topping</option>
      <option value='FE_DEFOLIATION'>Defolation</option>
      <option value='FE_TIMELAPSE'>Timelapse</option>
      <option value='FE_SCHEDULE'>Schedule</option>
      <option value='FE_SCHEDULE_VEG'>Schedule Veg</option>
      <option value='FE_SCHEDULE_BLOOM'>Schedule Bloom</option>
      <option value='FE_SCHEDULE_AUTO'>Schedule Auto</option>
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
