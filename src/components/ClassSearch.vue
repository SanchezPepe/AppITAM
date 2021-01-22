<template>
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

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
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
            <v-btn dark text @click="dialog = false">
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
            <v-container>
              <h2>HORARIOS DISPONIBLES PARA - {{ values[s] }}</h2>
              <hr>
              <div
                v-for="groupNumber in Object.keys(courses[selected])"
                :key="groupNumber"
              >
                <GroupCard
                  :id="groupNumber"
                  :group="courses[selected][groupNumber]"
                />
                <hr />
              </div>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import axios from "axios";
import GroupCard from "./groupCard";

export default {
  data: () => ({
    courses: null,
    items: [],
    values: ["SDI-13782 DISEÑO Y ARQUITECT. DE REDES"],
    dialog: true,
    tab: null,
    error: false
  }),
  mounted() {
    this.fetchCourses();
  },
  methods: {
    addCourses() {
      if (this.values.length === 0) {
        this.error = true;
      } else {
        this.error = false;
        this.dialog = true;
        this.getSchedules();
      }
    },
    getSchedules() {
      this.values.forEach(val => {
        this.tableRows.push(Object.entries(this.courses[val]));
        console.log(this.tableRows);
      });
    },
    reset() {
      this.values = [];
    },
    fetchCourses() {
      axios
        .get(
          "http://localhost:8080/v0/b/appitam.appspot.com/o/courses.json?alt=media&token=fdf0432b-6e77-4bc6-b09e-5235f55f4520"
        )
        .then(
          response => (
            (this.courses = response.data),
            console.log("SUCCESS GETTING COURSES"),
            // Fills the input
            (this.items = Object.keys(this.courses))
          )
        )
        .catch(error => console.warn(error));
    }
  },
  components: {
    GroupCard
  }
};
</script>

<style></style>
