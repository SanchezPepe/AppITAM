<template>
  <v-card>
    <v-container>
      <ClassSearch />
      <Calendar />
    </v-container>
  </v-card>
</template>

<script>
import Calendar from "./Calendar";
import ClassSearch from "./ClassSearch";

export default {
  data: () => ({}),
  components: {
    Calendar,
    ClassSearch
  }
};
</script>

<style></style>
