import axios from 'axios'

const API_URL = process.env.API_URL

export async function getPlantById(id, token) {
  const response = await axios.get(`${API_URL}/explore/plant/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const plant = response.data
  plant.settings = JSON.parse(plant.settings);
  plant.boxSettings = JSON.parse(plant.boxSettings);
  return plant;
}

export async function getFeedEntriesById(id, token, limit = 5, offset = 0) {
  const response = await axios.get(`${API_URL}/explore/plant/${id}/feedEntries`, {
    params: {limit, offset},
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return  response.data.entries.map(fe => Object.assign(fe, {params: JSON.parse(fe.params || '{}'), meta: JSON.parse(fe.meta || '{}')}));
}

export async function getFeedEntryById(id, token) {
  const response = await axios.get(`${API_URL}/explore/feedEntry/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return Object.assign(response.data, {params: JSON.parse(response.data.params || '{}'), meta: JSON.parse(response.data.meta || '{}')});
}

export async function getFeedMediasByFeedEntryId(feedEntryId, token) {
  const response = await axios.get(`${API_URL}/explore/feedEntry/${feedEntryId}/feedMedias`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data;
}

export async function getFeedMediaById(feedMediaId, token) {
  const response = await axios.get(`${API_URL}/explore/feedMedia/${feedMediaId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data;
}
