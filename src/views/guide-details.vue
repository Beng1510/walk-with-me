<template>
  <h1>Hi Guide!!</h1>
</template>

<script>

import {userService} from '../services/user-service.js';

export default {
    name: 'guide-details',

    data() {
        return {
            guide: null
        }
    },

    async created() {
        const guideId = this.$route.params.id;
        const guide = userService.getUserById(guideId);
    }
}
</script>

<style>

</style>