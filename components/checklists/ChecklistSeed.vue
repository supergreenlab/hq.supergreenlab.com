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
    Checklist seed
    <div :class='$style.section'>
      Conditions
      <ChecklistCondition v-for='c in conditions' :key='c.id' :condition='c' />
      <a href='javascript:void(0)' @click='setShowSelector("condition")'>+ Add condition</a>
    </div>
    <div :class='$style.section'>
      Exit conditions
      <ChecklistCondition v-for='c in exitConditions' :key='c.id' :condition='c' />
      <a href='javascript:void(0)' @click='setShowSelector("exitCondition")'>+ Add exit condition</a>
    </div>
    <div :class='$style.section'>
      Actions
      <ChecklistAction v-for='a in actions' :key='a.id' :action='a' />
      <a href='javascript:void(0)' @click='setShowSelector("action")'>+ Add action</a>
    </div>

    <ConditionSelector v-if='showSelector == "condition"' :onConditionCreated='onAddCondition' />
    <ConditionSelector v-if='showSelector == "exitCondition"' :onConditionCreated='onAddExitCondition' />
    <ActionSelector v-if='showSelector == "action"' :onActionCreated='onAddAction' />
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
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

</style>
