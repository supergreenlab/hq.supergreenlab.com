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
    <div :id='$style.title'>
      <h1>Contact informations</h1>
    </div>
    <div :id='$style.inputs'>
      <div :class='$style.input'>
        <PaymentInput label='First name' name='firstname' />
      </div>
      <div :class='$style.input'>
        <PaymentInput label='Last name' name='lastname' />
      </div>
      <div :class='$style.input'>
        <PaymentInput label='Phone' name='phone' />
      </div>
      <div :class='$style.input'>
        <PaymentInput label='Email' name='email' />
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
  },
  computed: {
  },
}
</script>

<style module lang=stylus>

#container
  position: relative
  display: flex
  flex-direction: column
  width: 100%
  @media only screen and (max-width: 600px)
    padding: 20pt 15pt

#body > h1
  text-transform: uppercase

#body b
  font-weight: 600

#title
  display: flex
  align-items: center
  color: #676767

#inputs
  display: flex
  flex-wrap: wrap
  max-width: 700px

.input
  padding: 0 30px 15px 0
  flex-basis: 50%

</style>
