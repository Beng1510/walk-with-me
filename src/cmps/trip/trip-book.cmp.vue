<template>
  <section v-if="trip" class="trip-book">
    <form @submit.prevent="emitBook" v-if="isBooked">
      <h1>Join The Trip!</h1>
      <label for="peopleToSign"
        >How many hikers?
        <input
          class="trip-book-peopleToSign"
          type="number"
          v-model.number="booking.peopleToSign"
          id="peopleToSign"
          name="peopleToSign"
          min="1"
          :max="openSlotsForHikers"
          @change="totalPrice"
        />
      </label>
      <label for="specialReq"
        >Any special requests?
        <input
          class="trip-book-specialReq"
          type="text"
          v-model="booking.specialReq"
          id="specialReq"
          name="specialReq"
          placeholder="e.g.: I want a vegan option for lunch"
        />
      </label>
      <p>Total Price: {{ booking.sum }}$</p>
      <button>Book Trip</button>
    </form>

    <div v-else>You Are Already Booked For This Trip</div>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../../services/eventBus-service.js";
export default {
  props: {
    trip: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      booking: {
        createdAt: new Date().toLocaleDateString(),
        guide: {
          _id: this.trip.aboutGuide._id,
          name: this.trip.aboutGuide.name,
          imgUrl: this.trip.aboutGuide.imgUrl,
        },

        trip: {
          _id: this.trip._id,
          name: this.trip.name,
          imgUrl: this.trip.imgUrls,
          totalBooked: this.trip.totalBooked,
        },
        status: "pending",
        peopleToSign: 1,
        specialReq: "",
        sum: this.trip.price,
      },
      isBooked: true,
    };
  },

  computed: {
    openSlotsForHikers() {
      const signed = this.trip.totalBooked;
      let openSlots = 10 - signed;
      return openSlots;
    },
  },

  methods: {
    emitBook() {
      
      this.$emit("bookTrip", this.booking);

      this.updateCapacity()

      eventBusService.$emit(SHOW_MSG, {
        txt: "Trip Booked!",
        subTxt: "Please wait for guide's final approval",
        type: "success",
      });
      this.updateTotalBooked()
    },

    totalPrice() {
      const price = this.trip.price;
      const numOfPeople = this.booking.peopleToSign;
      this.booking.sum = (price * numOfPeople).toFixed(2);
      return this.booking.sum;
    },
    updateTotalBooked() {
      let totalBooked = this.booking.trip.totalBooked;
      const peopleToSign = this.booking.peopleToSign;
      totalBooked += peopleToSign;
      console.log('totalBooked',totalBooked);
      this.$store.dispatch({
        type: "updateTotalBooked",
        id: this.trip._id,
        // totalBooked : JSON.parse(JSON.stringify(this.totalBooked))
        totalBooked
      });
    },
    getBookingByUser(user) {
      const bookings = this.$store.getters.bookings;

      const filteredBookings = bookings.filter(
        (booking) => booking.user._id === this.user._id
      );

      filteredBookings.some((booking) => {
        if (booking.trip.name === this.trip.name)
          return (this.isBooked = false);
      });
    },
  },
 
  created() {
    this.getBookingByUser(this.user);
  },
};
</script>
