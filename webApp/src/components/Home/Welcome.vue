<template>
  <div>
    <v-card>
      <v-card-title class="headline">Habemus app</v-card-title>
      <v-card-text>
        <p class="subheading">
          Nuestro objetivo es construir, con ayuda de todos, una herramienta
          donde podamos encontrar fácilmente toda la información que necesitemos
          durante nuestra estancia en el ITAM.
        </p>
        <p class="subheading">
          Es muy importante que nos compartas tus observaciones para mejorar.
          ¿Qué agregarías a la app? ¿Qué quitarías de la app? Puedes
          encontrarnos en el Laboratorio de Desarrollo Web dentro del ITAM o
          dejarnos tu mensaje aquí mismo.
        </p>
        <p class="subheading">
          Contacto: wil@itam.mx
        </p>
        <p class="subheading">
          Encargados del laboratorio: Jaime Limón Samperio y Emiliano Sotomayor
          González
        </p>
        <v-layout row justify-center align-center>
          <v-flex xs12 sm6 md6 lg4>
            <v-card-actions class="ml-2">
              <v-btn block color="primary" @click.prevent="sendComment"
                >Enviar mensaje</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
