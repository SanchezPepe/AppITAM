<template>
  <v-container>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="n in 5" :key="n"> Opción {{ n }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in 5" :key="n">
        <Selector v-if="courses != null" :courses="courses" />
      </v-tab-item>
    </v-tabs-items>

    <v-overlay :value="loading" :absolute="absolute">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from "axios";
import Selector from "../components/Schedules/Selector.vue";

export default {
  data: () => ({
    absolute: true,
    loading: false,
    courses: null,
    selectedGroups: null,
    tab: null
  }),
  computed: {
    connUrl() {
      return this.$store.getters.connUrl;
    }
  },
  components: {
    Selector
  },
  mounted() {
    this.loading = true;
    axios
      .get(
        this.connUrl +
          "v0/b/appitam.appspot.com/o/FALL-2021.json?alt=media&token=53226aae-4d6d-4b67-9ab1-0998e88ee726"
      )
      .then(
        response => (
          (this.courses = response.data),
          console.log("Courses OK"),
          (this.loading = false)
        )
      )
      .catch(error => console.warn(error));
  }
};
</script>

<style></style>
