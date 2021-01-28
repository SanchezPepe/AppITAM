<template>
  <v-container>
    <v-sheet>
      <v-calendar
        ref="calendar"
        type="week"
        interval-height="25"
        first-time="06:30"
        interval-minutes="30"
        interval-count="34"
        start="2020-06-01"
        event-overlap-threshold="15"
        locale="es"
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
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title
              v-if="selectedEvent.name != undefined"
              v-html="
                selectedEvent.name.substring(10, selectedEvent.name.length)
              "
            ></v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="deleteEvent(selectedEvent)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="selectedOpen = false">
              <v-icon>mdi-close-box</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text :color="selectedEvent.color">
            <p class="font-weight-black subtitle-1">
              {{ selectedEvent.teacher }}
              <br />
              {{ selectedEvent.classroom }} - {{ selectedEvent.campus }}
            </p>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    weekday: [1, 2, 3, 4, 5],
    mode: "column",
    shortIntervals: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  props: {
    events: Array
  },
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
      // Delete all the clases from a group
      let name = event.name;
      for (let i = this.events.length - 1; i >= 0; i--) {
        let ev = this.events[i];
        if (ev.name == name) {
          let i = this.events.indexOf(ev);
          this.events.splice(i, 1);
          console.log("Deleted event from calendar", ev);
        }
      }
      //this.events.splice(this.events.indexOf(event), 1)
      this.selectedOpen = false;
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

<style>
.v-calendar-daily_head-day-label {
  display: none;
}

.v-calendar-daily__interval-text {
  font-weight: bold;
  font-size: 12px !important;
  color: black !important;
}

.v-calendar-daily_head-weekday {
  font-weight: bold;
  font-size: 15px !important;
  color: black !important;
}

.v-calendar-daily__scroll-area {
  overflow-y: hidden !important;
}
</style>
