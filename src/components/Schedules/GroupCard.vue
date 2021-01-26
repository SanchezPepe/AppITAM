<template>
  <v-item v-slot="{ active, toggle }">
    <v-card
      outlined
      :color="active ? 'primary' : ''"
      class="align-center"
      @click="
        toggle();
        emitData();
      "
    >
      <v-card-text
        v-for="lecture in group"
        :key="lecture.teacher + lecture.days"
      >
        <h2>{{ lecture.teacher }}</h2>
        <h3 class="mb-3">
          Grupo: {{ id }} - {{ lecture.room }} - {{ lecture.campus }}
        </h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th v-if="group.length > 1" class="text-left">
                  Tipo
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-if="group.length > 1">{{ lecture.type }}</td>
                <td>
                  <div
                    v-for="day in lecture.days"
                    :key="day"
                    class="text-center d-inline"
                  >
                    <v-chip color="teal darken-3" class="ma-1 day-chip">{{
                      day
                    }}</v-chip>
                  </div>
                </td>
                <td>{{ lecture.time[0] }} - {{ lecture.time[1] }}</td>
                <td>{{ lecture.credits }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <h4 v-if="lecture.comments !== ''" class="mt-3">
          Comentarios: {{ lecture.comments }}
        </h4>
      </v-card-text>
    </v-card>
  </v-item>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    group: Array,
    id: String,
    course: String
  },
  methods: {
    emitData() {
      let dataToEmit = [this.course, this.id];
      this.$emit("clicked", dataToEmit);
    }
  }
};
</script>

<style>
.day-chip {
  color: white !important;
  font-weight: bold;
}
</style>
