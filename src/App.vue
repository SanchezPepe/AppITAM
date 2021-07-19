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

.bm-burger-bars {
  background-color: #ffffff;
}

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 20px;
  cursor: pointer;
}

.line-style {
  position: absolute;
  height: 7%;
  left: 0;
  right: 0;
}
.TreeNavigation {
  font-size: 17px;
}
.bm-cross {
  margin: 5px;
}

.NavigationLevel__children {
  padding-left: 15px !important;
}

.NavigationLevel__parent {
  font-weight: 600;
}

.NavigationToggle__icon {
  border-color: #ffffff !important;
}

.NavigationItem,
.NavigationItem__router-link,
.NavigationItem__external-link {
  color: white !important;
  text-decoration: none;
}
</style>
