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
    <div class="feed-entry">
        <div class="feed-entry-header">
            <img class="feed-entry-header-image" :src="getHeaderIcon(feedEntry.type)">
            {{getFeedEntryHeading(feedEntry.type)}}
        </div>
        <div class="feed-entry-content">
            <component :is="getFeedComponent(feedEntry.type)" :feedEntry="feedEntry"></component>
        </div>
        <div class="feed-entry-footer">
            <div class="feed-entry-footer-icon-container">
                <img v-on:click="dialogTriggered" class="feed-entry-footer-icon clickable" :src="require('~/assets/img/plant/feed/button_like.png')" />
                <img v-on:click="dialogTriggered" class="feed-entry-footer-icon clickable" :src="require('~/assets/img/plant/feed/button_comment.png')" />
                <img v-on:click="dialogTriggered" class="feed-entry-footer-icon clickable" :src="require('~/assets/img/plant/feed/button_share.png')" />
                <img v-on:click="dialogTriggered" class="feed-entry-footer-icon flex-end clickable" :src="require('~/assets/img/plant/feed/button_bookmark.png')" />
            </div>
            <div class="flex-start">{{getFormattedDate(feedEntry.date)}}</div>
        </div>
    </div>

</template>

<script>

const entries = {
  FE_LIGHT: {
    component: FeedEntryLight,
    name: 'Stretch control',
    icon: require('~/assets/img/plant/feed/icon_light.svg'),
  },
  FE_WATER: {
    component: FeedEntryWater,
    name: 'Watering',
    icon: require('~/assets/img/plant/feed/icon_watering.svg'),
  },
  FE_MEDIA: {
    component: FeedEntryMedia,
    name: 'Grow log',
    icon: require('~/assets/img/plant/feed/icon_media.svg'),
  },
  FE_TIMELAPSE: {
    component: FeedEntryMedia,
    name: 'Timelapse',
    icon: require('~/assets/img/plant/feed/icon_towelie.png'),
  },
  FE_MEASURE: {
    component: FeedEntryMedia,
    name: 'Measure',
    icon: require('~/assets/img/plant/feed/icon_measure.png'),
  },
  FE_LIFE_EVENT: {
    component: FeedEntryLifeEvent,
    name: 'Life event',
    icon: require('~/assets/img/plant/feed/icon_life_events.svg'),
  },
  FE_VENTILATION: {
    component: FeedEntryVentilation,
    name: 'Ventilation change',
    icon: require('~/assets/img/plant/feed/icon_blower.svg'),
  },
  FE_SCHEDULE: {
    component: FeedEntrySchedule,
    name: 'Schedule change',
    icon: require('~/assets/img/plant/feed/icon_schedule.svg'),
  },
  FE_NUTRIENT_MIX: {
    component: FeedEntryNutrientMix,
    name: 'Nutrient mix',
    icon: require('~/assets/img/plant/feed/icon_nutrient_mix.svg'),
  },
  FE_BENDING: {
    component: FeedEntryTraining,
    name: 'Bending',
    icon: require('~/assets/img/plant/feed/icon_bending.svg'),
  },
  FE_DEFOLIATION: {
    component: FeedEntryTraining,
    name: 'Defoliation',
    icon: require('~/assets/img/plant/feed/icon_defoliation.svg'),
  },
  FE_TOPPING: {
    component: FeedEntryTraining,
    name: 'Topping',
    icon: require('~/assets/img/plant/feed/icon_topping.svg'),
  },
  FE_FIMMING: {
    component: FeedEntryTraining,
    name: 'Fimming',
    icon: require('~/assets/img/plant/feed/icon_fimming.svg'),
  },
  FE_TRANSPLANT: {
    component: FeedEntryTraining,
    name: 'Transplant',
    icon: require('~/assets/img/plant/feed/icon_transplant.svg'),
  },
}

export default {
  name: "feed-entry",
  props: {
    feedEntry: {
      type: Object,
      required: true,
      default: {}
    }
  },
  mounted() {
    if (this.feedEntry.params) {
      this.feedEntry.params = JSON.parse(this.feedEntry.params);
    }
  },
  methods: {
    getFeedComponent(type) {
      return (entries[type] || {}).component || UnknownCard
    },
    getFeedEntryHeading(type) {
      return (entries[type] || {}).name || 'Unknown card'
    },
    getHeaderIcon(type) {
      return (entries[type] || {}).icon || '~/assets/img/plant/feed/icon_unknown.svg'
    },
    getFormattedDate(date) {
      date = new Date(date);
      return date.toLocaleDateString();
    },
    dialogTriggered() {
      this.$emit('dialogTriggered');
    }
  }
}
</script>

<style scoped>
.feed-entry {
  padding: 12px 0;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 5px;
  width: 100%;
  max-width: 450px;
}

.feed-entry-header {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.feed-entry-header-image {
        margin-right: 10px;
    }

    .feed-entry-content {
        padding: 15px 0;
    }

    .feed-entry-footer {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
    }

    .feed-entry-footer-icon-container {
        display: flex;
    }

    .feed-entry-footer-icon {
        width: 25px;
        height: 25px;
        margin-right: 6px;
    }

    .flex-end {
        margin-right: 0;
        margin-left: auto;
    }

    .flex-start {
        margin-left: 5px;
        margin-right: auto;
        margin-top: 10px;
    }

    .clickable {
        cursor: pointer;
    }
</style>
