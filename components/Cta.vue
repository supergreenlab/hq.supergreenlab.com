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
  <a v-if='to && to.indexOf("http") == 0' :id='$style.button' :href='to' target='_blank' :class='{[$style.nomargin]: nomargin}'><slot></slot></a>
  <a v-else-if='onClick' :id='$style.button' href='javascript:void(0)' @click='onClick' :class='{[$style.nomargin]: nomargin}'><slot></slot></a>
  <nuxt-link v-else :id='$style.button' :to='to' :class='{[$style.nomargin]: nomargin}'><slot></slot></nuxt-link>
</template>

<script>
export default {
  props: ['to', 'nomargin', 'onClick'],
}
</script>

<style module lang=stylus>

#button
  display: block
  background-color: #3BB30B
  text-align: center
  padding: 8pt 25pt
  border-radius: 5pt
  color: white
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  white-space: nowrap
  transition: opacity 0.2s
  text-transform: uppercase
  @media only screen and (max-width: 1000px)
    padding: 7pt 22pt
    font-size: 1.1em

.nomargin
  margin: 0 !important

#button
  padding: 6pt 18pt
  font-size: 1em
  border-radius: 4pt

#button:hover
  background-color: #2F880B

#button > b
  font-weight: 600

</style>
