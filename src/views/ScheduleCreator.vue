<template>
  <v-card>
    <v-container>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab>
          Opción 1
        </v-tab>
        <v-tab>
          Opción 2
        </v-tab>
        <v-tab>
          Opción 3
        </v-tab>
        <v-tab>
          Opción 4
        </v-tab>
        <v-tab>
          Opción 5
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Selector v-if="courses != null" :courses="courses" />
        </v-tab-item>
        <v-tab-item>
          <Selector v-if="courses != null" :courses="courses" />
        </v-tab-item>
        <v-tab-item>
          <Selector v-if="courses != null" :courses="courses" />
        </v-tab-item>
        <v-tab-item>
          <Selector v-if="courses != null" :courses="courses" />
        </v-tab-item>
        <v-tab-item>
          <Selector v-if="courses != null" :courses="courses" />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import Selector from "../components/Schedules/Selector.vue";

export default {
  data: () => ({
    courses: null,
    selectedGroups: null,
    tab: null
  }),
  components: {
    Selector
  },
  beforeCreate() {
    axios
      .get(
        "http://localhost:8080/v0/b/appitam.appspot.com/o/courses.json?alt=media&token=fdf0432b-6e77-4bc6-b09e-5235f55f4520"
      )
      .then(
        response => ((this.courses = response.data), console.log("Courses OK"))
      )
      .catch(error => console.warn(error));
  }
};
</script>

<style></style>
