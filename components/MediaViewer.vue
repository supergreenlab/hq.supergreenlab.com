<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :id='$style.carousel'>
      <VueSlickCarousel v-bind="settings">
        <div v-for='media in medias' :key='media.id'>
          <div v-if="mediaType(media) === MEDIA_TYPES.TYPE_IMAGE" :style='{"background-image": `url(${url(media)})`, height: height, "background-size": size}' :class="$style.image" @click='onClick(media)'></div>
          <video controls v-else-if="mediaType(media) === MEDIA_TYPES.TYPE_VIDEO" ref="videoPlayer" :class="$style.video" @click='onClick(media)' autoplay loop playsinline muted defaultMuted>
            <source :src="url(media)" type="video/mp4">
          </video>
        </div>
      </VueSlickCarousel>
    </div>
  </section>
</template>

<script>

const MEDIA_TYPES = {
  TYPE_IMAGE: 1,
  TYPE_VIDEO: 2,
}

export default {
  props: ['medias', 'onMediaClick', 'thumbnails', 'height', 'size'],
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1800,
        touchMove: false,
        cssEase: 'ease',
      },
      MEDIA_TYPES,
    }
  },
  methods: {
    onClick(media) {
      if (!this.$props.onMediaClick) return
      this.$props.onMediaClick(media)
    },
  },
  computed: {
    mediaType: () => media => {
      const url = media.filePath
      if (url.includes('/feedmedias/pictures')) {
        return MEDIA_TYPES.TYPE_IMAGE;
      } else if (url.includes('/feedmedias/videos')) {
        return MEDIA_TYPES.TYPE_VIDEO;
      }
    },
    url: () => media => `https://storage.supergreenlab.com${media.filePath}`,
  },
}
</script>

<style module lang=stylus>

#container
  overflow: hidden
  width: 100%
  height: 100%

#carousel
  width: 100%
  height: 100%

.image
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  width: 100%
  height: 100%

.video
  width: 100%
  height: 100%

</style>
