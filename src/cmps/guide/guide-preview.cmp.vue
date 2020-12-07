<template>
  <section
    v-if="guide"
    class="guide-preview preview-card"
    @click="goToGuide(guide._id)"
  >
    <img
      class="profile-img-m"
      :src="require('@/assets/img/users/' + guide.profileImgUrl)"
    />
    <div class="guide-info">
      <h2>{{ guide.name }}</h2>
      <p>
        <i class="fas fa-star trip-star-rate"></i> {{ rateGuide }} ({{
          guide.guideInfo.totalReviewCount
        }})

        <!-- ({{rateAmount}})  -->
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "guide-preview",
  props: {
    guide: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      totalRates: 0,
      rateTotal: null,
    };
  },
  computed: {
    rateGuide() {
      const sum = this.guide.guideInfo.reviews.reduce(
        (acc, item) => acc + item.rate,
        0
      );
      const avg = sum / this.guide.guideInfo.reviews.length;
      // this.user.rate = this.avg
      return avg.toFixed(1);
    },
    rateAmount() {
      return this.guide.guideInfo.reviews.length;
    },
  },

  methods: {
    goToGuide(id) {
      this.$router.push(`/guide/${id}`);
    },
    // async getRateTotal(guide) {
    //   console.log('guide',guide);
    //   const guideId = guide._id;
    //   console.log("🚀 ~ file: guide-preview.cmp.vue ~ line 61 ~ getRateTotal ~ guideId", guideId)
    //   const total = await this.$store.dispatch({
    //     type: "getRateTotal",
    //     guideId,
    //   });
    //   console.log('total',total);
    //   this.rateTotal = total;
    //   console.log("🚀 ~ file: guide-preview.cmp.vue ~ line 66 ~ getRateTotal ~  this.rateTotal",  this.rateTotal)
    // },
  },
  created() {
    // console.log('this.guide',this.guide);
    // this.getRateTotal(this.guide);
  },
};
</script>

<style>
</style>