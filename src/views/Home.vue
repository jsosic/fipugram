<template>
  <div class="row">
    <div class="col-8">
      <div v-if="authenticated">
<<<<<<< HEAD
        <form @submit.prevent="postImage" class="mb-5">
          <croppa :width="400" :height="400" v-model="imageData"></croppa>
          <button type="submit" class="btn btn-primary ml-2">Post image</button>
=======
        <form class="post-container" @submit.prevent="postImage">
          <croppa :width="400" :height="400" v-model="imageData"></croppa>
          <button type="submit" class="btn btn-post btn-primary mb-5">Post</button>
>>>>>>> a7bab374612a3d7f4bf35cd6998be1928cb389a7
        </form>

        <InstagramCard :key="card.id" :info="card" v-for="card in filteredCards" />
      </div>
    </div>
    <div class="col-4">Trazimo sljedece: {{ searchTerm }}</div>
  </div>
</template>

<script>
<<<<<<< HEAD
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
=======
import InstagramCard from "@/components/InstagramCard";
import "vue-croppa/dist/vue-croppa.css";
import store from "@/store";
import utils from "@/utils";
>>>>>>> a7bab374612a3d7f4bf35cd6998be1928cb389a7

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
  },
  methods: {
    postImage() {
      this.imageData.generateBlob(blobData => {
        if (blobData != null) {
          // ako koristimo "/" u nazivu slike, Storage fino napravi direktorij.
          // Konkretno u ovom primjeru imat ćemo direktorij nazvan po mailu korisnika.
          // Slika će biti nazvana po trenutnom vremenu kako bi imali jedinstveni naziv slike.
          let imageName = this.userEmail + "/" + Date.now() + ".png";

          storage
            .ref(imageName)
            .put(blobData)
            .then(result => {
              result.ref.getDownloadURL()
                .then(url => {
                  db.collection("posts")
                    .add({
                      email: this.userEmail,
                      posted_at: Date.now(),
                      url: url
                    })
                    .then(docRef => {
                      console.log("Document written with ID: ", docRef.id);
                      this.imageData = null;
                    })
                    .catch(e => {
                      console.error("Error adding document: ", error);
                    });
                })
                .catch(e=> {
                  console.error(e)
                })
            })
            .catch(e => {
              console.error(e)
            })
        }
      }); // da... zatvaranje zagrada nakon ovoga noćna je mora!
    }
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

.btn-post {
  width: 200px;
}

.croppa-container {
  border: 3px dashed gray;
  width: 400px;
  display: block;
  margin-bottom: 10px;
}
</style>