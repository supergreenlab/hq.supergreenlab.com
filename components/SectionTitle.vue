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
    <img :src='icon' width='40px' height='30px' />
    <h2>{{ title }}</h2>
  </section>
</template>

<script>
export default {
  props: ['title', 'icon',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  border-bottom: 2px solid #999999
  width: 100%
  color: #454545
  margin: 10px 20px
  padding-bottom: 5px
  font-family: Roboto
  align-items: center
  font-size: 1.3em

#container > img
  margin-right: 5px

</style>
