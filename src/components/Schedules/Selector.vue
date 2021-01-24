<template>
  <v-container>
    <v-form ref="form">
      <v-autocomplete
        :items="items"
        :error="error"
        v-model="values"
        outlined
        multiple
        dense
        chips
        deletable-chips
        small-chips
        label="Materia"
      ></v-autocomplete>

      <v-btn color="success" class="mr-4" @click="addCourses">
        Ver horarios
      </v-btn>

      <v-btn color="warning" class="mr-4" @click="resetCal">
        Reiniciar calendario
      </v-btn>

      <!-- POP UP DIALOG FOR ADDING COURSES -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Seleccionar horarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="submitCourses()">
                Agregar cursos
              </v-btn>
              <v-btn dark text @click="dialog = false">
                Cancelar
              </v-btn>
            </v-toolbar-items>

            <template v-slot:extension>
              <!-- TABS FOR EACH COURSE -->

              <!-- TAB HEADER -->
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab v-for="value in values" :key="value">
                  {{ value.substring(10, value.length) }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <!-- TAB BODY -->
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(selected, s) in values" :key="s">
              <v-item-group>
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col
                      v-for="groupNumber in Object.keys(courses[selected])"
                      :key="groupNumber"
                      cols="12"
                      sm="3"
                    >
                      <GroupCard
                        :id="groupNumber"
                        :group="courses[selected][groupNumber]"
                        :course="selected"
                        @clicked="onGroupClicked"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-dialog>
    </v-form>
    <Calendar :events="lectures" />
  </v-container>
</template>

<script>
import GroupCard from "./GroupCard";
import Calendar from "./Calendar.vue";

export default {
  data: () => ({
    items: [],
    values: [],
    selectedGroups: {},
    lectures: [],
    dialog: false,
    tab: null,
    error: false,
    colors: [
      "blue",
      "red",
      "indigo",
      "pink",
      "purple",
      "teal",
      "deep-purple",
      "cyan",
      "orange",
      "lime",
      "red-lighten-5"
    ]
  }),
  props: {
    courses: Object
  },
  beforeMount() {
    this.items = Object.keys(this.courses);
  },
  methods: {
    addCourses() {
      if (this.values.length === 0) {
        this.error = true;
      } else {
        this.error = false;
        this.dialog = true;
      }
    },
    resetCal() {
      this.values = [];
      this.lectures = [];
      this.selectedGroups = {};
    },
    onGroupClicked(group) {
      let courseName = group[0];
      let groupNumber = group[1];
      this.selectedGroups[courseName] = groupNumber;
    },
    submitCourses() {
      this.lectures = [];
      Object.keys(this.selectedGroups).forEach(courseKey => {
        let groupNumber = this.selectedGroups[courseKey];
        let groupObj = this.courses[courseKey][groupNumber];
        // For each group data in the selected group array
        let eventColor = this.colors[Math.floor(Math.random() * 10)];
        groupObj.forEach(el => {
          // For each day of class for each group
          el.days.forEach(day => {
            let dayNum = this.getDayNumber(day);
            let newGroup = {
              color: eventColor,
              name: courseKey,
              start: new Date("2020-06-" + dayNum + " " + el.time[0]),
              end: new Date("2020-06-" + dayNum + " " + el.time[1]),
              timed: true,
              details: el.comments
            };
            this.lectures.push(newGroup);
          });
        });
      });
      this.dialog = false;
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
          return 0;
      }
    }
  },
  components: {
    GroupCard,
    Calendar
  }
};
</script>

<style></style>
