<template>
  <v-card height="85vh">
    <Map />
  </v-card>
</template>

<script>
import Map from "./MapRender";

export default {
  data() {
    return {
      items: ["Barranca del Muerto", "Miguel Ángel de Quevedo", "Sta. Teresa"]
    };
  },
  components: {
    Map
  }
};
</script>
<style></style>
