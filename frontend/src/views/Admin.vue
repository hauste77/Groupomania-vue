<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <h1>List user</h1>

      <v-simple-table dark>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">Name</th>
            <th class="primary--text">Email</th>
            <th class="primary--text right">Right</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="right">{{ user.rights.join(", ") }}</td>
            <v-btn
              @click.prevent="() => deleteUser(user.id)"
              color="error"
              depressed
            >
              <v-icon class="mdi-delete-clock">mdi-delete-off</v-icon>
            </v-btn>
          </tr>
        </tbody>
      </v-simple-table>

      <v-snackbar :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.message }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      users: {},
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },

  created: function () {
    Vue.$http
      .get("/users")
      .then((res) => {
        this.users = res.data;
      })
      .catch((e) => {
        const err = e.response;

        this.snackbar = {
          message: `HTTP ${err.status} / ${err.data.name} / ${err.data.errors[0].message}`,
          color: "error",
          show: true,
        };
      });
  },

  methods: {
    deleteUser(id) {
      const userId = this.users.findIndex((user) => user.id === id);

      if (userId !== -1) {
        this.users.splice(userId);
        Vue.$http
          .delete("/users/" + id)
          .then(() => {
            this.snackbar = {
              message: "Compte supprimer",
              color: "success",
              show: true,
            };
          })
          .catch((e) => {
            const err = e.response;

            this.snackbar = {
              message: `HTTP ${err.status} / ${err.data.name} / ${err.data.errors[0].message}`,
              color: "success",
              show: true,
            };
          });
      }
    },
  },

  updated: function () {
    return this.users;
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
}

.primary--text,
td {
  text-align: center !important;
}

div.v-data-table table thead tr th {
  font-size: 1em;
  padding: 0px 8px;
}

@media (max-width: 500px) {
 div.v-data-table table thead tr th:nth-child(1){
 display: none;
}
 div.v-data-table table tbody tr td:nth-child(1){
 display: none;
}

.elevation-12.theme--dark.v-card.v-sheet.theme--light {
  padding: 5px;
}
}
</style>