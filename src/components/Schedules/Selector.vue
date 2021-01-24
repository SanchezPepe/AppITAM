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
            <v-btn dark text @click="emitCourses()">
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
</template>

<script>
import GroupCard from "./GroupCard";

export default {
  data: () => ({
    items: [],
    values: [
      "SDI-13782 DISEÑO Y ARQUITECT. DE REDES",
      "EGN-17122 IDEAS E INST. POL. Y SOC. II"
    ],
    selectedGroups: {},
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
    reset() {
      this.values = [];
    },
    onGroupClicked(group) {
      this.selectedGroups[group[0]] = group[1];
    },
    emitCourses() {
      this.$emit("clicked", this.selectedGroups);
    }
  },
  components: {
    GroupCard
  }
};
</script>

<style></style>
