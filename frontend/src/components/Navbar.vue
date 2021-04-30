<template>
  <div id="header">
    <v-toolbar dark>
      <!-- title -->
      <v-toolbar-title class="text-uppercase">
        <router-link to="/" tag="span" style="cursor: pointer"
          >Groupomania</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="isAdminUser" router :key="'admin'" :to="'/admin'">
          <v-icon left dark>settings</v-icon>
          Admin
        </v-btn>
        <v-btn
          v-for="item in menuItems"
          router
          :key="item.title"
          :to="item.link"
          text
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="isSignedInUser"
          text
          color="error"
          @click.prevent="deconnexion()"
        >
          <v-icon left dark>logout</v-icon>
          Déconnexion
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" temporary right>
      <v-list nav dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          class="list-btn"
          v-if="isAdminUser"
          router
          :key="'admin'"
          :to="'/admin'"
        >
          <v-icon left>settings</v-icon>
          Admin
        </v-list-item>
        <v-list-item
          class="list-btn"
          v-if="isSignedInUser"
          text
          @click.prevent="deconnexion()"
        >
          <v-icon left>logout</v-icon>
          Déconnexion
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    routeControl: "",
    authenticated: false,
    watch: {
      group() {
        this.drawer = false;
      },
    },
  }),
  methods: {
    logout: function () {
      this.authenticated = true;
    },

    deconnexion: function () {
      this.$store.dispatch("isSignedInUser", null).then(() => {
        this.$session.destroy();
        window.location.reload();
      });
    },
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "S'enregistrer", link: "/signup" },
        { icon: "lock_open", title: "Se connecter", link: "/login" },
      ];

      if (this.isSignedInUser) {
        menuItems = [
          { icon: "person", title: "Profil", link: "/profile" },
          { icon: "room", title: "Forum", link: "/chat" },
        ];
      }
      return menuItems;
    },
    isSignedInUser() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    isAdminUser: function () {
      return (
        this.isSignedInUser && this.$store.getters.user.rights.includes("admin")
      );
    },
  },
};
</script>

<style scoped>
.v-toolbar__title {
  color: #1976d2;
}

.nodeco {
  text-decoration: none !important;
  align-self: center;
}

.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.typer input[type="text"] {
  left: 2.5rem;
  padding: 1rem;
  width: 70%;
  margin-left: 5%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}

button.v-btn.v-btn--flat.v-btn--text.theme--dark.v-size--default {
  height: 64px;
}

.v-btn.v-btn--active {
  background-color: #1976d2 !important;
  color: cornsilk !important;
}

.v-btn--contained {
  box-shadow: none !important;
}

.v-navigation-drawer {
  background-color: #2b2b2b !important;
}

.v-list--dense .v-list-item .v-list-item__title {
  color: #ffffff !important;
}

.list-btn.v-list-item.v-list-item--link.theme--light {
  color: #f70909 !important;
}

a.list-btn.v-list-item.v-list-item--link.theme--light {
  color: #ffffff !important;
}

.v-icon {
  color: #ffffff !important;
}
</style>
