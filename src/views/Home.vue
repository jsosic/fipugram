<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-7">

      <InstagramCard />

    </div>
    <div class="col-3">
      Ovdje ide sidebar
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue'

export default {
  name: 'home',
  components: {
    InstagramCard
  }
}
</script>

<style lang="scss">

  .card {
    margin-bottom: 20px;
  }
</style>