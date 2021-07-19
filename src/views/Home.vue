<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-img height="200" src="../assets/plazaroja2.jpg"></v-img>
          <v-card-title class="headline">App ITAM</v-card-title>
          <v-card-text>
            <p class="subheading black--text">
              Nuestro objetivo es construir una herramienta donde podamos
              encontrar fácilmente toda la información que necesitemos durante
              nuestra estancia en el ITAM.
            </p>
            <p class="subheading black--text">
              Es importante que nos compartas comentarios, ideas o si encuentras
              algún error. ¿Qué agregarías a la app? ¿Qué quitarías de la app?
              Puedes encontrarnos en el Laboratorio de Desarrollo Web dentro del
              ITAM o escríbenos a wil@itam.mx
            </p>
            <p class="subheading black--text">
              El código de la aplicación abierto. Si quieres contribuir puedes
              hacer un fork del
              <a href="https://github.com/SanchezPepe/AppITAM" target="_blank">
                repositorio</a
              >
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title class="headline">Herramientas</v-card-title>
          <v-card-text class="pb-0">
            <div class="black--text" v-for="tool in tools" :key="tool.name">
              <strong>
                {{ tool.name }}
              </strong>
              <p class="subheading" v-html="tool.description"></p>
            </div>
          </v-card-text>
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => ({
    name: "Home",
    tools: [
      {
        name: "Planeador de horarios",
        description:
          "Genera diferentes opciones para tu horario del semestre. Puedes guardar, cargar horarios y consultar planes de estudio. La lista se actualiza cada semestre. Relevo de la <a href='https://horarios-itam.firebaseapp.com/' target='_blank'>apliación hecha por el Consejo Expande 2017</a>"
      },
      {
        name: "Transporte",
        description:
          "Muestra los horarios del bus de Río Hondo y Santa Teresa. Te permite localizar los buses en tiempo real (está en construcción)"
      },
      {
        name: "Calendarios",
        description:
          "Calendario escolar, pagos y fechas importantes de inscripción"
      },
      {
        name: "Links importantes",
        description:
          "URL's más utilzados, escríbenos si se rompe alguno o si quieres agregar uno"
      }
    ]
  })
};
</script>
