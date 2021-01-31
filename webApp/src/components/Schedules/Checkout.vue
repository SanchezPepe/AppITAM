<template>
  <v-expansion-panels focusable accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Resumen
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table fixed-header>
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
                  Créditos
                </th>
                <th class="text-left">
                  Salón
                </th>
              </tr>
            </thead>
            <tbody v-for="course in selectedCourses" :key="course[1]">
              <tr
                v-for="lesson in course[0]"
                :key="lesson.teacher + lesson.days"
              >
                <td>{{ course[1] }}</td>
                <td>{{ course[2] }}</td>
                <td>{{ lesson.teacher }}</td>
                <td>{{ lesson.days.join(" - ") }}</td>
                <td>{{ lesson.time[0] }} - {{ lesson.time[1] }}</td>
                <td>{{ lesson.credits }}</td>
                <td>{{ lesson.room }} - {{ lesson.campus }}</td>
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

<style scoped>
th,
td {
  color: black !important;
  font-weight: bold !important;
}
</style>
