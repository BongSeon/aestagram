<template>
  <q-page
    class="constrain q-pa-md"
  >
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
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
      </div>
      <div class="col-4">
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

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'A dog sitting with his back to a person',
          date: 1626087722222,
          location: 'Seoul, Korea',
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/aestagram-kwak.appspot.com/o/dog1.jpg?alt=media&token=dc5e28db-ebef-4f35-8b42-20571b0e63bf'
        },
        {
          id: 2,
          caption: 'A dog sitting with his back to a person',
          date: 1626087723855,
          location: 'Seoul, Korea',
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/aestagram-kwak.appspot.com/o/dog2.jpg?alt=media&token=7b17d815-7aa8-4053-87f1-bd42796b9fb6'
        },
        {
          id: 3,
          caption: 'A dog sitting with his back to a person',
          date: 1626087744855,
          location: 'Seoul, Korea',
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/aestagram-kwak.appspot.com/o/dog3.jpg?alt=media&token=d8d082a2-84d3-4c37-83cf-7f5260dad0fe'
          //imageUrl: require('../assets/dog3.jpeg'), 
        }
      ]
    }
  },
  methods: {
    getPosts() {
      this.$axios.get('http://localhost:3000/posts').then(response => {
        response.data.forEach(post => {
          this.posts.push(post)
        });
      }).catch(err => {
        console.log("axios get error: ", err)
      })
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:ssA')
    }
  },
  created() {
    this.getPosts()
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
