<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video 
        ref="video"
        class="full-width"
        autoplay
      />
      <canvas
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pt-lg">
      <q-btn
        @click="captureImage"
        round
        color="grey-10"
        size="lg"
        icon="eva-camera"
      />
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          class="col col-sm-6"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Post Image"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
require('md-gum-polyfill')

export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        caption: '',
        location: '',
        id: uid()
      }
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      let context = canvas.getContext('2d')
      context.drawImage(video, 0,0, canvas.width, canvas.height)
    }
  },
  mounted() {
    this.initCamera()
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px
</style>
