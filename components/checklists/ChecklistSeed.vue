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
    <ChecklistInfos :checklistSeed='checklistSeed' :onChange='() => this.$data.checklistSeed = checklistSeed' />
    <div :class='$style.section'>
      <h3>Conditions</h3>
      <ChecklistCondition v-for='(c, i) in conditions' :key='c.id' :condition='c' :onChange='value => $set(conditions, i, value)' :onClose='() => onRemoveCondition(i)' />
      <a href='javascript:void(0)' @click='setShowSelector("condition")'>+ Add condition</a>
    </div>
    <div :class='$style.section'>
      <h3>Exit conditions</h3>
      <ChecklistCondition v-for='(c, i) in exitConditions' :key='c.id' :condition='c' :onChange='value => $set(exitConditions, i, value)' :onClose='() => onRemoveExitCondition(i)' />
      <a href='javascript:void(0)' @click='setShowSelector("exitCondition")'>+ Add exit condition</a>
    </div>
    <div :class='$style.section'>
      <h3>Actions</h3>
      <ChecklistAction v-for='(a, i) in actions' :key='a.id' :action='a' :onChange='value => $set(actions, i, value)' :onClose='() => onRemoveAction(i)' />
      <a href='javascript:void(0)' @click='setShowSelector("action")'>+ Add action</a>
    </div>

    <div :id='$style.bottom'>
      <a href='javascript:void(0)' @click='onSave' :id='$style.save'>Save</a>
    </div>

    <ConditionSelector v-if='showSelector == "condition"' :onConditionCreated='onAddCondition' :onClose='onCloseSelector' />
    <ConditionSelector v-if='showSelector == "exitCondition"' :onConditionCreated='onAddExitCondition' :onClose='onCloseSelector' />
    <ActionSelector v-if='showSelector == "action"' :onActionCreated='onAddAction' :onClose='onCloseSelector' />
  </section>
</template>

<script>

import axios from 'axios'

export default {
  props: ['checklistSeedID'],
  data() {
    return {
      loading: false,
      checklistSeed: {
        title: '',
        description: '',
        category: '',
        repeat: false,
        public: true,
      },
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
    onRemoveCondition(index) {
      this.$delete(this.$data.conditions, index)
    },
    onAddExitCondition(condition) {
      this.$data.exitConditions.push(condition)
    },
    onRemoveExitCondition(index) {
      this.$delete(this.$data.exitConditions, index)
    },
    onAddAction(action) {
      this.$data.actions.push(action)
    },
    onRemoveAction(index) {
      this.$delete(this.$data.actions, index)
    },
    onCloseSelector() {
      this.$data.showSelector = false
    },
    async onSave() {
      const resp = await axios.post(`${API_URL}/login`, {
        handle: login,
        password,
        token: captcha,
      })
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  position: relative
  padding-bottom: 40px
  min-height: 100%

.section
  margin: 0 0 30px 0

.section h3
  color: #454545
  margin-bottom: 5px

#bottom
  display: flex
  align-items: center
  justify-content: flex-end
  position: absolute
  background-color: white
  bottom: 0
  left: 0
  right: 0
  padding: 10px

#save
  background-color: #3bb30b
  padding: 6px 30px
  color: white
  text-decoration: none
  border-radius: 3px

</style>
