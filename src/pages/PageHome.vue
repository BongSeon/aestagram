<template>
  <q-page
    class="constrain q-pa-md"
  >
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post q-mb-md"
            :class="{ 'bg-red-1' : post.offline }"
            flat
            bordered
          >
          <q-badge
            v-if="post.offline"
            class="badge-offline absolute-top-right q-mt-xs q-mr-xs"
            color="red"
          >
            stored offline
          </q-badge>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://blogpfthumb-phinf.pstatic.net/MjAyMDEwMDVfMTIx/MDAxNjAxOTAyNDgyNTMx.BSriRdPZ1q6zf_4_AnoyxTlNqeP3j8LPdDatjWjZAqcg.U9aLxWjubNO3KaV40_CQL5JBRHkAQskruUIYma9mpQgg.JPEG.iissy85/MU.jpeg?type=w161">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>aestas_kwak</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />
          
          <q-img
            :src="post.imageUrl"
          />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ post.date | niceDate }}</div>
          </q-card-section>

          </q-card>
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-grey text-center">No Posts Yet.</h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://blogpfthumb-phinf.pstatic.net/MjAyMDEwMDVfMTIx/MDAxNjAxOTAyNDgyNTMx.BSriRdPZ1q6zf_4_AnoyxTlNqeP3j8LPdDatjWjZAqcg.U9aLxWjubNO3KaV40_CQL5JBRHkAQskruUIYma9mpQgg.JPEG.iissy85/MU.jpeg?type=w161">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>aestas_kwak</q-item-label>
            <q-item-label caption>
              Aestas Kwak
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { openDB } from 'idb'

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [],
      loadingPosts: false
    }
  },
  computed: {
    serviceWorkerSupported() {
      if ('serviceWorker' in navigator) return true
      return false
    }
  },
  methods: {
    getPosts() {
      this.loadingPosts = true
      this.$axios.get(`${ process.env.API }/posts`).then(response => {
        this.posts = response.data
        this.loadingPosts = false
        
        // get offline posts
        if (!navigator.onLine) {
          this.getOfflinePost()
        }
      }).catch(err => {
        this.$q.dialog({
          title: 'Error',
          message: '포스트를 가져올 수 없습니다.'
        })
        this.loadingPosts = false
      })
    },
    getOfflinePost() {
      let db = openDB('workbox-background-sync').then(db => {
        db.getAll('requests').then(failedRequests => {
          //console.log('failedRequests: ', failedRequests)
          failedRequests.forEach(failedRequest => {
            if (failedRequest.queueName == 'createPostQueue') {
              let request = new Request(failedRequest.requestData.url, failedRequest.requestData)
              request.formData().then(formData => {
                let offlinePost = {}
                offlinePost.id = formData.get('id')
                offlinePost.caption = formData.get('caption')
                offlinePost.location = formData.get('location')
                offlinePost.date = parseInt(formData.get('date'))
                offlinePost.offline = true

                let reader = new FileReader()
                reader.readAsDataURL(formData.get('file'))
                reader.onloadend = () => {
                  offlinePost.imageUrl = reader.result
                  this.posts.unshift(offlinePost) // posts[] 맨처음에 삽입
                }

              })
            }
          })
        }).catch(err => {
          console.log('Error accessing IndexedDB: ', err);
        })
      })
    },
    listenForOfflinePostUploaded() {
      if (this.serviceWorkerSupported) {
        console.log('listenForOfflinePostUploaded');
        const channel = new BroadcastChannel('sw-messages')
        channel.addEventListener('message', event => {
          console.log('Received', event.data);
          if (event.data.msg == 'offline-post-uploaded') {
            let offlinePostCount = this.posts.filter(post => post.offline == true).length
            this.posts[offlinePostCount -1].offline = false
          }
        })
      }
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:ssA')
    }
  },
  activated() {
    // 매번 실행된다.
    this.getPosts()
  },
  created() {
    // MainLayout에서 keep-alive를 적용했기 때문에 created 훅은 한번만 실행된다.
    this.listenForOfflinePostUploaded()
  }
}
</script>

<style lang="sass">
  .card-post
    .badge-offline
      border-radius: 4px !important
    .q-img
      min-height: 200px
</style>
