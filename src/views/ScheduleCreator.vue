<template>
  <v-card>
    <v-container>
      <ClassSearch />
      <Calendar />
    </v-container>
  </v-card>
</template>

<script>
import Calendar from "../components/Schedules/Calendar.vue";
import ClassSearch from "../components/Schedules/ClassSearch.vue";

export default {
  data: () => ({}),
  components: {
    Calendar,
    ClassSearch
  }
};
</script>

<style></style>
