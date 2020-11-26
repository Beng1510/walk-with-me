<template>
	<section class="toy-review flex f-col f-center">
		<!-- <h2>
			REVIEWS
			<button  @click="handleReview">
				Add
			</button>
		</h2>
		<form @submit.prevent="handleReview" v-if="isAdding">
			<input type="text" v-model="newReview.txt" placeholder="What do you think?" />
			<div class="btns flex">
				<button>Submit</button>
				<button type="button" @click="cancelReview">Cancel</button>
			</div>
		</form>
		<ul v-if="reviews">
			<li v-for="review in reviews" :key="review._id">
				{{ review.txt }}
				<h4>By: {{ review.user.username }}</h4>
			</li>
		</ul> -->
	</section>
</template>



<script>
export default {
	props: {
	
	},
	data() {
		return {
			isAdding: false,
			newReview: {
				txt: '',
			},
			toy: null,
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
	
};
</script>
