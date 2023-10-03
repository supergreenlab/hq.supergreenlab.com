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
    <div :id='$style.body'>
      <ChecklistInfos :checklistSeed='checklistSeed' :onChange='(cs) => this.$data.checklistSeed = cs' />
      <div :class='$style.section'>
        <h3>Conditions</h3>
        <ChecklistCondition v-for='(c, i) in conditions' :key='c.id' :condition='c' :onChange='value => onChange(conditions, i, value)' :onClose='() => onRemoveCondition(i)' />
        <a href='javascript:void(0)' @click='setShowSelector("condition")'>+ Add condition</a>
      </div>
      <div :class='$style.section'>
        <h3>Exit conditions</h3>
        <ChecklistCondition v-for='(c, i) in exitConditions' :key='c.id' :condition='c' :onChange='value => onChange(exitConditions, i, value)' :onClose='() => onRemoveExitCondition(i)' />
        <a href='javascript:void(0)' @click='setShowSelector("exitCondition")'>+ Add exit condition</a>
      </div>
      <div :class='$style.section'>
        <h3>Actions</h3>
        <ChecklistAction v-for='(a, i) in actions' :key='a.id' :action='a' :onChange='value => onChange(actions, i, value)' :onClose='() => onRemoveAction(i)' />
        <a href='javascript:void(0)' @click='setShowSelector("action")'>+ Add action</a>
      </div>
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

const API_URL=process.env.API_URL

export default {
  props: ['checklistSeedID'],
  data() {
    return {
      loading: false,
      checklistSeed: {
        collectionID: '',
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
  async mounted() {
    const parts = this.$route.params.id.split('_')
    let seedID
    if (parts.length == 2) {
      this.$data.checklistSeed.collectionID = parts[0]
      seedID = parts[1]
    } else {
      seedID = parts[0]
    }
    if (seedID != 'new') {
      const { token } = this.$store.state.auth
      const { data: checklistSeed } = await axios.get(`${API_URL}/checklistseed/${seedID}`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      this.$data.checklistSeed = {
        id: checklistSeed.id,
        collectionID: checklistSeed.collectionID,
        title: checklistSeed.title,
        description: checklistSeed.description,
        category: checklistSeed.category,
        repeat: checklistSeed.repeat,
        public: checklistSeed.public,
      }
      this.$data.conditions = JSON.parse(checklistSeed.conditions).map(c => {
        if (typeof c.params != 'string') {
          return c
        }
        return Object.assign({}, c, {params: JSON.parse(c.params)})
      })
      this.$data.exitConditions = JSON.parse(checklistSeed.exitConditions).map(c => {
        if (typeof c.params != 'string') {
          return c
        }
        return Object.assign({}, c, {params: JSON.parse(c.params)})
      })
      this.$data.actions = JSON.parse(checklistSeed.actions).map(c => {
        if (typeof c.params != 'string') {
          return c
        }
        return Object.assign({}, c, {params: JSON.parse(c.params)})
      })
    }
  },
  methods: {
    onChange(array, i, params) {
      let value = array[i]
      if (!value.params) {
        const p = Object.assign({}, value, params)
        delete p.type
        value = {
          type: value.type,
          params: p,
        }
      } else {
        value.params = Object.assign(value.params, params)
      }
      this.$set(array, i, value)
    },
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
      const { token } = this.$store.state.auth
      const data = Object.assign({}, this.$data.checklistSeed, {
        conditions: JSON.stringify(this.$data.conditions.map(c => Object.assign({}, c, {params: JSON.stringify(c.params)}))),
        exitConditions: JSON.stringify(this.$data.exitConditions.map(c => Object.assign({}, c, {params: JSON.stringify(c.params)}))),
        actions: JSON.stringify(this.$data.actions.map(a => Object.assign({}, a, {params: JSON.stringify(a.params)}))),
      })
      if (this.$data.checklistSeed.id) {
        const resp = await axios.put(`${API_URL}/checklistseed`, data, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        console.log(resp)
      } else {
        const resp = await axios.post(`${API_URL}/checklistseed`, data, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        console.log(resp)
      }
      this.$router.push(`/collection/${this.$data.checklistSeed.collectionID}`)
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  padding-bottom: 40px
  max-height: 100%

#body
  display: flex
  flex-direction: column
  background-color: white
  padding: 10px 15px
  padding-bottom: 40px

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
  left: 120px
  width: 100%
  max-width: 780px
  padding: 10px

#save
  background-color: #3bb30b
  padding: 6px 30px
  color: white
  text-decoration: none
  border-radius: 3px

</style>
