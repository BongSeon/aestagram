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
      posts: []
    }
  },
  methods: {
    getPosts() {
      this.$axios.get('http://localhost:3000/posts').then(response => {
        this.posts = response.data
      }).catch(err => {
        this.$q.dialog({
          title: 'Error',
          message: '포스트를 가져올 수 없습니다.'
        })
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
