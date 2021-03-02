<template>
  <v-app id="inspire">
    <Toolbar />

    <Body />

    <Footer />
  </v-app>
</template>

<script>
//import ScheduleCreator from "./views/ScheduleCreator";
import Toolbar from "./components/MainComponents/Toolbar";
import Body from "./components/MainComponents/Body";
import Footer from "./components/MainComponents/Footer";

export default {
  name: "App",

  components: {
    Toolbar,
    Body,
    Footer
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  })
};
</script>
