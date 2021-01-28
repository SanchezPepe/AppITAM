<template>
  <v-app>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" fixed app>
      <v-list-item
        v-for="item in single_items"
        :key="item.title"
        @click="sendTo(item)"
      >
        <v-list-item-icon>
          <v-icon> {{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title> {{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-group
        v-for="item in items"
        v-model="item.active"
        :key="item.title"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="sendTo(subItem)"
        >
          <v-list-item-title> {{ subItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-app>
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
          title: "Bienvenidos",
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
          items: [
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
          items: [
            { title: "Economía", to: "/laboratorios/economia" },
            { title: "Cálculo", to: "/laboratorios/calculo" }
          ]
        },
        {
          icon: "mdi-soccer-field",
          title: "Deportes",
          items: [
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
          items: [
            { title: "2018", to: "/calendarios/2018" },
            { title: "2019", to: "/calendarios/2019" },
            { title: "2020", to: "/calendarios/2020" }
          ]
        },
        {
          icon: "mdi-bus-multiple",
          title: "Transporte",
          items: [
            { title: "Metro", to: "/transporte/metro" },
            { title: "Santa Teresa", to: "/transporte/santateresa" }
          ]
        },
        {
          icon: "mdi-link",
          title: "Links",
          items: [
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
