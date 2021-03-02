<template>
  <div id="app">
    <div class="cell cell-map">
      <MapContainer
        :geojson="geojson"
        v-on:select="selected = $event"
      ></MapContainer>
    </div>
    <div class="cell cell-edit">
      <Edit :geojson="geojson" v-on:change="geojson = $event"></Edit>
    </div>
    <div class="cell cell-inspect">
      <Inspect :feature="selected"></Inspect>
    </div>
  </div>
</template>

<script>
import MapContainer from "./Map";
import Edit from "./Edit";
import Inspect from "./Inspect";

// since we are using OSM, we have to transform the coordinates...

export default {
  name: "App",
  components: {
    Inspect,
    Edit,
    MapContainer
  },
  data: () => ({
    selected: undefined,
    geojson: {
      type: "Feature",
      properties: {
        name: "default object",
        quality: "top"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            //https://www.latlong.net/
            [-99.211052, 19.339329],
            [-99.211224, 19.357308],
            [-99.183213, 19.359332],
            [-99.185194, 19.341759]
          ]
        ]
      }
    }
  })
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 30vw;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell {
  border-radius: 4px;
  background-color: lightgrey;
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}

.cell-inspect {
  grid-column: 2;
  grid-row: 2;
}
</style>
