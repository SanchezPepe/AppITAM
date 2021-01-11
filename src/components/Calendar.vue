<template>
  <div>
    <v-container>
      <v-sheet height="1000">
        <v-calendar
          ref="calendar"
          type="week"
          interval-height="25"
          first-time="06:30"
          interval-minutes="30"
          interval-count="34"
          start="2020-06-01"
          event-overlap-threshold="15"
          :weekdays="weekday"
          :events="events"
          :short-intervals="shortIntervals"
          :event-overlap-mode="mode"
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
          <v-card
            class="mx-auto"
            max-width="300"
            outlined
            :color="selectedEvent.color"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">
                  COM-23131
                </div>
                <v-list-item-title class="headline mb-1">
                  <span v-html="selectedEvent.name"></span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly fonwderfully
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn icon @click="deleteEvent(selectedEvent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </v-card-actions>
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
      },
      {
        color: "red",
        name: "CALCULO",
        start: new Date("2020-06-03 11:30:00"),
        end: new Date("2020-06-03 12:30:00"),
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
    deleteEvent(event) {
      this.selectedOpen = false;
      let i = this.events.indexOf(event);
      this.events.splice(i, 1);
      console.log("Deleted event from calendar");
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
