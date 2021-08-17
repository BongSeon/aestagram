<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
    >
      <q-toolbar
        class="constrain"
      >
        <q-btn
          to="/camera"
          class="large-screen-only q-mr-sm"
          icon="eva-camera-outline"
          size="18px"
          flat
          round
          dense
        />
        <q-separator
          class="large-screen-only"
          vertical
          spaced
        />
        <q-toolbar-title class="text-grand-hotel text-bold">
          Aestagram
        </q-toolbar-title>
        <q-btn
          to="/"
          class="large-screen-only"
          icon="eva-home-outline"
          size="18px"
          flat
          round
          dense
        />
      </q-toolbar>
    </q-header>

    <q-footer
      class="bg-white"
      bordered
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-if="showAppInstallBanner"
          class="banner-container bg-primary"
        >
          <div class="constrain">
            <q-banner
              inline-actions
              class="bg-primary text-white"
              dense
            >
              <template v-slot:avatar>
                <q-avatar
                  class="q-mt-3px"
                  color="white"
                  icon="eva-monitor-outline"
                  text-color="grey-10"
                  font-size="20px"
                />
              </template>
              <b>Install Aestagam?</b>

              <template v-slot:action>
                <q-btn
                  @click="installApp"
                  class="q-px-sm"
                  flat
                  label="Yes"
                  dense
                />
                <q-btn
                  @click="showAppInstallBanner = false"
                  class="q-px-sm"
                  flat
                  label="Later"
                  dense
                />
                <q-btn
                  @click="neverShowAppInstallBanner"
                  class="q-px-sm"
                  flat
                  label="Never"
                  dense
                />
              </template>
            </q-banner>
          </div>
        </div>
      </transition>
      <q-tabs
        class="text-grey-10 small-screen-only"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/"
          icon="eva-home-outline"
        />
        <q-route-tab
          to="/Camera"
          icon="eva-camera-outline"
        />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <!-- PageHome 페이지만 keep alive 적용 -->
      <keep-alive :include="['PageHome']">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerFacebook } from 'quasar';
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt

export default {
  name: 'MainLayout',
  data () {
    return {
      showAppInstallBanner: false
    }
  },
  methods: {
    async installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);
      if (outcome === 'accepted')
      {
      } else {
      }
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null;
    },
    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false
      this.$q.localStorage.set('neverShowAppInstallBanner', true)
    }
  },
  mounted() {
    const value = this.$q.localStorage.getItem('neverShowAppInstallBanner')
    if (value != true) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        deferredPrompt = e
        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true
        }, 3000);
      })
    }
  }
}
</script>

<style lang="sass">
  .q-toolbar
    @media (min-width: $breakpoint-sm-min)
      height: 77px
  .q-toolbar__title
    font-size: 30px
    @media (max-width: $breakpoint-xs-max)
      text-align: center  
  .q-footer
    .q-tab__icon
      font-size: 30px
</style>