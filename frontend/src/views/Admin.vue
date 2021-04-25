<template>
  <v-container id="regular-tables" tag="section">
  <h1>List user</h1>
    <v-simple-table>
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
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td class="right">{{user.rights.join(', ')}}</td>
          <v-btn @click.prevent="() => deleteUser(user.id)" color="error" depressed>
            <v-icon 
            class="mdi-delete-clock" >mdi-delete-off</v-icon>
            
          </v-btn>
        </tr>
      </tbody>
    </v-simple-table>
  <v-snackbar top v-model="snackbar" color="success">
    {{ snackbarText }}
  </v-snackbar>
  </v-container>
</template>

<script>

import Vue from 'vue';

export default {
  data() {
    return {
      users: {},
      snackbar: false,
      snackbarText: "",
    };
  },

  created: function () {
    Vue.$http.get( "/users" )
      .then( res => { this.users = res.data } )
      .catch( error => console.log( error ) );
  },

   methods: {
    deleteUser(id) {
        const userId = this.users.findIndex((user) => user.id === id );

        if (userId !== -1) {
        this.users.splice(userId);
        Vue.$http.delete("/users/" + id);
        this.snackbar = true;
        this.snackbarText = "Compte supprimer";
   
        }
    },

   },
};

</script>

<style scoded>

.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
}

.primary--text {
  text-align: center !important;
}

table {
  min-width: 60vw;
}

.nodeco {
  text-decoration: none;
}

td {
  text-align: center;
  color: #ffffff;
}

table {
  background-color: #1E1E1E;
}

.v-data-table table thead tr th {
  font-weight: 300;
  font-size: 17px;
  padding: 0px 8px;
}

h1 {
  margin-bottom: 60px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: none !important;
}

@media (max-width: 450px) {

.container {
  padding: 0;
}  
  
td {
  font-size: 10px;
}

.right {
  display: none;
} 
}
</style>