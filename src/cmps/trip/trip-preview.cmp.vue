<template>
  <section class="trip-preview">
      <img :src="`${trip.imgUrls[0]}`" alt="">
      <h1>{{trip.name}}</h1>
      <h3>{{trip.date}}</h3>
      <p>{{trip.guide.name}}</p>
      <p>{{trip.guide.rate}}</p>
      <p>{{trip.guid.difficulty}}</p>
      <p>{{booked}}/5 trippers</p>
  </section>
</template>

<script>
export default {
    props: {
        trip: {
            type: Object
        },
        booked: {
            type: Number
        }
    },

    name: 'trip-preview',

    methods: {
       emitFav(id) {
           this.$emit('emitFav', id);
       } 
    },

    computed: {
        // rateStars() {
        //     let rate = trip.guide.rate;
        //     let starsStr = '';
        //     for (let i = 0; i < rate; i++) {
        //         starsStr += '<i class="fas fa-star"></i>';
        //     };
        //     return starsStr;
        // }
    }
}
</script>

<style>

</style>