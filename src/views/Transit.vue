<template>
  <v-container>
    <v-responsive :min-height="window.height * .70">
      <v-row class="fill-height">
        <v-col cols="6">
          <v-tabs v-model="tabs" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#mobile-tabs-5-1" class="primary--text">
              Barranca
            </v-tab>

            <v-tab href="#mobile-tabs-5-2" class="primary--text">
              M.A. Quevedo
            </v-tab>

            <v-tab href="#mobile-tabs-5-3" class="primary--text">
              Sta. Teresa
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="i in 2" :key="i" :value="'mobile-tabs-5-' + i">
              <v-data-table
                dense
                :headers="itamHeaders"
                :items="itam"
                item-key="itam"
                items-per-page="-1"
                class="elevation-1"
                hide-default-footer
                disable-pagination
              ></v-data-table>
              <v-card flat>
                <v-card-text>
                  <strong>
                    * Solo de lunes a jueves y únicamente al Metro Miguel Angel
                    de Quevedo.
                  </strong>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'mobile-tabs-5-' + 3">
              <v-data-table
                dense
                :headers="teresaHeaders"
                :items="teresa"
                class="elevation-1"
                item-key="name"
                hide-default-footer
                disable-pagination
              ></v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-col cols="6">
          <Map />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import Map from "../components/BusLocation/Map";

export default {
  data() {
    return {
      tabs: null,
      itam: [
        { itam: "06:20", subway: "06:40" },
        { itam: "07:20", subway: "07:40" },
        { itam: "08:20", subway: "08:40" },
        { itam: "09:20", subway: "09:40" },
        { itam: "10:20", subway: "10:40" },
        { itam: "11:30", subway: "11:40" },
        { itam: "12:20", subway: "12:40" },
        { itam: "13:20", subway: "13:40" },
        { itam: "14:30", subway: "14:40" },
        { itam: "15:20", subway: "15:40" },
        { itam: "16:20", subway: "16:40" },
        { itam: "17:20", subway: "17:40" },
        { itam: "18:20", subway: "18:40" },
        { itam: "19:20", subway: "19:40" },
        { itam: "20:30", subway: "20:40" },
        { itam: "21:20", subway: "21:40" },
        { itam: "* 22:10", subway: "" }
      ],
      itamHeaders: [
        {
          text: "Sale Río Hondo",
          align: "center",
          value: "itam"
        },
        {
          text: "Sale del Metro",
          align: "center",
          value: "subway"
        }
      ],
      teresa: [
        { itam: "06:55", teresa: "07:15" },
        { itam: "07:50", teresa: "08:15" },
        { itam: "08:50", teresa: "09:15" },
        { itam: "09:50", teresa: "10:15" },
        { itam: "10:50", teresa: "11:15" },
        { itam: "11:50", teresa: "12:15" },
        { itam: "12:50", teresa: "13:15" },
        { itam: "13:40", teresa: "14:15" },
        { itam: "16:00", teresa: "16:15" },
        { itam: "17:00", teresa: "17:15" },
        { itam: "18:00", teresa: "18:15" },
        { itam: "18:45", teresa: "19:05" }
      ],
      teresaHeaders: [
        {
          text: "Sale Río Hondo",
          align: "center",
          value: "itam"
        },
        {
          text: "Sale de Sta. Teresa",
          align: "center",
          value: "teresa"
        }
      ],

      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  components: {
    Map
  },
  computed: {
    window() {
      return this.$store.state.window;
    }
  }
};
</script>

<style scoped></style>
