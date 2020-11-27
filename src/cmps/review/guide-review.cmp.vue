<template>
  <section class="reviews">
    <h1>-----------------Reviews-----------------</h1>
    
      
      <h2>
        <button @click="handleReview">Add</button>
      </h2>
      <form @submit.prevent="handleReview" v-if="isAdding">
        <input
          type="text"
          v-model="newReview.txt"
          placeholder="What do you think?"
        />
        <div class="btns flex">
          <button>Submit</button>
          <button type="button" @click="cancelReview">Cancel</button>
        </div>
      </form>
      <ul class="">
      <li
        class="review-card flex f-col f-center"
        v-for="review in reviews"
        :key="review._id">
      
        <img class="userImg" :src="review.reviewByUser.imgUrl" alt="Image..." />
        <h3>By: {{ review.reviewByUser.userName }}</h3>
        <h2>{{ review.txt }}</h2>

        <h3>User Rate: {{ review.rate }}</h3>
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
      newReview: {
				txt: '',
			},
    };
  },
  methods: {
		handleReview() {
			if (this.isAdding) {
				const user = this.loggedUser;
				this.newReview.user = {
					username: user.username,
					_id: user._id,
				};
				this.newReview.toy = {
					_id: this.toyId,
					name: this.toyName,
				};
				this.$store.dispatch({
					type: 'saveReview',
					review: this.newReview,
				});
				this.newReview = { txt: '', toyId: this.toyId };
			}
			this.isAdding = !this.isAdding;
		},
		cancelReview() {
			this.newReview = { txt: '', toyId: this.toyId };
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