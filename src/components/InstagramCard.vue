<template>

      <div class="card text-center mb-5">
        <div class="card-header text-left">
          By: <strong>{{ info.postedBy }}</strong>
        </div>
        <div class="card-body">
          <img @click="changeImage" class="card-img-top" :src="info.url" alt="Maznusmo s unsplasha i bilo bi lijepo da napisemo cija je slika">
        </div>
        <div class="card-footer text-left">
          {{ timeAgo }}
        </div>
      </div>

</template>

<script>
import moment from 'moment'

export default {
  props: [ "info" ],
  methods: {
    changeImage() {
      this.info.time = 'Fetching...'
      fetch("https://source.unsplash.com/1600x900/?nature,water").then(response => {
        this.info.url = response.url
        this.info.time = 'Done.'
      })
    }
  },
  computed: {
    timeAgo() {
      return moment(this.info.time).fromNow()
    }
  }
}
</script>
