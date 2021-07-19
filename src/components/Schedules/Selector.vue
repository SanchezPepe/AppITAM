<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar color="teal darken-3" dark>
        <app-bar-title>
          Horarios para el semestre OTOÑO 2021
        </app-bar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
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
          <span>Cargar horario</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="exportSchedule">
              <v-icon>
                mdi-download
              </v-icon>
            </v-btn>
          </template>
          <span>Guardar horario</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="resetCal">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <span>Borrar todo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="drawer = !drawer">
              <v-icon>
                mdi-book-open
              </v-icon>
            </v-btn>
          </template>
          <span>Planes de estudio</span>
        </v-tooltip>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        floating
        temporary
        right
        height="40%"
      >
        <v-list nav dense>
          <v-row class="ma-1" align="right">
            <v-spacer></v-spacer>
            <v-btn
              x-small
              depressed
              fab
              color="error"
              @click.stop="drawer = !drawer"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-list dense nav>
              <v-list-item v-for="career in syllabuses" :key="career.name" link>
                <v-list-item-icon>
                  <v-icon>{{ career.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    <a
                      :href="career.external"
                      target="_blank"
                      style="text-decoration: none"
                    >
                      {{ career.name }}
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="11">
              <v-autocomplete
                :items="items"
                :error="error"
                v-model="values"
                outlined
                multiple
                chips
                dense
                deletable-chips
                small-chips
                label="Materias"
              ></v-autocomplete>
            </v-col>

            <v-col cols="1">
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
                    @click="addCourses"
                  >
                    <v-icon>
                      mdi-magnify
                    </v-icon>
                  </v-btn>
                </template>
                <span>Buscar horarios</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <Checkout :selectedCourses="summary" />
        </v-container>
      </v-card-text>

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
    </v-card>
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
    isSelecting: false,
    drawer: false,
    syllabuses: [
      {
        name: "Actuaría",
        icon: "mdi-bank",
        external:
          "https://actuaria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-actuaria-del-ITAM.pdf"
      },
      {
        name: "Administración",
        icon: "mdi-table-large",
        external:
          "https://administracion.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-administracion-del-ITAM.pdf"
      },
      {
        name: "Ciencia de Datos",
        icon: "mdi-chart-pie",
        external:
          "https://daaem.itam.mx/sites/default/files/programas/planes/plan_ciencia_datos.pdf"
      },
      {
        name: "Ciencia Política",
        icon: "mdi-briefcase",
        external:
          "https://politica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-ciencia-politica-del-ITAM.pdf"
      },
      {
        name: "Contaduría",
        icon: "mdi-deskphone",
        external:
          "https://contaduria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-contaduria-publica-y-estrategia-financiera-del-ITAM.pdf"
      },
      {
        name: "Derecho",
        icon: "mdi-gavel",
        external:
          "http://daedcs.itam.mx/sites/default/files/programas/planes/plan_derecho.pdf"
      },
      {
        name: "Dirección Financiera",
        icon: "mdi-chart-areaspline",
        external:
          "https://direccionfinanciera.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-direccion-financiera-del-ITAM.pdf"
      },
      {
        name: "Economía",
        icon: "mdi-cash-100",
        external:
          "https://economia.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-economia-del-ITAM.pdf"
      },
      {
        name: "Matemáticas Aplicadas",
        icon: "mdi-math-integral-box",
        external:
          "https://matematicas.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-matematicas-aplicadas-del-ITAM.pdf"
      },
      {
        name: "Relaciones Internacionales",
        icon: "mdi-flag",
        external:
          "https://relacionesinternacionales.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-relaciones-internacionales-del-ITAM.pdf"
      },
      {
        name: "Ing. Computación",
        icon: "mdi-desktop-tower-monitor",
        external:
          "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_computacion.pdf"
      },
      {
        name: "Ing. Industrial",
        icon: "mdi-factory",
        external:
          "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_industrial.pdf"
      },
      {
        name: "Ing. Mecatrónica",
        icon: "mdi-robot-happy",
        external:
          "https://mecatronica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-mecatronica-del-ITAM.pdf"
      },
      {
        name: "Ing. Negocios",
        icon: "mdi-store",
        external:
          "https://ingnegocios.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-negocios-del-ITAM.pdf"
      }
    ]
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

.v-list-item__icon {
  margin-inline: 10px !important;
}
</style>
