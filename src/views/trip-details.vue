<template>
	<section  class="trip-details">
		<button class="back-btn"><router-link to="/">Back</router-link></button>
		<h2>trip Details</h2>
		<img  class="tripImg" :src="trip.imgUrls[0]" alt="Image..." />
		<img  class="tripImg" :src="trip.imgUrls[1]" alt="Image..." />
		<img  class="tripImg" :src="trip.imgUrls[2]" alt="Image..." />
		<h2>Name: {{ trip.name }}</h2>
		<!-- <h3>Type: {{ trip.type }}</h3> -->
		<h3>Trip date: {{ trip.date }}</h3>
		<h3>Trip type: {{ trip.tags }}</h3>
		<h3>Price: {{ trip.price }}$</h3>
		<h3>Trip capacity: {{ trip.capacity }}</h3>
		<h3>Trip difficulty: {{ trip.difficulty }}(1-5)</h3>
        <p>Description {{trip.description}}</p>

           
        
        <h2>Guide Details</h2>
        <h3>Guide name: {{ user.aboutGuide.name }}</h3>
        <h3>Guide rate: {{ user.aboutGuide.rate }}</h3>
        <img  class="guidImg" :src="trip.aboutGuide.imgUrl" alt="Image..." />
        

		<!-- <guide-review :guideId="trip.aboutGuide._id"  /> -->
	</section>
</template>

<script>
import { tripService } from "../services/trip-service.js";
// import guideReview from "../cmps/review/guide-review.cmp.js";

export default {
	data() {
		return {
            trip: null,
            
		};
	},
	computed: {
	
	},
	async created() {
		const tripId = this.$route.params.id;
		consoloe.log(tripId);
		const trip = await tripService.getTripById(tripId);
		this.trip = trip;
	},
	// components: {
	// 	guideReview,
	// },
};
</script>