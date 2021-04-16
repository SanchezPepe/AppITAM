<template>
  <div style="height: 500px; width: 100%">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-marker :lat-lng="[19.34508, -99.200004]" :icon="icon"> </l-marker>
    </l-map>
  </div>
</template>

<script>
import axios from "axios";
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import customIcon from "../../assets/chems.png";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      customIcon,
      dev: false,
      icon: icon({
        iconUrl: customIcon,
        iconSize: [80, 80]
      }),
      busCoordinates: null,
      zoom: 16,
      center: latLng(19.34508, -99.200004),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      }
    };
  },
  computed: {
    connUrl: function() {
      if (this.dev) return "http://localhost:8080/";
      else return "http://bus.itam.mx/";
    },
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
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
    innerClick() {
      alert("Click!");
    },
    getDataCoordinates(data) {
      // The response is malformed so we need to double parse the xml -> Log response.data for more context
      var parser = new DOMParser();
      let xmlData = parser.parseFromString(data, "text/html");
      xmlData = xmlData.getElementsByTagName("string")[0].textContent;
      xmlData = parser.parseFromString(xmlData, "text/html");

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

      //Set the center to the most recent location
      this.center = latLng(lat, lon);
    }
  },
  mounted() {
    axios
      .get(
        this.connUrl +
          "servicioubica/servu.asmx/obtenUltimasCoordenadasRuta1Telcel?/"
      )
      .then(response => this.getDataCoordinates(response.data));
  }
};
</script>
