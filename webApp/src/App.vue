<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" flat dark>
      <v-container class="py-0 fill-height">
        <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->
        <v-toolbar-title>
          App ITAM
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <Menus />

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <ScheduleCreator />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ScheduleCreator from "./views/ScheduleCreator";
import Menus from "./components/Navigation/Menus";

export default {
  name: "App",

  components: {
    Menus,
    ScheduleCreator
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  })
};
</script>
