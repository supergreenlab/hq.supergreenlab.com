import axios from 'axios'

export default {
  data() {
    return {
      filePath: null,
      loadingPic: true,
    }
  },
  methods: {
    async loadPic() {
      const { token } = this.$store.state.auth
      const API_URL = process.env.API_URL
      try {
        const url = `${API_URL}/feedMedias?feedid=${this.$props.plant.feedID}&deleted=false&limit=1`
        const cached = this.$store.state.dashboard.cached[url]
        if (cached) {
          this.$data.filePath = cached
          return
        }

        this.$data.loadingPic = true
        const { data: { feedmedias } } = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })

        if (feedmedias.length == 0) {
          return
        }
        const pic = `https://storage.supergreenlab.com${feedmedias[0].thumbnailPath}`
        this.$data.filePath = pic
        this.$store.commit('dashboard/addCached', {key: url, item: pic})
      } catch(e) {
        console.log(e)
      }
      this.$data.loadingPic = false
    },
  },
}
