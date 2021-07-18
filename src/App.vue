<template>
  <v-app id="inspire">
    <!-- TOOLBAR -->
    <v-card class="overflow-hidden">
      <v-app-bar
        app
        flat
        dark
        color="#006853"
        src="./assets/plazaroja.jpg"
        fade-img-on-scroll
        shrink-on-scroll
        elevate-on-scroll
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.7), rgb(0, 104, 83,.8)"
          ></v-img>
        </template>
        <v-container class="py-0 fill-height">
          <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->
          <p class="mt-2">
            <a id="logo" class="text-decoration-none" @click="sendTo('/')">
              App ITAM
            </a>
          </p>

          <v-spacer></v-spacer>

          <div v-if="!menu">
            <v-menu
              style="z-index:99999;"
              open-on-hover
              bottom
              offset-y
              rounded="large"
              transition="slide-y-transition"
              v-for="item in items"
              :key="item.name"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn text dark v-bind="attrs" v-on="on" @click="sendTo(item)">
                  {{ item.name }}
                </v-btn>
              </template>

              <!-- If there are subitems items menu's -->
              <v-list v-if="item.children">
                <v-list-item
                  v-for="child in item.children"
                  :key="child.name"
                  @click="sendTo(child)"
                >
                  <v-list-item-title> {{ child.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-spacer></v-spacer>
        </v-container>
      </v-app-bar>
    </v-card>

    <!-- BODY -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="primary">
          <strong class="subheading">
            Ayúdanos a mejorar la aplicación, escríbenos a wil@itam.mx
          </strong>

          <v-spacer></v-spacer>

          <strong class="subheading">
            Lab Web ITAM - {{ new Date().getFullYear() }}
          </strong>
        </v-card-title>
      </v-card>
    </v-footer>

    <Slide :crossIcon="true" v-if="menu" style="z-index: 9999" right>
      <vue-tree-navigation :items="items" />
    </Slide>
  </v-app>
</template>

<script>
import { Slide } from "vue-burger-menu";

export default {
  name: "App",
  data() {
    return {
      items: [
        {
          icon: "mdi-home",
          name: "Inicio",
          path: "/home"
        },
        {
          icon: "mdi-table-clock",
          name: "Horarios",
          path: "/calendar"
        },
        {
          icon: "mdi-bus-multiple",
          name: "Transporte",
          path: "/transit"
        },
        {
          icon: "mdi-notebook",
          name: "Planes de estudio",
          children: [
            {
              name: "Actuaría",
              external:
                "https://actuaria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-actuaria-del-ITAM.pdf"
            },
            {
              name: "Administración",
              external:
                "https://administracion.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-administracion-del-ITAM.pdf"
            },
            {
              name: "Ciencia de Datos",
              external:
                "https://daaem.itam.mx/sites/default/files/programas/planes/plan_ciencia_datos.pdf"
            },
            {
              name: "Ciencia Política",
              external:
                "https://politica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-ciencia-politica-del-ITAM.pdf"
            },
            {
              name: "Contaduría",
              external:
                "https://contaduria.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-contaduria-publica-y-estrategia-financiera-del-ITAM.pdf"
            },
            {
              name: "Derecho",
              external:
                "http://daedcs.itam.mx/sites/default/files/programas/planes/plan_derecho.pdf"
            },
            {
              name: "Dirección Financiera",
              external:
                "https://direccionfinanciera.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-direccion-financiera-del-ITAM.pdf"
            },
            {
              name: "Economía",
              external:
                "https://economia.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-economia-del-ITAM.pdf"
            },
            {
              name: "Matemáticas Aplicadas",
              external:
                "https://matematicas.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-matematicas-aplicadas-del-ITAM.pdf"
            },
            {
              name: "Relaciones Internacionales",
              external:
                "https://relacionesinternacionales.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-licenciatura-en-relaciones-internacionales-del-ITAM.pdf"
            },
            {
              name: "Ing. Computación",
              external:
                "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_computacion.pdf"
            },
            {
              name: "Ing. Industrial",
              external:
                "https://dai.itam.mx/sites/default/files/programas/planes/plan_ing_industrial.pdf"
            },
            {
              name: "Ing. Mecatrónica",
              external:
                "https://mecatronica.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-mecatronica-del-ITAM.pdf"
            },
            {
              name: "Ing. Negocios",
              external:
                "https://ingnegocios.itam.mx/sites/default/files/programas/planes/plan-de-estudios-de-la-ingenieria-en-negocios-del-ITAM.pdf"
            }
          ]
        },
        {
          icon: "mdi-calendar",
          name: "Calendarios",
          children: [
            {
              name: "Escolar: 2021",
              external:
                "http://escolar.itam.mx/servicios_escolares/calendarios/calesc2021_.gif"
            },
            {
              name: "Pagos: 2021",
              external:
                "http://escolar.itam.mx/servicios_escolares/calendarios/calescpagos2021.gif"
            }
          ]
        },
        {
          icon: "mdi-link",
          name: "Sitios ITAM",
          children: [
            { name: "ITAM", external: "https://www.itam.mx/" },
            {
              name: "Canvas",
              external: "https://itam.instructure.com/login/canvas"
            },

            { name: "Comunidad ITAM", external: "https://comunidad.itam.mx" },
            {
              name: "Servicios Personalizados",
              external: "https://serviciosweb.itam.mx/EDSUP/twbkwbis.P_WWWLogin"
            },
            {
              name: "Servicios NO Personalizados",
              external:
                "https://serviciosweb.itam.mx/EDSUP/BWZKSENP.P_MenuServNoPers"
            },
            { name: "Biblioteca", external: "https://biblioteca.itam.mx" }
          ]
        }
      ]
    };
  },
  computed: {
    window() {
      return this.$store.state.window;
    },
    menu() {
      return this.window.width < 700;
    }
  },
  components: {
    Slide
  },
  methods: {
    sendTo(item) {
      if (item === "/") this.$router.push("/");
      else if (item.external) window.open(item.external, "_blank");
      else {
        const path = item.path;
        if (this.$route.path !== path) this.$router.push(path);
      }
    },
    handleResize() {
      this.$store.dispatch("updateWindow", [
        window.innerWidth,
        window.innerHeight
      ]);
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
};
</script>

<style>
#logo {
  color: white;
}
</style>
