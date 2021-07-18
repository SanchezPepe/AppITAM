<template>
  <v-container>
    <v-container>
      <strong>
        Se muestran horarios para el semestre OTOÑO 2021
      </strong>
      <v-row style="margin-top: 0px">
        <v-col cols="9">
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

        <v-col cols="3" align="end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                dark
                small
                v-bind="attrs"
                v-on="on"
                color="success"
                class="mr-4"
                rounded
                :loading="isSelecting"
                @click="addCourses"
              >
                <v-icon>
                  mdi-magnify
                </v-icon>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="application/json"
                  @change="onFileChanged"
                />
              </v-btn>
            </template>
            <span>Buscar horarios</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                dark
                small
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="mr-4"
                rounded
                :loading="isSelecting"
                @click="uploadSchedule"
              >
                <v-icon>
                  mdi-upload
                </v-icon>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="application/json"
                  @change="onFileChanged"
                />
              </v-btn>
            </template>
            <span>Cargar Horario</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="blue darken-4"
                class="mr-4"
                fab
                dark
                small
                v-bind="attrs"
                v-on="on"
                @click="exportSchedule"
              >
                <v-icon dark>
                  mdi-download
                </v-icon>
              </v-btn>
            </template>
            <span>Descargar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-4"
                fab
                dark
                small
                color="warning"
                v-bind="attrs"
                v-on="on"
                @click="resetCal"
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Borrar todo</span>
          </v-tooltip>
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
    <Calendar :events="summary" @clicked="onEventDeleted" />
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
    error: false,
    isSelecting: false
  }),
  props: {
    courses: Object
  },
  components: {
    GroupCard,
    Calendar,
    Checkout
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
    onEventDeleted(name) {
      for (let i = this.summary.length - 1; i >= 0; i--) {
        let eventName = this.summary[i][1];
        if (eventName == name) {
          this.summary.splice(i, 1);
          console.log("Deleted class", name);
        }
      }
    },
    submitCourses() {
      this.summary = [];
      Object.keys(this.selectedGroups).forEach(courseKey => {
        let groupNumber = this.selectedGroups[courseKey];
        let groupObj = this.courses[courseKey][groupNumber];
        // For each group data in the selected group array
        this.summary.push([groupObj, courseKey, groupNumber]);
      });
      this.dialog = false;
    },
    exportSchedule() {
      if (this.summary.length > 0) {
        let obj = { courses: this.summary };
        let content = JSON.stringify(obj);
        let contentType = "text/plain";
        let a = document.createElement("a");
        let file = new Blob([content], {
          type: contentType
        });
        a.href = URL.createObjectURL(file);
        a.download = "Schedule.json";
        a.click();
      } else {
        alert("Nada que guardar");
      }
    },
    uploadSchedule() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      try {
        let file = e.target.files[0];
        let reader = new FileReader();
        let self = this;
        reader.readAsText(file);
        reader.onload = function(evt) {
          let courses = JSON.parse(evt.target.result).courses;
          console.log(courses);
          courses.forEach(el => {
            self.summary.push(el);
          });
          alert("Horario cargado correctamente");
        };
      } catch (error) {
        console.log(error);
        alert("Hubo un error, revisa que tu archivo sea correcto");
      }
    }
  }
};
</script>

<style>
.v-chip--select {
  margin: 3px !important;
}
</style>
