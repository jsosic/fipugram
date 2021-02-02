<template>
    <div class="row">
        <div class="col-8">
            <img v-if="loading" class="loading" :src="require('@/assets/loading.gif')" />
            <form v-if="!loading" @submit.prevent="postNewImage" class="mb-5">
                <div class="form-group">
                    <croppa :width="400" :height="400" placeholder="Učitaj sliku..." v-model="imageReference"></croppa>
                </div>
                <div class="form-group">
                    <label for="imageDescription">Description</label>
                    <input
                        v-model="newImageDescription"
                        type="text"
                        class="form-control ml-2"
                        placeholder="Enter the image description"
                        id="imageDescription"
                    />
                </div>
                <button type="submit" class="btn btn-primary ml-2">Post image</button>
            </form>
            <instagram-card v-for="card in filteredCards" :key="card.id" :info="card" />
        </div>
        <div class="col-4">
            Sidebar
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store';
import { db, storage } from '@/firebase';

//... API/Firebase -> sve kartice -> cards

// cards = [
//     { url: 'https://picsum.photos/id/1/400/400', description: 'laptop', time: 'few minutes ago...' },
//     { url: 'https://picsum.photos/id/2/400/400', description: 'laptop #2', time: 'hour ago...' },
//     { url: 'https://picsum.photos/id/3/400/400', description: 'laptop #3', time: 'few hours ago...' },
// ];

export default {
    name: 'home',
    data: function() {
        return {
            loading: false,
            cards: [],
            store,
            newImageDescription: '',
            newImageUrl: '',
            imageReference: null,
        };
    },
    mounted() {
        this.getPosts();
        //
        //
    },
    methods: {
        getPosts() {
            console.log('firebase dohvat...');

            db.collection('posts')
                .orderBy('posted_at', 'desc')
                .limit(10)
                .get()
                .then((query) => {
                    this.cards = [];
                    query.forEach((doc) => {
                        const data = doc.data();
                        console.log(data);

                        this.cards.push({
                            id: doc.id,
                            time: data.posted_at,
                            description: data.desc,
                            url: data.url,
                        });
                    });
                });
        },
        getImage() {
            // Promise based, omotač oko callbacka
            return new Promise((resolveFn, errorFn) => {
                this.imageReference.generateBlob((data) => {
                    resolveFn(data);
                });
            });
        },
        async postNewImage() {
            try {
                this.loading = true;
                let blobData = await this.getImage();
                let imageName = 'posts/' + store.currentUser + '/' + Date.now() + '.png';
                let result = await storage.ref(imageName).put(blobData);
                let url = await result.ref.getDownloadURL(); // Promise

                // čuva
                console.log('Javni link', url);

                const imageDescription = this.newImageDescription;

                let doc = await db.collection('posts').add({
                    url: url,
                    desc: imageDescription,
                    email: store.currentUser,
                    posted_at: Date.now(),
                });
                console.log('Spremljeno', doc);

                this.getPosts();
            } catch (e) {
                console.error('Greška', e);
            }
            this.loading = false;
        },
    },
    computed: {
        filteredCards() {
            // logika koja filtrira cards
            let termin = this.store.searchTerm;

            return this.cards.filter((card) => card.description.includes(termin));
        },
    },
    components: {
        InstagramCard,
    },
};
</script>

<style scoped>
.loading {
    width: 400px;
}
</style>
