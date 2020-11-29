<template>
  <section v-if="this.trip" class="trip-preview" @click="goToDetails(trip._id)">
    <img
      class="trip-preview-img"
      :src="require('../../assets/img/trips/' + this.trip.imgUrls[0])"
    />
    <div class="trip-preview-info">
      <h2 class="trip-preview-title">{{ this.trip.name }}</h2>

      <div class="trip=preview-info-container flex space-around">
        <div class="trip-preview-guide-details">
          <p>Guide: {{ this.trip.aboutGuide.name }}</p>
          <p>{{ this.trip.aboutGuide.rate }}</p>
          <p>
            <i v-for="n in 5" :key="n" class="fas fa-star trip-star-rate"></i>
          </p>
        </div>

        <div class="trip-preview-trip-details">
          <p class="trip-preview-date">{{ this.trip.date }}</p>
          <p>{{ this.trip.capacity }}/10 trippers</p>
          <p @click.stop="emitFav(this.trip)"><i :class="fav"></i></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {tripService} from '../../services/trip-service.js';

export default {
  props: {
    // trip: {
    //   type: Object,
    //   required: true,
    // },
    tripId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isFav: false,
      trip: null
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
    
    checkIsFav() {
      const user = this.getCurrUser;
      const userFavs = user.favoriteTrips;
      let isInFav = userFavs.some((userFav) => userFav._id.includes(this.trip._id));
      this.isFav = isInFav;
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
      if (this.isFav) return "fas fa-heart";
      else return "far fa-heart";
    },

    getCurrUser() {
      return this.$store.getters.loggedinUser;
    }
  },

  async created() {
    this.trip = await tripService.getTripById(this.tripId);
    this.checkIsFav();
  }
};
</script>

<style></style>
