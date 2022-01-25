<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
  <section :id='$style.section'>
    <TextInput :label='label' :name='name' :optional='optional' v-model='value' />
  </section>
</template>

<script>

const binding = (name) => ({
})


export default {
  props: ['label', 'name', 'optional',],
  computed: {
    value: {
      get() {
        return this.$store.state.payment[this.$props.name].value
      },
      set(value) {
        this.$store.commit('payment/setInfo', {key: this.$props.name, value})
      },
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex

</style>
