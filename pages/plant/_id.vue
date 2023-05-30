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
    <PlantInfo v-if='plant' :plant="plant"></PlantInfo>
    <Feed v-if='plant' :lib='lib' :plant='plant' v-on:dialogTriggered="dialogTriggered" v-on:shareDialogTriggered='shareDialogTriggered' />
    <portal-target name='root'>
    </portal-target>
    <!-- This div is hidden, unless the page is interacted with -->
    <div v-show="showDialog" :class="$style.ctaDialog" ref="ctaDialog" v-on:click="dialogTriggered($event)" id="backdrop">
      <div :class="$style.dialog_content_wrapper">
        <div :class="$style.closeButton">
          <span aria-hidden="true" id="closeButton">×</span>
        </div>
        <div :class="$style.dialog_content">
          <div :class="$style.app_cta">
            Open the diary in the app to participate!<br />
            <div :class='$style.button'><a :href='url'>Open public plant in the app</a></div>
            <div>
              <div :class="$style.app_cta_text">Don't have the app installed yet?<br /></div>
              <div :class='$style.button'><nuxt-link to='/app'><img src='~/assets/img/playstore.png' /><img src='~/assets/img/appstore.png' /><br />Install the app</nuxt-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This div is hidden, unless the page is interacted with -->
    <div v-show="showSharingDialog" :class="$style.ctaDialog" ref="ctaDialog" id="backdrop">
      <div :class="$style.sharing_dialog_content_wrapper">
        <div :class="$style.closeButton" v-on:click="shareDialogTriggered($event)">
          <span aria-hidden="true" id="closeButton">×</span>
        </div>
        <div :class="$style.sharing_dialog_content">
          <div :class="$style.loading"><Loading width='120px' height='60px' /></div>
          <h2>Social media friendly formats:</h2>
          <img v-for='img in sharingMedias' :class='$style.sharingPic' :src='`https://api2.supergreenlab.com/share/feedMedia/${img.id}`' />
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import * as lib from "~/lib/plant";
import Loading from "~/components/Loading";

const wrapToken = (lib, token) => Object.keys(lib).reduce((acc, k) => Object.assign(acc, {}, {[k]: function() { return lib[k](token, ...arguments) }}), {})

export default {
  layout: 'menu',
  components: { Loading, },
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
      showDialog: false,
      showSharingDialog: false,
      sharingMedias: [],
    }
  },
  async mounted() {
    const { token } = this.$store.state.auth
    const plant = await lib.getPlantById(token, this.$route.params.id)
    console.log(plant)
    this.plant = plant;
  },
  computed: {
    lib() { return wrapToken(lib, this.$store.state.auth.token) },
    plantID() {
      return this.$route.params.id
    }
  },
  methods: {
    dialogTriggered(event) {
      if (this.showDialog) {
        if (event && (event.target.id === 'backdrop' || event.target.id === 'closeButton')) {
          this.showDialog = !this.showDialog;
        }
      } else {
        this.showDialog = !this.showDialog;
      }
    },
    shareDialogTriggered(event) {
      if (this.showDialog) {
        if (event && (event.target.id === 'backdrop' || event.target.id === 'closeButton')) {
          this.showSharingDialog = !this.showSharingDialog;
        }
      } else {
        this.sharingMedias = event
        this.showSharingDialog = !this.showSharingDialog;
      }
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  flex: 1

</style>
