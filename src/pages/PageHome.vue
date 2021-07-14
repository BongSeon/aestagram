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
          date: 1626087723855,
          location: 'Seoul, Korea',
          imageUrl: 'https://lh3.googleusercontent.com/fife/AAWUweWbkcsPtaxSF7VCJRHzGYv3p0dX2_d0RlIQ9JlNB9FC-oJrRKJPnUMDJtFy2KYnfwsS0zMR_LHRKJE6PNxpfowDpGbEW9bD89akFLjvLs2U_pJY23qzKE2wHxSMFvmlNezbTNOa3v_Et9CS4DPadpvRR6NtG6V8DHUHO_Gn6nbHIByoMEwmyD4FmQ8EyL1w31P6Okh7TPPuP0KtpB0FCW2sEA-9f0HHdwZ94L0AgXtktAZyQYKLPHFk2SxXbEc8vfXuKw2F5JPYyzXmF5wEK0i1o_1bi7Pi9pziarblz4VRVl8S6TsK_46ivSWIl2SHdwO81XWSvkPwPjn3bDwN5K9uZJUuPxW2U4C4efLwCb85kY00P43Q-A9K9Op6UuHqw0dtxNxGvhUZ1Zpwe3jbbtuT5Eyb8Ber_BHJGYphyfLhAX22CRH-nzEAJRSyRdaUrXMEn3ec7BSlNrK9WofFFiOUh4atZKjg1I0Ogid8aXbMv7txH5sCC6BTOmLw_igWQSXifdAip2FDWk8iWXdQOjyziQvtJzbcOuKJdWMObI3kOjc9eyn-59N7z-zv7TqJSM2Kx9r2IKIVZgyS3PNMgFVau0TdS0ybKd6IB8B06ybZHGvGWDYHt7DBBc7gqi5bYAMjzTUfhRS9f538IAgfmLs6UEVV-4Q_VXXlS4Fr8c1Ze3Os0FSUcwTfFo0_8hYR05oBq-JyTHdYYhl6z81QzUENGdoxzIR2jA=w2346-h1788-ft'
        },
        {
          id: 2,
          caption: 'A dog sitting with his back to a person',
          date: 1626087723855,
          location: 'Seoul, Korea',
          imageUrl: 'https://lh3.googleusercontent.com/fife/AAWUweX9hn-ewIFUOgx7seZ8lPFXt00--LX8GflUIRMB3Kl3diDSwIlDx8BOe_gt2VWriW6H9lohYhaY9ptl1msDoIOHS0mGfT4Vn9IiJ28BAOKAR-hu9Ny1aHSJUARomeuutJRW-8c65MmX7-LI30mNlTBpmOz-JfhN_Q-Xc-Wt6On2iVzKJAz8QrVucE-qEDRC29ucaJ8hTdNmYvSVLRCHOoi2Ri61tIU46gN5x7tPDOseUqvw3IGVQejoSUzfMHrC-E_PNJPVJ9TgvJiNT7nEj3x6WSAKiITi7SuZp8n3Pv-I75q29x5t9vJfyH7uVbuUkE0F9caa6Pxdmgej7gWqm__tFZpw_cnMGwBUqpEEwcL4EG3XEpi4gSq-XaYUwMk38CxN3KQZI9tpkhE1McgFd9Su0-W0lE9mKqwnX3bULsw8UKPYO2lyyTcIuyJWGN4dzl5Ck9wQdNSRjHaYe58x8VX0Czj1J4VYZW_pe1VeskMmKYvNyBSf48RjQ3ZTRbJUik-uGsxuC9LA3xlmRf16GlHUfLakg-YjC-pcpGN0eX1VJLm8xsizlwxvxJQznBZbVXYpfFT8bRyVZZDWVWxpEhaEpftwiyLTyTieAJkPWbIW0BLT62RKF0IIn8nC98gUzlsJqTWWHQYdtiGkVRTW0WLhdQoqDVt9PVwMQHJdLKxferKyIM5rLIpwL52ztKeBR6Q8su4s0GQAqCIhWdF91gvjkO84epfkRA=w2346-h1788-ft'
        },
        {
          id: 3,
          caption: 'A dog sitting with his back to a person',
          date: 1626087723855,
          location: 'Seoul, Korea',
          imageUrl: require('../assets/dog3.jpeg'), 
        }
      ]
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:ssA')
    }
  }
  
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
