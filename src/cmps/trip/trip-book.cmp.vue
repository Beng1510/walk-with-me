<template>
  <section v-if="trip" class="trip-book">
      <h1>Join The Trip!</h1>
      <p>{{trip.date}}</p>
      <form @submit.prevent="emitBook">
          <label for="peopleToSign">How many trippers?
              <input type="number" 
              v-model.number="booking.peopleToSign" 
              id="peopleToSign" name="peopleToSign" min="1" max="10" value="1">
          </label>
          <label for="specialReq">Any special requests?
              <input type="text" v-model="booking.specialReq" id="specialReq" name="specialReq" placeholder="e.g.: I want a vegan option for lunch">
          </label>
          <p>total: {{trip.price}}$</p>
          <button>Book Trip</button>
      </form>
  </section>
</template>

<script>
export default {
    props: {
        trip: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            booking: {
                guide: {
                    _id: this.trip.aboutGuide._id,
                    name: this.trip.aboutGuide.name,
                    imgUrl: this.trip.aboutGuide.imgUrl
                },
                
                trip: {
                    _id: this.trip._id,
                    name: this.trip.name, 
                    imgUrl: this.trip.imgUrls
                },
                status: 'pending',
                peopleToSign: 1,
                specialReq: ''
            }
        }
    },

    computed: {
    //     totalPrice() {
    //         const price = this.trip.price;
    //         const numOfPeople = this.booking.peopleToSign;
    //         var sum = price * peopleToSign;
    //         return sum;
    //     }
    },

    methods: {
        emitBook() {
            this.$emit('bookTrip', this.booking);
        }
    }
}
</script>

<style>

</style>