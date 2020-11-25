<template>
  <section class="trip-preview">
      <img :src="`${trip.imgUrls[0]}`" alt="">
      <h1>{{trip.name}}</h1>
      <h3>{{trip.date}}</h3>
      <p>{{trip.guide.name}}</p>
      <p>{{trip.guide.rate}}</p>
      <!-- <p><i :class="rateStars"></i></p> -->
      <p>{{booked}}/5 trippers</p>
      <p><i :class="fav"></i></p>
  </section>
</template>

<script>
export default {
    // How to get the 'isFav' property?? another prop?
    //What about stars? thought to create an array w/ loop and the v-for the icons. overkill?
    props: {
        trip: {
            type: Object,
            required: true
        },
        booked: {
            type: Number
        }
    },

    data() {
        return {
            isFav = false
        }
    },

    name: 'trip-preview',

    methods: {
       emitFav(id) {
           this.$emit('emitFav', id);
           this.isFav = !isFav;
       } 
    },

    computed: {
        // rateStars() {
        //     let rate = this.trip.guide.rate;
        //     let starsStr = '';
        //     for (let i = 0; i < rate; i++) {
        //         starsStr += '"fas fa-star"';
        //     };
        //     return starsStr;
        // },

        fav() {
            if (this.isFav) return 'fas fa-heart"';
            else return '"far fa-heart"';
        }
    }
}
</script>

<style>

</style>