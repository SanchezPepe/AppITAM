<template>
  <v-app id="inspire">
    <!-- TOOLBAR -->
    <v-card class="overflow-hidden">
      <v-app-bar
        app
        flat
        dark
        color="#006853"
        src="./assets/plazaroja.jpg"
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

    <!-- BODY -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="primary">
          <strong class="subheading">
            Ayúdanos a mejorar la aplicación, escríbenos a wil@itam.mx
          </strong>

          <v-spacer></v-spacer>

          <strong class="subheading">
            Lab Web ITAM - {{ new Date().getFullYear() }}
          </strong>
        </v-card-title>
      </v-card>
    </v-footer>

    <v-overlay :value="loading" style="z-index:9999;">
      <v-progress-circular indeterminate size="150">
        <h2>Cargando</h2>
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Menus from "./components/Menus";

export default {
  name: "App",
  computed: {
    window() {
      return this.$store.state.window;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
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
