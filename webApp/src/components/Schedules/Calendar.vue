<template>
  <v-container>
    <v-sheet>
      <v-calendar
        ref="calendar"
        type="week"
        interval-height="22"
        first-time="06:30"
        interval-minutes="30"
        interval-count="34"
        start="2020-06-01"
        event-overlap-threshold="15"
        locale="es"
        :weekdays="weekday"
        :events="lectures"
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
    selectedOpen: false,
    lectures: [],
    colors: [
      "blue darken-1",
      "blue darken-2",
      "blue darken-3",
      "blue darken-4",
      "cyan darken-1",
      "cyan darken-2",
      "cyan darken-3",
      "cyan darken-4",
      "deep-orange darken-1",
      "deep-orange darken-2",
      "deep-orange darken-3",
      "deep-orange darken-4",
      "deep-purple darken-1",
      "deep-purple darken-2",
      "deep-purple darken-3",
      "deep-purple darken-4",
      "green darken-1",
      "green darken-2",
      "green darken-3",
      "green darken-4",
      "indigo darken-1",
      "indigo darken-2",
      "indigo darken-3",
      "indigo darken-4",
      "light-blue darken-1",
      "light-blue darken-2",
      "light-blue darken-3",
      "light-blue darken-4",
      "pink darken-1",
      "pink darken-2",
      "pink darken-3",
      "pink darken-4",
      "teal darken-1",
      "teal darken-2",
      "teal darken-3",
      "teal darken-4",
      "yellow darken-1",
      "yellow darken-2",
      "yellow darken-3",
      "yellow darken-4"
    ]
  }),
  props: {
    events: Array
  },
  watch: {
    events: function(_events) {
      this.lectures = [];
      if (_events.length > 0) {
        for (let i = 0; i < _events.length; i++) {
          let el = _events[i];
          let group = el[0];
          let courseName = el[1];
          //let groupNumber = el[2];
          let color = this.colors[
            Math.floor(Math.random() * this.colors.length)
          ];
          for (let k = 0; k < group.length; k++) {
            let lesson = group[k];
            // For each day of class for each group
            for (let j = 0; j < lesson.days.length; j++) {
              let day = lesson.days[j];
              let dayNum = this.getDayNumber(day);
              let newGroup = {
                color: color,
                name: courseName,
                start: new Date("2020-06-" + dayNum + " " + lesson.time[0]),
                end: new Date("2020-06-" + dayNum + " " + lesson.time[1]),
                timed: true,
                details: lesson.comments,
                teacher: lesson.teacher,
                classroom: lesson.room,
                campus: lesson.campus
              };
              this.lectures.push(newGroup);
            }
          }
        }
      }
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getDayNumber(day) {
      switch (day) {
        case "LU":
          return 1;
        case "MA":
          return 2;
        case "MI":
          return 3;
        case "JU":
          return 4;
        case "VI":
          return 5;
        default:
          console.error("DAY PARSING FAILED");
          return 0;
      }
    },
    getEventColor(event) {
      return event.color;
    },
    deleteEvent(event) {
      this.$emit("clicked", event.name);
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
