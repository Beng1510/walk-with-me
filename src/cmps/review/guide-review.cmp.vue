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
    <ul class="">
      <li class="review-card" v-for="review in reviews" :key="review._id">
<<<<<<< HEAD

        <img class="userImg" :src="review.reviewByUser.imgUrl" alt="Image..." />
        <h3>By: {{ review.reviewByUser.userName }}</h3>
        <h2>{{ review.txt }}</h2>
        <h3>User Rate: {{ review.rate }}</h3>
=======
        <!-- <img class="userImg" :src="review.reviewByUser.imgUrl" alt="Image..." /> -->
        <!-- <h3>By: {{ review.reviewByUser.userName }}</h3> -->
        <h3>"{{ review.txt }}"  {{ review.rate }}/5</h3>
        <p>By: {{ review.reviewByUser.userName }}</p>
>>>>>>> 5ded464faf2545751884697fb8c3389971b8c63d
      </li>
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
  data() {
    return {
      isAdding: false,

      // user.guideInfo.reviews:{

      // },
      newReview: {
        
        txt: "",
        rate: null,
        reviewByUser:{
          userName: "",
          imgUrl: "user1.jpeg",
          _id: "",

        }
      },
    };
  },
  methods: {
    handleReview() {
      this.$store.dispatch({
        type: "saveReview",
        review: this.newReview,
        guideId: this.guideId
      });
    },
    showAddBtn() {
      this.isAdding = !this.isAdding;
    },
    // this.newReview = { txt: "", guideId: this.guideId };
    cancelReview() {
      this.newReview = { txt: "", guideId: this.guideId };
      this.isAdding = !this.isAdding;
    },
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  async created() {
    this.$store.dispatch({ type: "loadReviews", guideId: this.guideId });
  
  
  },
};
</script>