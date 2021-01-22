<template>
  <div>
    <div v-for="lecture in groups" :key="lecture">
      {{ groups }}
      <p>Tipo: {{ lecture.type }}</p>
      <p>Profesor: {{ lecture.teacher }}</p>
      <p>Créditos: {{ lecture.credits }}</p>
      <p>Tiempo: {{ lecture.time }}</p>
      <p>Días: {{ lecture.days }}</p>
      <p>Salón: {{ lecture.room }}</p>
      <p>Campus: {{ lecture.campus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    groups: Object
  }
};
</script>

<style></style>
