<template>
  <h1>Hi Guide!!</h1>
</template>

<script>

import {userService} from '../services/user-service.js';

export default {
    name: 'guide-details',

    data() {
        return {
            user: null
        }
    },

    async created() {
        
    }
}
</script>

<style>

</style>