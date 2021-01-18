<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco" to="/">
        <v-btn rounded color="teal accent-3">accueil</v-btn>
      </router-link>
    </v-app-bar>
    <v-container id="regular-tables" tag="section">
    <h1>List user</h1>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">Name</th>
            <th class="primary--text">Email</th>
            <th class="primary--text">bio</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
             <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
             <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
             <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
             <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
             <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <v-btn color="red" >
              <v-icon class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-app>
</template>

<script>

export default {
   
};
</script>

<style>

.container {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-direction: column;
}

.primary--text {
  text-align: center !important;
}

table {
  min-width: 60vw;
}

td {
  text-align: center;
}

.v-data-table table thead tr th {
  font-weight: 300;
  font-size: 17px;
  padding: 0px 8px;
}
</style>