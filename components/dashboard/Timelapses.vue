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
    <SectionTitle :icon='require("~/assets/img/dashboard/icon_liveviews.svg")' title='Live views' />
    <div :id='$style.timelapses' @mouseup='mouseUp' @mousemove='mouseMove'>
      <div v-for='t in timelapses' :class='$style.timelapse' :key='t.id' @mousedown='mouseDown($event, t)' :ref='t.id'>
        <Timelapse :timelapse='t' :dragged='dragging == t' />
      </div>
    </div>
    <div v-if='draggingOver' :id='$style.draggingoverframe' :style='{top: draggingOverFrame.y, left: draggingOverFrame.x, width: draggingOverFrame.width, height: draggingOverFrame.height}'></div>
    <div v-if='dragging' :id='$style.dragging' :style='{top: `${mouseY - draggingY}px`, left: `${mouseX - draggingX}px`}' @mouseup='mouseUp' @mousemove='mouseMove'>
      <Timelapse :timelapse='dragging' />
    </div>
  </section>
</template>

<script>

// https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another?rq=1
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
    timelapses() {
      let timelapsesOrder = [...this.$store.state.dashboard.timelapsesOrder]
      const timelapses = this.$store.state.lab.timelapses.filter(t => !t.plant.archived && !t.deleted)
      let orderChanged = false
      for (let i in timelapses) {
        if (timelapsesOrder.indexOf(timelapses[i].id) == -1) {
          orderChanged = true
          timelapsesOrder.unshift(timelapses[i].id)
        }
      }
      if (orderChanged) {
        this.$store.commit('dashboard/setTimelapsesOrder', timelapsesOrder)
      }
      return timelapses.sort((t1, t2) => timelapsesOrder.indexOf(t1.id) - timelapsesOrder.indexOf(t2.id))
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
          this.$data.draggingOver = this.timelapses.find(t => t.id == key)
          break
        }
      }
      return false
    },
    mouseDown(e, timelapse) {
      this.$data.mouseX = e.pageX
      this.$data.mouseY = e.pageY
      this.$data.draggingX = e.offsetX
      this.$data.draggingY = e.offsetY
      this.$data.dragging = timelapse
    },
    mouseUp() {
      if (this.$data.draggingOver && this.$data.draggingOver.id != this.$data.dragging.id) {
        let timelapsesOrder = [...this.$store.state.dashboard.timelapsesOrder]
        let added = false
        let fromIndex = timelapsesOrder.indexOf(this.$data.dragging.id)
        let toIndex = timelapsesOrder.indexOf(this.$data.draggingOver.id)
        array_move(timelapsesOrder, fromIndex, toIndex)
        this.$store.commit('dashboard/setTimelapsesOrder', timelapsesOrder)
      }
      this.$data.dragging = null
      this.$data.draggingOver = null
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  user-select: none

#timelapses
  display: flex
  margin: 10px
  flex-wrap: wrap

.timelapse
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
