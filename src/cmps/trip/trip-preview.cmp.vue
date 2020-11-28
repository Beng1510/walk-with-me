<template>
  <section class="trip-preview" @click="goToDetails(trip._id)">
    <img
      class="trip-preview-img"
      :src="require('../../assets/img/trips/' + trip.imgUrls[0])"
    />
    <div class="trip-preview-info">
      <h2 class="trip-preview-title">{{ trip.name }}</h2>

      <div class="trip=preview-info-container flex space-around">

        <div class="trip-preview-guide-details">
          <p>Guide: {{ trip.aboutGuide.name }}</p>
          <p>{{ trip.aboutGuide.rate }}</p>
          <p>
            <i v-for="n in 5" :key="n" class="fas fa-star trip-star-rate"></i>
          </p>
        </div>

        <div class="trip-preview-trip-details">
          <p class="trip-preview-date">{{ trip.date }}</p>
          <p>{{ trip.capacity }}/10 trippers</p>
          <p @click="emitFav"><i :class="fav"></i></p>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    trip: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      user: null,
      isFav: false,
    };
  },

  name: "trip-preview",

  methods: {
    emitFav(trip) {
      this.$emit("emitFav", trip);
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