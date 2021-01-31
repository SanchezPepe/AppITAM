<template>
  <div>
    <!-- Single items menu's -->
    <v-menu
      open-on-hover
      bottom
      offset-y
      rounded="large"
      transition="slide-y-transition"
      v-for="item in single_items"
      :key="item.title"
      @click="sendTo(item)"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on">
          <!-- <v-icon> {{ item.icon }}</v-icon> -->
          {{ item.title }}
        </v-btn>
      </template>
    </v-menu>

    <!-- Multiple items menu's -->
    <v-menu
      open-on-hover
      bottom
      offset-y
      rounded="large"
      transition="slide-y-transition"
      v-for="item in items"
      :key="item.title"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on">
          <!-- <v-icon> {{ item.icon }}</v-icon> -->
          {{ item.title }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="subItem in item.subitems"
          :key="subItem.title"
          @click="sendTo(subItem)"
        >
          <v-list-item-title> {{ subItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      title: "",
      drawer: true,
      clipped: true,
      single_items: [
        {
          icon: "mdi-home",
          title: "Inicio",
          to: "/"
        },
        {
          icon: "mdi-table-clock",
          title: "Horarios",
          to: "/horarios"
        }
      ],
      items: [
        {
          icon: "mdi-notebook",
          title: "Plan de estudios",
          subitems: [
            { title: "Actuaría", to: "/planes/actuaria" },
            { title: "Administración", to: "/planes/administracion" },
            { title: "Contaduría", to: "/planes/contaduria" },
            { title: "Ciencias Políticas", to: "/planes/cpol" },
            { title: "Derecho", to: "/planes/derecho" },
            {
              title: "Dirección Financiera",
              to: "/planes/direccionfinanciera"
            },
            { title: "Economía", to: "/planes/economia" },
            { title: "Relaciones Internacionales", to: "/planes/ri" },
            { title: "Matemáticas Aplicadas", to: "/planes/mate" },
            { title: "Ing. en Computación", to: "/planes/computacion" },
            { title: "Ing. en Negocios", to: "/planes/negocios" },
            { title: "Ing. Industrial", to: "/planes/industrial" },
            { title: "Ing. en Mecatrónica", to: "/planes/mecatronica" }
          ]
        },
        {
          icon: "mdi-book-account",
          title: "Laboratorios",
          subitems: [
            { title: "Economía", to: "/laboratorios/economia" },
            { title: "Cálculo", to: "/laboratorios/calculo" }
          ]
        },
        {
          icon: "mdi-soccer-field",
          title: "Deportes",
          subitems: [
            { title: "Rugby", to: "/deportes/rugby" },
            { title: "Rugby Fem", to: "/deportes/rugbyfem" },
            { title: "Cheerleading", to: "/deportes/cheerleading" },
            { title: "Football", to: "/deportes/football" },
            { title: "Frisbee", to: "/deportes/frisbee" },
            { title: "Basketball Fem", to: "/deportes/basketballfem" }
          ]
        },
        {
          icon: "mdi-calendar",
          title: "Calendarios",
          subitems: [
            { title: "2018", to: "/calendarios/2018" },
            { title: "2019", to: "/calendarios/2019" },
            { title: "2020", to: "/calendarios/2020" }
          ]
        },
        {
          icon: "mdi-bus-multiple",
          title: "Transporte",
          subitems: [
            { title: "Metro", to: "/transporte/metro" },
            { title: "Santa Teresa", to: "/transporte/santateresa" }
          ]
        },
        {
          icon: "mdi-link",
          title: "Links",
          subitems: [
            { title: "ITAM", href: "https://www.itam.mx/" },
            { title: "Comunidad ITAM", href: "https://comunidad.itam.mx" },
            { title: "Servicios Personalizados", href: "http://grace.itam.mx" },
            {
              title: "Servicios NO Personalizados",
              href: "http://grace.itam.mx/EDSUP/BWZKSENP.P_MenuServNoPers"
            },
            { title: "Biblioteca", href: "https://biblioteca.itam.mx" }
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
