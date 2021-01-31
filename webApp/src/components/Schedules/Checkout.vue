<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Resumen
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Materia
                </th>
                <th class="text-left">
                  Grupo
                </th>
                <th class="text-left">
                  Profesor
                </th>
                <th class="text-left">
                  Días
                </th>
                <th class="text-left">
                  Horario
                </th>
                <th class="text-left">
                  Creditos
                </th>
                <th class="text-left">
                  Salón
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in selectedCourses" :key="course[1]">
                <td>{{ course[1] }}</td>
                <td>{{ course[2] }}</td>
                <td>{{ course[0].teacher }}</td>

                <td>{{ course[0].days.join(" - ") }}</td>
                <td>{{ course[0].time[0] }} - {{ course[0].time[1] }}</td>
                <td>{{ course[0].credits }}</td>
                <td>{{ course[0].room }} - {{ course[0].campus }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    selectedCourses: Array
  }
};
</script>

<style></style>
