<template>
  <section v-if="guideId" class="reviews">
    <h1>Reviews</h1>
    <ul class="">
      <!-- <li
        class="review-card flex f-col f-center"
        v-for="review in reviews"
        :key="review._id"
      >
        <img class="userImg" :src="reviewByUser.imgUrl" alt="Image..." />
        <h3>By: {{ reviewByUser.userName }}</h3>
        <h2>{{ review.txt }}</h2>

        <h3>User Rate: {{ review.rate }}</h3>
      </li> -->
    </ul>
  </section>
</template>

<script>
import { userService } from "../../services/user-service.js";

export default {
  props: {
    guideId: {
      type: String,
      required: true,
    },
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
  },
  created() {
      console.log('guideId',guideId);
    const guide = userService.getUserById(guideId);
    console.log("guideeee", guide);
    this.$store.dispatch({ type: "loadReviews" });
  },
};
</script>