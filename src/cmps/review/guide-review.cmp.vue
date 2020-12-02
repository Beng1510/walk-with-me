<template>
  <section class="guide-reviews">
    <h2>-----------------Reviews-----------------</h2>

    <button @click="showAddBtn">Add</button>
    <form @submit.prevent="handleReview" v-if="isAdding">
      <input
        type="text"
        v-model="newReview.txt"
        placeholder="What do you think about this gouide  ?"
      />
      <input
        type="number"
        v-model.number="newReview.rate"
        placeholder="Guide Rate (1-5)"
      />
      <div class="">
        <button>Submit</button>
        <button type="button" @click="cancelReview">Cancel</button>
      </div>
    </form>
    <ul class="review-container">
      <li class="review-card" v-for="review in reviews" :key="review._id">
        <img
          class="userImg"
          :src="require('@/assets/img/users/' + review.reviewByUser.imgUrl)"
          alt="Image..."
        />
        <!-- <h3 class="byName">IMG URL: {{ review.reviewByUser.imgUrl }}</h3> -->
        <h3 class="byName">By: {{ review.reviewByUser.userName }}</h3>
        <p>{{ review.txt }}</p>
        <h4>User Rate: {{ review.rate }}</h4>
      </li>
    </ul>

    <div></div>
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
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAdding: false,

      // user.guideInfo.reviews:{

      // },
      newReview: {
        txt: "",
        rate: null,
        reviewByUser: {
          userName: this.user.name,
          imgUrl: this.user.profileImgUrl,
          _id: this.user._id,
        },
      },
    };
  },
  methods: {
    handleReview() {
      this.$store.dispatch({
        type: "saveReview",
        review: JSON.parse(JSON.stringify(this.newReview)), 
        guideId: this.guideId,
        user: this.user,
      });
    },
    showAddBtn() {
      this.isAdding = !this.isAdding;
    },
    cancelReview() {
      this.newReview = { txt: "", guideId: this.guideId };
      this.isAdding = !this.isAdding;
    },
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    // user() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
  async created() {
    this.$store.dispatch({ type: "loadReviews", guideId: this.guideId });
  },
};
</script>