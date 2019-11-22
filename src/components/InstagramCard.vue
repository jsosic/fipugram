<template>

      <div class="card">
        <div class="card-header text-left">
          Featured
        </div>
        <div class="card-body p-0">
          <img class="card-img-top" src="/gold-tooth.jpg" alt="Covjek sa zlatnim zubima">
        </div>
        <div class="card-footer text-muted text-left">
          2 days ago
        </div>
      </div>

</template>

<script>
export default {
  name: 'InstagramCard',
  props: {
    msg: String
  }
}
</script>
