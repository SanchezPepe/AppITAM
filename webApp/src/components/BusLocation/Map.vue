<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiampzYW5jaGV6IiwiYSI6ImNra25jdDhweDE0ZXgyb29jeHRkaW10Z3AifQ.5sV_IKha4TaUpoOBt79H7g"
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.199675, 19.344684],
      zoom: 15
    });
  }
};
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 500%;
}
</style>
