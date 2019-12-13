<template>
  <div class="row">
    <div class="col-8">

      <div v-if="authenticated">

        <form @submit.prevent="postImage">
          <div class="form-group">
            <input v-model="postImageUrl" type="text" class="form-control" placeholder="Paste the image URL">
          </div>
          <button type="submit" class="btn btn-primary mb-5">Post</button>
        </form>

        <InstagramCard :key="card.id" :info="card" v-for="card in filteredCards" />
      </div>

    </div>
    <div class="col-4">
      Trazimo sljedece: {{ searchTerm }}
    </div>
  </div>
</template>

<script>
import InstagramCard from '@/components/InstagramCard.vue'
import store from '@/store.js'

export default {
  data () {
    return store;
  },
  computed: {
    filteredCards () {
      // let filtered = []
      // for(let card of this.cards) {
      //   if (card.title.includes(this.searchTerm)) {
      //     filtered.push(card)
      //   }
      // }
      // return filtered;
      return this.cards.filter(card => card.postedBy.includes(this.searchTerm));
    }
  },
  methods: {
    postImage () {
      db.collection("posts-real").add({
        postedBy: this.userEmail, 
        time: Date.now(), 
        url: this.postImageUrl
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.postImageUrl = ''
    }
  },
  name: 'home',
  components: {
    InstagramCard
  }
}
</script>

<style lang="scss">

.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}
</style>