<template>
  <section class="trip-preview" @click="goToDetails(trip._id)">
    <img
      class="trip-preview-img"
      :src="require('../../assets/img/trips/' + trip.imgUrls[0])"
    />
    <div class="trip-preview-info">
      <h2 class="trip-preview-title">{{ trip.name }}</h2>
      <h3 class="trip-preview-date">{{ trip.date }}</h3>
      <p>{{ trip.aboutGuide.name }}</p>
      <p>{{ trip.aboutGuide.rate }}</p>
    </div>
    <p>
      <i v-for="n in 5" :key="n" class="fas fa-star"></i>
    </p>
    <p>{{ trip.capacity }}/10 trippers</p>
    <p @click="emitFav"><i :class="fav"></i></p>
  </section>
</template>

<script>
export default {
  //What about stars? thought to create an array w/ loop and the v-for the icons. overkill?
  props: {
    trip: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isFav: false,
    };
  },

  name: "trip-preview",

  methods: {
    emitFav(id) {
      this.$emit("emitFav", id);
      this.isFav = !this.isFav;
    },

    goToDetails(id) {
      this.$router.push(`/trip/${id}`);
    },
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
      if (this.isFav) return "fas fa-heart";
      else return "far fa-heart";
    },

    dateForDisplay() {
      return this.trip.date.toLocaleDateString();
    },
  },
};
</script>

<style>
</style>