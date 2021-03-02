<template>
  <div id="app">
    <HereMap :center="center" />
  </div>
</template>

<script>
import HereMap from "./Map";
export default {
  components: {
    HereMap
  },
  data() {
    return {
      // we are this as prop to the HereMap component
      center: {
        lat: 19.344684,
        lng: -99.199675
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
