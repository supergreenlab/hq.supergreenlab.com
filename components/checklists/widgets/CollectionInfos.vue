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
        <option value='BASICS'>The basics</option>
        <option value='NUTRIENT'>Nutrient timeline</option>
        <option value='RECIPE'>Recipe</option>
      </select>
    </div>
    <div :class='$style.line'>
      <div :class='$style.field' @click='e => onChange(Object.assign({}, collection, {ready: !collection.ready}))'>
        <input type='checkbox' :checked='collection.ready' />&nbsp;Collection is ready to be listed on the collection page
      </div>
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

.line h4
  margin-bottom: 5px
  color: #454545

.line > input, .line > textarea
  padding: 10px 10px
  width: 100%

.line > textarea
  height: 120px

.field
  display: flex
  cursor: pointer

.line > input, .field > input
  padding: 5px
  margin-right: 10px

</style>
