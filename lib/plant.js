import axios from 'axios'

const API_URL = process.env.API_URL

export async function getPlantById(id, token) {
  const response = await axios.get(`${API_URL}/explore/plant/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return  response.data;
}

export async function getFeedEntriesById(id, token, limit = 5, offset = 0) {
  const response = await axios.get(`${API_URL}/explore/plant/${id}/feedEntries`, {
    params: {limit, offset},
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return  response.data;
}

// this could maybe go into a separate service file for /feedEntry but to keep it simple, it's here for now.
export async function getFeedMediasByFeedEntryId(feedEntryId, token) {
  const response = await axios.get(`${API_URL}/explore/feedEntry/${feedEntryId}/feedMedias`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data;
}
