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

const STORAGE_ITEM='lab2'
const API_URL=process.env.API_URL

export const state = () => {
  let defaults = {
    collections: [],

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
      let { data: { checklistcollections: collections } } = await axios.get(`${API_URL}/checklistcollections/mine`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      commit('setCollections', collections)
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
  setCollections(state, collections) {
    state.collections = collections
    storeState(state)
  },
  setError(state, error) {
    state.error = error
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const getters = {
}
