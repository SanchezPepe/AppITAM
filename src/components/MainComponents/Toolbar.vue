<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      app
      flat
      dark
      color="#006853"
      src="https://static.wixstatic.com/media/d5807a_ae71547eb33644278e4ff4aebd9f4b59~mv2_d_2800_1615_s_2.jpg/v1/fill/w_1600,h_922,al_c,q_90/file.jpg"
      fade-img-on-scroll
      shrink-on-scroll
      elevate-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.7), rgb(0, 104, 83,.8)"
        ></v-img>
      </template>
      <v-container class="py-0 fill-height">
        <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->
        <p class="mt-2">
          <a
            id="logo"
            class="text-decoration-none"
            href=""
            @click="sendTo('/')"
          >
            App ITAM
          </a>
        </p>

        <v-spacer></v-spacer>

        <Menus />
      </v-container>
    </v-app-bar>
  </v-card>
</template>

<script>
import Menus from "./Menus";

export default {
  name: "App",
  components: {
    Menus
  },
  data: () => ({}),
  methods: {
    sendTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style>
#logo {
  color: white;
}
</style>
