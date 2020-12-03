<template>
  <section v-if="trip" class="trip-book flex column">
    <h3>Price: ${{trip.price}}</h3>
    <form @submit.prevent="emitBook" class=" flex column">
      <label for="peopleToSign"
        >How many hikers?
        <el-input-number
          size="small"
          class="trip-book-peopleToSign"
          v-model.number="booking.peopleToSign"
          id="peopleToSign"
          name="peopleToSign"
          min="1"
          :max="capacity"
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
      <p>Total: ${{ booking.sum }}</p>
      <button>Book Trip</button>
    </form>
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
          capacity: this.trip.capacity,
        },
        status: "pending",
        peopleToSign: 1,
        specialReq: "",
        sum: this.trip.price,
      },
    };
  },

  computed: {
    capacity() {
      const signed = this.trip.capacity;
      let openSlots = 10 - signed;
      return openSlots;
    },
  },

  methods: {
    emitBook() {
      this.$emit("bookTrip", this.booking);

      this.updateCapacity();

      eventBusService.$emit(SHOW_MSG, {
        txt: "Trip Booked!",
        subTxt: "Please wait for guide's final approval",
        type: "success",
      });
    },

    totalPrice() {
      const price = this.trip.price;
      const numOfPeople = this.booking.peopleToSign;
      this.booking.sum = (price * numOfPeople).toFixed(2);
      return this.booking.sum;
    },
    updateCapacity() {
      let capacity = this.booking.trip.capacity;
      const peopleToSign = this.booking.peopleToSign;
      capacity += peopleToSign;
      this.$store.dispatch({
        type: "updateCapacity",
        id: this.trip._id,
        capacity,
      });
    },
  },
};
</script>
