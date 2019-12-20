<template>
  <div class="row">
    <div class="col-8">
      <div v-if="authenticated">
        <form class="post-container" @submit.prevent="postImage">
          <croppa :width="400" :height="400" v-model="imageData"></croppa>
          <button type="submit" class="btn btn-post btn-primary mb-5">Post</button>
        </form>

        <InstagramCard :key="card.id" :info="card" v-for="card in filteredCards" />
      </div>
    </div>
    <div class="col-4">Trazimo sljedece: {{ searchTerm }}</div>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard";
import "vue-croppa/dist/vue-croppa.css";
import store from "@/store";
import utils from "@/utils";

export default {
  data() {
    return store;
  },
  computed: {
    filteredCards() {
      // let filtered = []
      // for(let card of this.cards) {
      //   if (card.title.includes(this.searchTerm)) {
      //     filtered.push(card)
      //   }
      // }
      // return filtered;
      return this.cards.filter(card => {
        return (
          utils.isValidURL(card.url) && card.postedBy.includes(this.searchTerm)
        );
      });
    }
  },
  methods: {
    postImage() {
      this.imageData.generateBlob(data => {
        if (data != null) {
          let imageName = this.userEmail + "/slika.png";
          storage.ref(imageName).put(data).then(() => {
            db.collection("posts-real")
              .add({
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
          })
        }
      })
      this.postImageUrl = "";
    }
  },
  name: "home",
  components: {
    InstagramCard
  }
};
</script>


<style lang="scss">

.btn-post {
  width: 200px;
}
.croppa-container {
  width: 400px;
  display: block;
  margin-bottom: 10px;
}

.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}
</style>