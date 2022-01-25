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
      <h1>Got a SGL Bundle?</h1>
      Get your first complete grow for free! (5 months, let me know if you need an extension)
    </div>
    <div :id='$style.order'>
      <div :id='$style.orderinputs'>
        <div :class='$style.input'>
          <PaymentInput label='Order #' name='order' />
        </div>
      </div>
      <div :id='$style.check'>
        <Cta :onClick='check' :nomargin='true'>CHECK</Cta>
      </div>
    </div>
    <div :id='$style.horiz'>
      <div :id='$style.left'>
        <div :id='$style.title'>
          <h1>Payments informations</h1>
        </div>
        <div :id='$style.payment'>
          <div :id='$style.paymentinputs'>
            <div :class='$style.input'>
              <PaymentInput label='Card number' name='cardnum' />
            </div>
            <div :id='$style.expirescvc'>
              <div :class='$style.input'>
                <PaymentInput label='Expires' name='expiresm' />
              </div>
              <div :id='$style.slash'>/</div>
              <div :class='$style.input'>
                <PaymentInput label='⠀' name='expiresy' :optional=true />
              </div>
              <div :class='$style.input'>
                <PaymentInput label='CVC' name='cvc' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :id='$style.right'>
        <div>First month is <b>FREE</b></div>
        <div :id='$style.pricetag'>Then <span :id='$style.biggreen'>$4.20</span></div>
        <div :id='$style.period'>/MONTH</div>
        <div :id='$style.bundle'>Got a SGL bundle? <b>Get your first grow free.</b></div>
        <div :id='$style.thanks'><b>Thanks for your support</b> 💚</div>
        <Cta :onClick='onSubscribe'>SUBSCRIBE</Cta>
        <img src='~/assets/img/premium/icon_stripe.png' height='100px' />
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    check() {
      console.log('check')
    },
    onSubscribe() {
      this.$store.dispatch('payment/createPayment')
    },
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

#container h1
  margin: 0 !important

#container b
  font-weight: 600

#title
  display: flex
  flex-direction: column
  color: #676767
  margin-bottom: 20px

#order
  display: flex
  align-items: flex-end
  margin-bottom: 25px

#orderinputs
  display: flex
  max-width: 120px

#paymentinputs
  display: flex
  flex-direction: column

#paymentinputs > .input
  max-width: 400px

.input, #check
  padding: 0 30px 15px 0

#horiz
  display: flex

#left
  flex: 1

#expirescvc
  display: flex

#expirescvc > div:nth-of-type(1)
  width: 70px
  padding: 0 0 15px 0 !important

#expirescvc > div:nth-of-type(3)
  width: 100px

#slash
  font-size: 1.5em
  align-self: flex-end
  margin-bottom: 20px

#right
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

#thanks
  margin: 4px 0 4px 0
  white-space: nowrap
  > b
    color: #3bb30b
    font-weight: 600

</style>
