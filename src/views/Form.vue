<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Se connecter</h1>
                        <h4 class="text-center mlt-4 mt-4">Entrez votre email pour vous connecter</h4>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="password"
                            label="password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" dark>Se connecter</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1 mb-2">Bonjour</h1>
                        <h4 class="text-center">Entrez vos coordonnées personnelles et commencez votre journée avec nous</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">S'inscrire</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2"> 
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1 mb-2">Bonjour</h1>
                        <h4 class="text-center">Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Se connecter</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">
                        Créer un compte</h1>
                        <h4 class="text-center mt-4">Entrez votre email pour vous inscrire</h4>
                        <v-form>
                          <v-text-field
                          label="Name"
                          name="Name"
                          prepend-icon="person"
                          type="text"
                          color="teal accent-3" />
                          <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="teal accent-3" />
                          <v-text-field
                          label="Password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="teal accent-3" />
                        </v-form>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded color="teal accent-3" dark>Créer un compte</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
};
</script>

<style>

</style>