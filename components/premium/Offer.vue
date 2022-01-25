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
  <section :id='$style.container'>
    <div :id='$style.title'>
      <img src='~/assets/img/premium/icon_premium.svg' /><h1>UPGRADE TO PREMIUM</h1>
    </div>
    <div :id='$style.horiz'>
      <div :id='$style.left'>

        <div :class='$style.prop'>
          <div :class='$style.proppic'>
            <img src='~/assets/img/premium/icon_timelapse.svg' />
          </div>
          <div>
            <b>Receive daily and weekly timelapses directly in your app’s feed.</b><br/>
            By far the best and most reliable way to spot issues before they arrive. At the end of the day, the one that tells if the environment is right is the plant itself. And if there’s one thing that tells the story, is the plant’s movements.
          </div>
        </div>

        <div :class='$style.prop'>
          <div :class='$style.proppic'>
            <img src='~/assets/img/premium/icon_tips.svg' />
          </div>
          <div>
            <b>Get analysis hints to not miss anything from your timelapses.</b><br />
            Learn to identify the various movements of the plant. See when it’s thirsty, or about to lack nutrients, or just happy to be in its box:)
          </div>
        </div>

        <div :class='$style.prop'>
          <div :class='$style.proppic'>
            <img src='~/assets/img/premium/icon_AI.svg' />
          </div>
          <div>
            <b>Help us build an AI that will tell you what’s going on by itself.</b><br />
            By activating your premium timelapse feature you’re helping us build an AI that will be able to analyse your timelapses, and make alerts when things go wrong.
          </div>
        </div>

        <div :class='$style.prop'>
          <div :class='$style.proppic'>
            <img src='~/assets/img/premium/icon_discord.png' />
          </div>
          <div>                          
            <b>7/7 live support.</b><br /> 
            From the camera setup to plant tips, you wont be alone in you quest to better plants.
          </div>
        </div>

      </div>
      <div :id='$style.right'>
        <div :class='$style.recap'>
          💾 Unlimited number of <b>frame storage</b>
        </div>
        <div :class='$style.recap'>
          🎥 Unlimited <b>concurrent timelapses</b>
        </div>
        <div :class='$style.recap'>
          📼 <b>Daily and weekly timelapses generation</b>, at the time and day of your choice
        </div>
        <div :class='$style.recap'>
          🎞️ <b>Complete timelapse</b> of your plant from seed to harvest.
        </div>
        <div :class='$style.recap'>
          🤖 Coming soon: AI analysis of your plant’s movement.
        </div>
        <div :id='$style.price'>
          <div>First month is <b>FREE</b></div>
          <div :id='$style.pricetag'>Then <span :id='$style.biggreen'>$4.20</span></div>
          <div :id='$style.period'>/MONTH</div>
          <div :id='$style.bundle'>Got a SGL bundle? <b>Get your first grow free.</b></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style module lang=stylus>

#container
  position: relative
  display: flex
  flex-direction: column
  width: 100%
  @media only screen and (max-width: 600px)
    padding: 20pt 15pt

#body > h1
  text-transform: uppercase

#body b
  font-weight: 600

#horiz
  display: flex
  @media only screen and (max-width: 1000px)
    flex-direction: column

#title
  display: flex
  align-items: center
  color: #676767

#title > img
  margin-right: 10px

#left
  display: flex
  flex-direction: column
  margin: 15px

#right
  display: flex
  flex-direction: column
  margin: 15px

.prop
  display: flex
  color: #636363
  align-items: center
  margin-bottom: 20px
  @media only screen and (max-width: 500px)
    flex-direction: column

.proppic
  display: flex
  align-items: center
  justify-content: center
  min-width: 120px
  @media only screen and (max-width: 500px)
    min-width: auto
    margin-bottom: 30px

.recap
  margin-bottom: 20px
  color: #636363

#price
  display: flex
  flex-direction: column
  align-items: flex-end
  text-align: right
  color: #636363

#biggreen
  color: #3bb30b
  font-size: 2em
  font-weight: 600

#pricetag
  margin: 4px 0 4px 0

#period
  font-size: 1.25em

#bundle
  font-size: 0.8em
  margin: 4px 0 4px 0
  white-space: nowrap
  > b
    color: #3bb30b
    font-weight: 600

#cta
  text-decoration: none
  border-radius: 2pt
  margin-top: 10px
  padding: 10pt 30pt
  background-color: #3bb30b
  color: white
  text-transform: uppercase
  cursor: pointer
  font-weight: 600

</style>
