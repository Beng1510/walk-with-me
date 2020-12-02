<template>
  <section
    v-if="this.trip"
    class="trip-preview preview-card"
    @click="goToDetails(tripId)"
  >
    <img
      class="trip-preview-img ratio-card"
      :src="require('../../assets/img/trips/' + this.trip.imgUrls[0])"
    />
    <p class="toggle-fav" @click.stop="emitFav(trip)"><i :class="fav"></i></p>
    <div class="details">
      <h2 class="trip-preview-title">{{ this.trip.name }}</h2>
      <div class="trip-preview-trip-details">
        <!-- <p class="trip-preview-date">{{ this.trip.date }}</p> -->

        <p class="trip-preview-date">{{ getDateString }}</p>

        <p>{{ this.trip.capacity }}/10 hikers</p>
        <div class="booking-info flex space-between align-center">
          <p>
            <span class="price bold">{{ this.trip.price }}$</span> / person
          </p>
          <p>
            <span class="bold">{{ this.trip.capacity }}</span
            >/10 joined!
          </p>
        </div>
        <hr />
        <div class="guide-info flex space-between">
          <div class="guide-profile flex">
            <img
              class="guide-img profile-img-s"
              :src="
                require('@/assets/img/users/' + this.trip.aboutGuide.imgUrl)
              "
            />
            <p>{{ this.trip.aboutGuide.name }}</p>
          </div>
          <p><i class="fas fa-star trip-star-rate"></i> {{ rateGuide }}</p>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import { tripService } from "@/services/trip-service.js";
import { userService } from "../../services/user-service";

export default {
  props: {
    tripId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isFav: false,
      trip: null,
      rateGuide: null,
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
      let isInFav = userFavs.some((userFav) =>
        userFav._id.includes(this.trip._id)
      );
      this.isFav = isInFav;
    },
    async getGuideRate(trip) {
      const tripGuideId = trip.aboutGuide._id;
      const rate = await this.$store.dispatch({
        type: "getGuideRate",
        tripGuideId,
      });

      this.rateGuide = rate;
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

    getCurrUser() {
      return this.$store.getters.loggedinUser;
    },
    rateOfGuide() {
      return this.$store.getters.getGuideRate;
    },
    getDateString(trip) {
      var date = new Date(this.trip.date);
      return date.toLocaleDateString('en-GB')
    },
  },

  async created() {
    this.trip = await tripService.getTripById(this.tripId);
    
    this.checkIsFav();
    this.getGuideRate(this.trip);
    // this.getDateString(this.trip);
    // let m = moment()
    // console.log('m',m);
  },
};
</script>

<style></style>
