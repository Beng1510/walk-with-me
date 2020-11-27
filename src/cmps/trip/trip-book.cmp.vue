<template>
  <section v-if="trip" class="trip-book">
      <h1>Join The Trip!</h1>
      <p>{{trip.date}}</p>
      <form @submit.prevent="emitBook">
          <label for="peopleToSign">How many trippers?
              <input type="number" 
              v-model.number="booking.peopleToSign" 
              id="peopleToSign" name="peopleToSign" min="1" max="10"
              @change="totalPrice"
              >
          </label>
          <label for="specialReq">Any special requests?
              <input type="text" v-model="booking.specialReq" id="specialReq" name="specialReq" placeholder="e.g.: I want a vegan option for lunch">
          </label>
          <p>total: {{booking.sum}}$</p>
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
                    imgUrl: this.trip.imgUrls,
                },
                status: 'pending',
                peopleToSign: 1,
                specialReq: '',
                sum: this.trip.price
            }
        }
    },

    computed: {
       
    },

    methods: {
        emitBook() {
            this.$emit('bookTrip', this.booking);
        },

         totalPrice() {
            const price = this.trip.price;
            const numOfPeople = this.booking.peopleToSign;
            this.booking.sum = (price * numOfPeople).toFixed(2);
            return this.booking.sum;
        }
    }
}
</script>

<style>

</style>