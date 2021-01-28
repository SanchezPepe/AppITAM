<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <NavigationDrawer />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>App ITAM </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/calendar">About</router-link> -->

      <ScheduleCreator />
    </v-main>
  </v-app>
</template>

<script>
import ScheduleCreator from "./views/ScheduleCreator";
import NavigationDrawer from "./components/Navigation/NavDrawer";

export default {
  name: "App",

  components: {
    NavigationDrawer,
    ScheduleCreator
  },
  data: () => ({ drawer: null })
};
</script>
