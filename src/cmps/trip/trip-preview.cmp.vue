<template>
  <section class="trip-preview" @click="goToDetails(trip._id)">
      <img :src="`${trip.imgUrls[0]}`" alt="">
      <h1>{{trip.name}}</h1>
      <h3>{{trip.date}}</h3>
      <p>{{trip.aboutGuide.name}}</p>
      <p>{{trip.aboutGuide.rate}}</p>
      <p>
          <i v-for="n in 5" :key="n" class="fas fa-star"></i>
      </p>
      <p>{{trip.capacity}}/10 trippers</p>
      <p @click.stop="emitFav(trip._id)"><i :class="fav"></i></p>
  </section>
</template>

<script>
export default {
    props: {
        trip: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            user: null,
            isFav: false
        }
    },

    name: 'trip-preview',

    methods: {
       emitFav(id) {
           this.$emit('emitFav', id);
           this.isFav = !this.isFav;
       },
         
       goToDetails(id) {
          this.$router.push(`/trip/${id}`);
       } 
    },

    computed: {
        starsAmount() {
            let rate = this.trip.guide.rate;
            let starsAmount = [];
            for (let i = 0; i < rate; i++) {
                starsAmount.push(i);
            }
            return starsAmount;
        },

        fav() {
            if (this.isFav) return 'fas fa-heart';
            else return 'far fa-heart';
        },

        dateForDisplay() {
            return this.trip.date.toLocaleDateString();
        }
    },

    created() {
        
    }
}
</script>

<style>

</style>