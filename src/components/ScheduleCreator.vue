<template>
  <v-card>
    <v-container>
      <v-row align="center">
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            dense
            chips
            small-chips
            label="Outlined"
            multiple
          ></v-autocomplete>
        </v-col>
      </v-row>
      <Calendar />
    </v-container>
  </v-card>
</template>

<script>
import Calendar from "./Calendar";
import axios from "axios";

export default {
  data: () => ({
    courses: null,
    items: [],
    values: [],
    value: null
  }),
  mounted() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios
        .get(
          "http://localhost:8080/v0/b/appitam.appspot.com/o/courses.json?alt=media&token=43260d6c-232f-48f6-bda7-abb3251fa853"
        )
        .then(
          response => (
            (this.courses = response.data),
            console.log("SUCCESS GETTING COURSES"),
            this.fillCourses()
          )
        )
        .catch(error => console.warn(error));
    },
    fillCourses() {
      for (let dept in this.courses) {
        let keys = Object.keys(this.courses[dept]);
        this.items = this.items.concat(keys);
      }
    }
  },
  components: {
    Calendar
  }
};
</script>

<style></style>
