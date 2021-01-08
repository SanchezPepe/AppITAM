<template>
  <div>
    <v-container>
      <v-sheet height="1000">
        <v-calendar
          ref="calendar"
          :weekdays="weekday"
          type="week"
          :events="events"
          first-time="06:30"
          interval-minutes="30"
          interval-count="34"
          :short-intervals="shortIntervals"
          start="2020-06-01"
          :event-overlap-mode="mode"
          event-overlap-threshold="15"
          :event-color="getEventColor"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        >
        </v-calendar>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card class="mx-auto" max-width="400" outlined>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">
                  COM-23131
                </div>
                <v-list-item-title class="headline mb-1">
                  Headline 5
                </v-list-item-title>
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly fonwderfully
                </v-list-item-subtitle>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    weekday: [1, 2, 3, 4, 5, 6],
    mode: "column",
    shortIntervals: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        color: "green",
        name: "SEMINARIO DE INVESTIGACION ACT SEMINARIO DE INVESTIGACION ACT",
        start: new Date("2020-06-02 09:00:00"),
        end: new Date("2020-06-02 12:30:00"),
        timed: true,
        details:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      },
      {
        color: "blue",
        name: "ALGORITMOS Y PRGS",
        start: new Date("2020-06-02 09:15:00"),
        end: new Date("2020-06-02 12:30:00"),
        timed: true,
        details:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      }
    ],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ]
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    }
  }
};
</script>
