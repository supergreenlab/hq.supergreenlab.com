import axios from 'axios'
const fflate = require('fflate');
const base64 = require('byte-base64');

const API_URL = process.env.API_URL

function unzipMeta(meta) {
  try {
    const metaBinary = base64.base64ToBytes(meta)
    const metaJSON = fflate.strFromU8(fflate.decompressSync(metaBinary))
    return JSON.parse(metaJSON)
  } catch(e) {
    try {
      return JSON.parse(meta || '{}')
    } catch(e) {
      console.log(e)
      return {}
    }
  }
}

export async function getPlantById(token, id) {
  const response = await axios.get(`${API_URL}/public/plant/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const plant = response.data
  plant.settings = JSON.parse(plant.settings);
  plant.boxSettings = JSON.parse(plant.boxSettings);
  return plant;
}

export async function getFeedEntriesForPlantId(token, id, limit = 5, offset = 0) {
  const response = await axios.get(`${API_URL}/public/plant/${id}/feedEntries`, {
    params: {limit, offset},
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return  response.data.entries.map(fe => Object.assign(fe, {params: JSON.parse(fe.params || '{}'), meta: unzipMeta(fe.meta)}));
}

export async function getFeedEntryById(token, id) {
  const response = await axios.get(`${API_URL}/public/feedEntry/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return Object.assign(response.data, {params: JSON.parse(response.data.params || '{}'), meta: unzipMeta(response.data.meta)});
}

export async function getFeedMediasForFeedEntryId(token, feedEntryId) {
  const response = await axios.get(`${API_URL}/public/feedEntry/${feedEntryId}/feedMedias`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data;
}

export async function getFeedMediaById(token, feedMediaId) {
  const response = await axios.get(`${API_URL}/public/feedMedia/${feedMediaId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data;
}
