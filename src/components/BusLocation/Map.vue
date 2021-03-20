<template>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px; overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import axios from "axios";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      busCoordinates: null,
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      dev: false
    };
  },
  computed: {
    connUrl: function() {
      if (this.dev) return "http://localhost:8080/";
      else return "http://bus.itam.mx/";
    }
  },
  methods: {
    setCenter(center) {
      this.currentCenter = center;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  },
  mounted() {
    axios
      .get(
        this.connUrl +
          "servicioubica/servu.asmx/obtenUltimasCoordenadasRuta1Telcel?"
      )
      .then(response => {
        var parser = new DOMParser();
        let xmlData = parser.parseFromString(response.data, "text/html");
        // The response is malformed so we need to double parse the xml -> Log response.data for more context
        xmlData = xmlData.getElementsByTagName("string")[0].textContent;
        xmlData = parser.parseFromString(xmlData, "text/html");
        // Array to store the last 5 coordinates
        this.busCoordinates = [{}, {}, {}, {}, {}];

        let tags = ["latitud", "longitud", "ruta", "locFecha", "fecha"];
        tags.forEach(tag => {
          let items = xmlData.getElementsByTagName(tag);
          this.busCoordinates.map(
            (r, item) => (r[tag] = items[item].textContent)
          );
        });
        console.log(this.busCoordinates);
        var lat = this.busCoordinates[0].latitud;
        var lon = this.busCoordinates[0].longitud;

        //Set the center to the last point
        this.center = latLng(lat, lon);
      });
  }
};
</script>
