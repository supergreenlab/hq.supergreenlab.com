/*
 * Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import axios from 'axios'

import { loadFromStorage, saveToStorage } from '~/lib/client-side.js'

const STORAGE_ITEM='lab'
const API_URL=process.env.API_URL

export const state = () => {
  let defaults = {
    devices: [],
    boxes: [],
    plants: [],
    timelapses: [],

    error: false,
    loading: false,
  };
  return defaults
};

const storeState = (state) => {
  saveToStorage(STORAGE_ITEM, JSON.stringify(state))
}

export const actions = {
  async nuxtClientInit({ commit, dispatch }) {
    const saved = loadFromStorage(STORAGE_ITEM)
    if (saved) {
      commit('setState', JSON.parse(saved))
    }
    await dispatch('loadAll')
  },
  async loadAll({ commit, dispatch, rootState }) {
    commit('setLoading', true)
    try {
      const { token } = rootState.auth
      let { data: { devices } } = await axios.get(`${API_URL}/devices?offset=0&limit=100`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      let { data: { boxes } } = await axios.get(`${API_URL}/boxes?offset=0&limit=100`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      let { data: { timelapses } } = await axios.get(`${API_URL}/timelapses?addNFrames=true&offset=0&limit=100`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      let { data: { plants } } = await axios.get(`${API_URL}/plants?offset=0&limit=100`, {
        headers: {'Authorization': `Bearer ${token}`}
      })

      devices = devices.filter(d => !d.deleted)

      boxes = boxes.map((b, i) => {
        b = Object.assign({}, b, {
          device: b.deviceID ? devices.find(d => d.id == b.deviceID) : null,
        })
        if (typeof b.settings == 'string') {
          b.settings = JSON.parse(b.settings)
        }
        return b
      })

      timelapses = timelapses.filter(t => t.type == 'sglstorage' && !t.deleted).map((t, i) => {
        t = Object.assign({}, t, {
          plant: plants.find(p => p.id == t.plantID),
          settings: JSON.parse(t.settings),
        })
        return t
      }).filter(t => t.plant && !t.plant.deleted)

      plants = plants.filter(p => !p.deleted).map((p, i) => {
        p = Object.assign({}, p, {
          box: boxes.find(b => b.id == p.boxID),
          timelapses: timelapses.filter(t => t.plantID == p.id).map(t => Object.assign({}, t, {plant: null})),
          settings: JSON.parse(p.settings),
        })
        return p
      })
      commit('setDevices', devices)
      commit('setBoxes', boxes)
      commit('setPlants', plants)
      commit('setTimelapses', timelapses)
    } catch(e) {
      console.error(e)
      commit('setError', e)
    }
    commit('setLoading', false)
  },
}

export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  },
  setDevices(state, devices) {
    state.devices = devices
    storeState(state)
  },
  setBoxes(state, boxes) {
    state.boxes = boxes
    storeState(state)
  },
  setPlants(state, plants) {
    state.plants = plants
    storeState(state)
  },
  setTimelapses(state, timelapses) {
    state.timelapses = timelapses
    storeState(state)
  },
}

export const getters = {
}
