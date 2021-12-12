<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
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
  <section :id="$style.container">
    <div :id='$style.body' v-if="plant">
      <PlantInfo :plant="plant"></PlantInfo>
      <FeedEntry v-for="feedEntry in feedEntries" v-bind:key="feedEntry.id" :feedEntry="feedEntry" v-on:dialogTriggered="toggleDialog"></FeedEntry>
      <div :class="$style.spinner_container">
        <infinite-loading
                spinner="spiral"
                @infinite="loadNextFeedEntriesById">
          <div slot="no-more"></div>
        </infinite-loading>
      </div>
    </div>
  </section>
</template>

<script>
import {getPlantById, getFeedEntriesById} from "~/lib/plant";

export default {
  head() {
    return {
      title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout this plant in the SuperGreenLab app - Grow diary and community for growers.',
        },
      ],
    }
  },
  data() {
    return {
      plant: null,
      feedEntries: [],
      page: 0,
      pageSize: 5,
      showDialog: false
    }
  },
  mounted() {
    const { token } = this.$store.state.auth
    getPlantById(this.$route.params.id, token)
      .then(plant => {
        this.plant = plant;
        this.plant.settings = JSON.parse(this.plant.settings);
        this.plant.boxSettings = JSON.parse(this.plant.boxSettings);
      })
      .catch(err => {
        console.log(err.message);
        // if no plant is available for the input id -> navigate to 404 page
        this.$router.push('/404')
      });
    getFeedEntriesById(this.$route.params.id, token, this.pageSize, this.page)
      .then(feedEntries => {
        this.feedEntries = this.feedEntries.concat(feedEntries.entries);
      })
      .catch(err => console.log(err.message));
  },
  computed: {
    plantURL() {
      if (this.$route.params.feid) {
        return `sglapp://supergreenlab.com/public/plant?id=${this.$route.params.id}&feid=${this.$route.params.feid}`
      } else {
        return `sglapp://supergreenlab.com/public/plant?id=${this.$route.params.id}`
      }
    }
  },
  methods: {
    loadNextFeedEntriesById($state) {
      this.page++;
      const { token } = this.$store.state.auth
      getFeedEntriesById(this.$route.params.id, token, this.pageSize, this.page * this.pageSize)
        .then(feedEntries => {
          $state.loaded();
          if (feedEntries.entries && feedEntries.entries.length > 1) {
            this.feedEntries = this.feedEntries.concat(feedEntries.entries);
          } else {
            $state.complete();
          }
        })
        .catch(err => console.log(err.message));
    },
    toggleDialog(event) {
      if (this.showDialog) {
        if (event && (event.target.id === 'backdrop' || event.target.id === 'closeButton')) {
          this.showDialog = !this.showDialog;
        }
      } else {
        this.showDialog = !this.showDialog;
      }
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column

#header
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 1000

#body
  display: flex
  flex-direction: column
  flex: 1
  top: 0
  left: 0
  position: absolute
  width: 100vw
  height: auto
  align-items: center
  justify-content: flex-start
  text-align: center
  margin-top: 56px
  background-color: #E5E5E5
  padding-bottom: 175px

.button
  background-color: #3bb30b
  padding: 10pt 15pt
  border-radius: 2pt
  display: flex
  justify-content: center
  margin: 5pt 0

.button > a
  color: white
  text-decoration: none
  font-size: 1.1em

.spinner_container div
  width: 250px

.app_cta_wrapper
  background-color: #fff
  position: fixed
  bottom: 0
  height: fit-content
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.app_cta
  max-height: 420px
  max-width: 300px

.open_in_app
  font-size: 20px
  font-weight: bold
  margin-top: 5px

.open_in_app a
  color: black
  text-decoration: none

.install_app
  display: flex
  align-items: center
  justify-content: center
  text-decoration: none
  margin-bottom: 5px
  color: black

.install_app_text
  margin-right: 10px
  font-weight: bold

.install_app img
  width: 25px

.app_cta_text
  margin-top: 5px;

.ctaDialog
  background-color: rgba(0,0,0,0.6)
  position: fixed
  z-index: 1000
  left: 0
  top: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.dialog_content_wrapper
  background-color: white
  max-height: 420px
  max-width: 600px


.dialog_content
  padding: 50px 100px
  text-align: center

.closeButton
  position: realtive
  top: 0
  right: 0
  text-align: right;
  padding: 10px 20px 0 15px;
  font-size: 30px;

.closeButton span:hover
  cursor: pointer

.green
  color: #3bb30b
  margin: 0

.open_app_icon
  width: 25px



</style>