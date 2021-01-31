<template>
  <v-container>
    <v-container>
      <v-row no-gutters>
        <v-col md="9" cols="12">
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
        </v-col>

        <v-col md="3" cols="12" align="end">
          <v-btn color="success" class="mr-4" @click="addCourses">
            Ver horarios
          </v-btn>

          <v-btn color="warning" class="mr-4" @click="resetCal">
            Reiniciar
          </v-btn>
        </v-col>
      </v-row>
      <Checkout :selectedCourses="summary" />
    </v-container>

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
    <Calendar :events="summary" />
  </v-container>
</template>

<script>
import GroupCard from "./GroupCard";
import Calendar from "./Calendar";
import Checkout from "./Checkout";

export default {
  data: () => ({
    items: [],
    values: [],
    selectedGroups: {},
    summary: [],
    dialog: false,
    tab: null,
    error: false
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
      this.summary = [];
      this.selectedGroups = {};
    },
    onGroupClicked(group) {
      let courseName = group[0];
      let groupNumber = group[1];
      this.selectedGroups[courseName] = groupNumber;
    },
    submitCourses() {
      this.summary = [];
      Object.keys(this.selectedGroups).forEach(courseKey => {
        let groupNumber = this.selectedGroups[courseKey];
        let groupObj = this.courses[courseKey][groupNumber];
        // For each group data in the selected group array
        groupObj.forEach(el => {
          this.summary.push([el, courseKey, groupNumber]);
        });
      });
      this.dialog = false;
    }
  },
  components: {
    GroupCard,
    Calendar,
    Checkout
  }
};
</script>

<style></style>
