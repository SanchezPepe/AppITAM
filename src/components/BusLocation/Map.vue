<template>
  <div style="height: 100%; width: 100%">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :options="{ tileSize: 512, zoomOffset: -1 }"
        :url="url"
        :attribution="attribution"
      />

      <l-marker :lat-lng="itamLocation" :icon="itam"> </l-marker>

      <l-marker :lat-lng="barranca" :icon="bus">
        <l-tooltip :options="tooltipOptions">
          <strong>
            Barranca del Muerto
          </strong>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import axios from "axios";
import { latLng, icon, point } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import chems from "../../assets/chems.png";
import itamIcon from "../../assets/plazaroja.png";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      dev: false,
      chems,
      itamIcon,
      bus: icon({
        iconUrl: chems,
        iconSize: [70, 70]
      }),
      itam: icon({
        iconUrl: itamIcon,
        iconSize: [345 / 3, 251 / 3]
      }),
      zoom: 15,
      center: latLng(19.352327, -99.194705),
      barranca: latLng(19.36151, -99.189365),
      itamLocation: latLng(19.344757, -99.199923),
      busCoordinates: null,
      tooltipOptions: { permanent: true, opacity: 1, offset: point(35, -10) },
      url:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiampzYW5jaGV6IiwiYSI6ImNra25jdDhweDE0ZXgyb29jeHRkaW10Z3AifQ.5sV_IKha4TaUpoOBt79H7g",
      attribution:
        '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    };
  },
  computed: {
    window() {
      return this.$store.state.window;
    },
    connUrl: function() {
      if (this.dev) return "http://localhost:8080/";
      else return "http://bus.itam.mx/";
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.zoom = zoom;
    },
    centerUpdate(center) {
      this.center = center;
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
