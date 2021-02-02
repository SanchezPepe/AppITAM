<template>
  <v-container>
    <p>Sample text</p>
    <Map />
  </v-container>
</template>

<script>
import Map from "../components/BusLocation/Map";

export default {
  components: {
    Map
  }
};
</script>

<style scoped>
v-container {
  height: 100%;
}
</style>
