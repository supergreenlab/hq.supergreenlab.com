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

const STORAGE_ITEM='dashboard2'
const API_URL=process.env.API_URL

export const state = () => {
  let defaults = {
    timelapsesOrder: [],
    plantsOrder: [],
    cached: {},
  };
  return defaults
};

const storeState = (state) => {
  saveToStorage(STORAGE_ITEM, JSON.stringify(Object.assign({}, state, {cached: []})))
}

export const actions = {
  async nuxtClientInit({ commit, dispatch }) {
    const saved = loadFromStorage(STORAGE_ITEM)
    if (saved) {
      commit('setState', JSON.parse(saved))
    }
  },
}

export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  setTimelapsesOrder(state, timelapsesOrder) {
    state.timelapsesOrder = timelapsesOrder
    storeState(state)
  },
  setPlantsOrder(state, plantsOrder) {
    state.plantsOrder = plantsOrder
    storeState(state)
  },
  addExcludedTimelapse(state, timelapse) {
    state.excludedTimelapses.push(timelapse)
    storeState(state)
  },
  addCached(state, { key, item, }) {
    state.cached[key] = item
  },
  removeCached(state, key) {
    delete state.cached[key]
  },
}

export const getters = {
}
