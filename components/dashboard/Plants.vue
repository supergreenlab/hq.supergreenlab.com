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
    <SectionTitle :icon='require("~/assets/img/dashboard/icon_plants.svg")' title='Plants' />
    <div :id='$style.plants' @mouseup='mouseUp' @mousemove='mouseMove'>
      <div :class='$style.plant' v-for='p in plants' :key='p.id' @mousedown='mouseDown($event, p)' :ref='p.id'>
        <Plant :plant='p' />
      </div>
    </div>
    <div v-if='draggingOver' :id='$style.draggingoverframe' :style='{top: draggingOverFrame.y, left: draggingOverFrame.x, width: draggingOverFrame.width, height: draggingOverFrame.height}'></div>
    <div v-if='dragging' :id='$style.dragging' :style='{top: `${mouseY - draggingY}px`, left: `${mouseX - draggingX}px`}' @mouseup='mouseUp' @mousemove='mouseMove'>
      <Plant :plant='dragging' />
    </div>
  </section>
</template>

<script>

// https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another?rq=1
// TODO DRY with Timelapses.vue
function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};

export default {
  data() {
    return {
      dragging: null,
      draggingOver: null,
      mouseX: 0,
      mouseY: 0,
      draggingX: 0,
      draggingY: 0,
    }
  },
  computed: {
    plants() {
      let plantsOrder = [...this.$store.state.dashboard.plantsOrder]
      const plants = this.$store.state.lab.plants.filter(p => !p.archived && !p.deleted)
      let orderChanged = false
      for (let i in plants) {
        if (plantsOrder.indexOf(plants[i].id) == -1) {
          orderChanged = true
          plantsOrder.unshift(plants[i].id)
        }
      }
      if (orderChanged) {
        this.$store.commit('dashboard/setPlantsOrder', plantsOrder)
      }
      return plants.sort((t1, t2) => plantsOrder.indexOf(t1.id) - plantsOrder.indexOf(t2.id))
    },
    draggingOverFrame() {
      if (!this.$data.draggingOver) return {x: 0, y: 0, width: 0, height: 0}
      const coord = this.$refs[this.$data.draggingOver.id][0].getBoundingClientRect()
      return {
        x: `${coord.left + window.pageXOffset}px`,
        y: `${coord.top + window.pageYOffset}px`,
        width: `${coord.width}px`,
        height: `${coord.height}px`,
      }
    },
  },
  methods: {
    mouseMove(e) {
      if (!this.$data.dragging) return
      this.$data.mouseX = e.pageX
      this.$data.mouseY = e.pageY
      for (let key in this.$refs) {
        const ref = this.$refs[key]
        const coord = ref[0].getBoundingClientRect()
        const x = coord.left + window.pageXOffset,
              y = coord.top + window.pageYOffset
        if (this.$data.mouseX > x && this.$data.mouseY > y && this.$data.mouseX < x + coord.width && this.$data.mouseY < y + coord.height) {
          this.$data.draggingOver = this.plants.find(t => t.id == key)
          break
        }
      }
      return false
    },
    mouseDown(e, plant) {
      let plantEl = this.$refs[plant.id][0]
      this.$data.mouseX = e.pageX
      this.$data.mouseY = e.pageY

      this.$data.draggingX = e.offsetX
      this.$data.draggingY = e.offsetY
      if (e.target.parentElement != plantEl) {
        this.$data.draggingX += e.target.offsetLeft
        this.$data.draggingY += e.target.offsetTop
      }
      this.$data.dragging = plant
    },
    mouseUp() {
      if (this.$data.draggingOver && this.$data.draggingOver.id != this.$data.dragging.id) {
        let plantsOrder = [...this.$store.state.dashboard.plantsOrder]
        let added = false
        let fromIndex = plantsOrder.indexOf(this.$data.dragging.id)
        let toIndex = plantsOrder.indexOf(this.$data.draggingOver.id)
        array_move(plantsOrder, fromIndex, toIndex)
        this.$store.commit('dashboard/setPlantsOrder', plantsOrder)
      }
      this.$data.dragging = null
      this.$data.draggingOver = null
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  user-select: none

#plants
  display: flex
  margin: 10px
  flex-wrap: wrap

.plant
  display: flex
  margin: 10px

#dragging
  position: absolute
  opacity: 0.5

#draggingoverframe
  position: absolute
  border: 4px solid #3bb30b
  border-radius: 5px
  background-color: rgba(255, 255, 255, 0.4)
  transition: all 0.3s

</style>
