<template>
  <section class="guide-reviews">
    <div class="reviews-header flex space-between align-center">
      <h2 class="title">Reviews</h2>
      <button @click="showAddBtn">Add</button>
    </div>
    <form @submit.prevent="handleReview" v-show="isAdding">
      <input
        type="text"
        v-model="newReview.txt"
        min="1"
        max="5"
        placeholder="What do you think?"
      />
      <input
        type="number"
        v-model.number="newReview.rate"
        placeholder="Guide Rate (1-5)"
      />
        <button>Submit</button>
        <button type="button" @click.prevent="cancelReview">Cancel</button>
    </form>
    <ul class="review-container">
      <li class="review-card" v-for="review in reviews" :key="review._id">
        <p>{{ review.txt }}</p>
        <h4><i class="fas fa-star"></i> Rate: {{ review.rate }}</h4>
        <div class="review-by flex">
          <img
            class="profile-img-s"
            :src="require('@/assets/img/users/' + review.reviewByUser.imgUrl)"
            alt="Image..."
          />
          <h3>{{ review.reviewByUser.userName }}</h3>
        </div>
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
  },
  async created() {
    this.$store.dispatch({ type: "loadReviews", guideId: this.guideId });
  },
};
</script>
