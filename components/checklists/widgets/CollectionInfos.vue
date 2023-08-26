<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :class='$style.line'>
      <h4>Title</h4>
      <input type='text' :value='collection.title' @input='e => onChange(Object.assign({}, collection, {title: e.target.value}))' />
    </div>
    <div :class='$style.line'>
      <h4>Description</h4>
      <textarea type='text' :value='collection.description' @input='e => onChange(Object.assign({}, collection, {description: e.target.value}))'></textarea>
    </div>
    <div :class='$style.line'>
      <h4>Category</h4>
      <select :value='collection.category' @input='e => onChange(Object.assign({}, collection, {category: e.target.value}))'>
        <option></option>
        <option value='CO_BASICS'>The basics</option>
        <option value='CO_NUTRIENT'>Nutrient timeline</option>
        <option value='CO_RECIPE'>Recipe</option>
        <option value='CO_OTHER'>Other</option>
      </select>
    </div>
  </section>
</template>

<script>

export default {
  props: ['collection', 'onChange'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.line
  margin: 10px 0

.line > input, .line > textarea
  width: 100%

.line > textarea
  height: 120px

</style>
