<template>
  <div>
    <v-menu
      open-on-hover
      bottom
      offset-y
      rounded="large"
      transition="slide-y-transition"
      v-for="item in menuItems"
      :key="item.title"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on" @click="sendTo(item)">
          <!-- <v-icon> {{ item.icon }}</v-icon> -->
          {{ item.title }}
        </v-btn>
      </template>

      <!-- If there are subitems items menu's -->
      <v-list v-if="item.subitems">
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
      menuItems: [
        {
          icon: "mdi-home",
          title: "Inicio",
          to: "/"
        },
        {
          icon: "mdi-table-clock",
          title: "Horarios",
          to: "/calendar"
        },
        {
          icon: "mdi-bus-multiple",
          title: "Transporte",
          to: "/transit"
        },
        {
          icon: "mdi-notebook",
          title: "Planes de estudio",
          subitems: [
            {
              title: "Actuaría",
              href:
                "https://actuaria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-actuaria-del-ITAM.pdf"
            },
            {
              title: "Administración",
              href:
                "https://administracion.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-administracion-del-ITAM.pdf"
            },
            {
              title: "Ciencia de Datos",
              href:
                "https://daaem.itam.mx/sites/default/files/programas/planes/plan_ciencia_datos.pdf"
            },
            {
              title: "Ciencia Política",
              href:
                "https://politica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-ciencia-politica-del-ITAM.pdf"
            },
            {
              title: "Contaduría",
              href:
                "https://contaduria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-contaduria-publica-y-estrategia-financiera-del-ITAM.pdf"
            },
            {
              title: "Derecho",
              href:
                "http://daedcs.itam.mx/sites/default/files/programas/planes/plan_derecho.pdf"
            },
            {
              title: "Dirección Financiera",
              href:
                "https://direccionfinanciera.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-direccion-financiera-del-ITAM.pdf"
            },
            {
              title: "Economía",
              href:
                "https://economia.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-economia-del-ITAM.pdf"
            },
            {
              title: "Matemáticas Aplicadas",
              href:
                "https://matematicas.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-matematicas-aplicadas-del-ITAM.pdf"
            },
            {
              title: "Relaciones Internacionales",
              href:
                "https://relacionesinternacionales.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-relaciones-internacionales-del-ITAM.pdf"
            },
            {
              title: "Ing. Computación",
              href:
                "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_computacion.pdf"
            },
            {
              title: "Ing. Industrial",
              href:
                "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_industrial.pdf"
            },
            {
              title: "Ing. Mecatrónica",
              href:
                "https://mecatronica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-mecatronica-del-ITAM.pdf"
            },
            {
              title: "Ing. Negocios",
              href:
                "https://ingnegocios.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-negocios-del-ITAM.pdf"
            }
          ]
        },
        {
          icon: "mdi-calendar",
          title: "Calendarios",
          subitems: [
            {
              title: "Escolar: 2021",
              href:
                "http://escolar.itam.mx/servicios_escolares/calendarios/calesc2021_.gif"
            },
            {
              title: "Pagos: 2021",
              href:
                "http://escolar.itam.mx/servicios_escolares/calendarios/calescpagos2021.gif"
            }
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
          title: "OE's",
          subitems: [
            { title: "Ajedrez", to: "/oes/ajedrez" },
            { title: "Verde ITAM", to: "/oes/verdeitam" }
          ]
        },
        {
          icon: "mdi-link",
          title: "Links importantes",
          subitems: [
            { title: "ITAM", href: "https://www.itam.mx/" },
            { title: "Comunidad ITAM", href: "https://comunidad.itam.mx" },
            {
              title: "Servicios Personalizados",
              href: "https://serviciosweb.itam.mx/EDSUP/twbkwbis.P_WWWLogin"
            },
            {
              title: "Servicios NO Personalizados",
              href:
                "https://serviciosweb.itam.mx/EDSUP/BWZKSENP.P_MenuServNoPers"
            },
            { title: "Biblioteca", href: "https://biblioteca.itam.mx" }
          ]
        }
      ]
    };
  },
  methods: {
    sendTo(item) {
      if (item.href) {
        window.open(item.href, "_blank");
      } else {
        const path = item.to;
        if (this.$route.path !== path) this.$router.push(path);
      }
    }
  }
};
</script>

<style></style>
