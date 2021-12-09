<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div>
    <img v-if="mediaType === MEDIA_TYPES.TYPE_IMAGE" :src='url' class="feed-entry-media-image"/>
    <video controls v-else-if="mediaType === MEDIA_TYPES.TYPE_VIDEO" ref="videoPlayer" class="feed-entry-media-video">
      <source :src="url" type="video/mp4">
    </video>
    <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
  </div>
</template>

 <script>
import {getFeedMediasByFeedEntryId} from "~/lib/plant";

export default {
  data() {
    return {
      url: null,
      mediaType: null,
      MEDIA_TYPES:  {
        TYPE_IMAGE: 1,
        TYPE_VIDEO: 2
      }
    }
  },
  name: "feed-entry-media",
  props: {
    feedEntry: {
      type: Object,
      required: true,
      default: {}
    }
  },
  mounted() {
    getFeedMediasByFeedEntryId(this.feedEntry.id)
      .then(data => {
        this.url = 'https://storage.supergreenlab.com' + data.medias[0].filePath;

        // Here I differentiate between image and video media
        if (this.url.includes('/feedmedias/pictures')) {
          this.mediaType = this.MEDIA_TYPES.TYPE_IMAGE;
        } else if (this.url.includes('/feedmedias/videos')) {
          this.mediaType = this.MEDIA_TYPES.TYPE_VIDEO;
        }

      })
      .catch(err => console.log(err.message));
  },

}
</script>

<style scoped>
.feed-entry-media-image {
  max-width: 100%;
}

.feed-entry-media-video {
  width: 100%;
  height: 260px;
}

p {
  padding: 10px 15px;
  text-align: left;
}
</style>
