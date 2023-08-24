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
    <ChecklistInfos />
    <div :class='$style.section'>
      <h3>Conditions</h3>
      <ChecklistCondition v-for='c in conditions' :key='c.id' :condition='c' />
      <a href='javascript:void(0)' @click='setShowSelector("condition")'>+ Add condition</a>
    </div>
    <div :class='$style.section'>
      <h3>Exit conditions</h3>
      <ChecklistCondition v-for='c in exitConditions' :key='c.id' :condition='c' />
      <a href='javascript:void(0)' @click='setShowSelector("exitCondition")'>+ Add exit condition</a>
    </div>
    <div :class='$style.section'>
      <h3>Actions</h3>
      <ChecklistAction v-for='a in actions' :key='a.id' :action='a' />
      <a href='javascript:void(0)' @click='setShowSelector("action")'>+ Add action</a>
    </div>

    <ConditionSelector v-if='showSelector == "condition"' :onConditionCreated='onAddCondition' :onClose='onCloseSelector' />
    <ConditionSelector v-if='showSelector == "exitCondition"' :onConditionCreated='onAddExitCondition' :onClose='onCloseSelector' />
    <ActionSelector v-if='showSelector == "action"' :onActionCreated='onAddAction' :onClose='onCloseSelector' />
  </section>
</template>

<script>

export default {
  props: ['checklistSeed'],
  data() {
    return {
      title: '',
      description: '',
      category: '',
      repeat: false,
      conditions: [],
      exitConditions: [],
      actions: [],

      showSelector: '',
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  methods: {
    setShowSelector(selector) {
      this.$data.showSelector=selector
    },
    onAddCondition(condition) {
      this.$data.conditions.push(condition)
    },
    onAddExitCondition(condition) {
      this.$data.exitConditions.push(condition)
    },
    onAddAction(action) {
      this.$data.actions.push(action)
    },
    onCloseSelector() {
      this.$data.showSelector = false
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

.section
  margin: 0 0 30px 0

.section h3
  color: #454545
  margin-bottom: 5px

</style>
