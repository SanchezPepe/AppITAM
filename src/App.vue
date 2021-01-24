<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>

    <v-main>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/calendar">About</router-link> -->
      <ScheduleCreator />
    </v-main>
  </v-app>
</template>

<script>
import ScheduleCreator from "./views/ScheduleCreator.vue";

export default {
  name: "App",

  components: {
    ScheduleCreator
  },

  data: () => ({
    //
  })
};
</script>
