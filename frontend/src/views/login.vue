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
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-form @submit="loginSubmit" ref="form">
              <v-card class="elevation-12">
                <v-row>
                  <v-col cols="12">
                    <v-card-text class="">
                      <h1
                        class="text-center display-2 teal--text text--accent-3"
                      >
                        Se connecter
                      </h1>
                      <h4 class="text-center mlt-4 mt-4">
                        Entrez votre email pour vous connecter
                      </h4>
                      <v-text-field
                        label="Email"
                        name="email"
                        id="email"
                        v-model.trim="email"
                        placeholder="user@yahoo.com"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                        prepend-icon="email"
                        type="email"
                        color="teal accent-3"
                      />
                      <div
                    v-if="submitted && $v.email.$error"
                    class="invalid-feedback"
                  >
                    <span class="error" v-if="!$v.email.required">Email requis</span>
                    <span class="error" v-if="!$v.email.email">L' email doit être valide</span>
                  </div>
                      <v-text-field
                        id="password"
                        label="password"
                        name="password"
                        :class="{ 'is-invalid': submitted && $v.password.$error }"
                        v-model="password"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                      />
                      <div
                    v-if="submitted && $v.password.$error"
                    class="invalid-feedback"
                  >
                    <span class="error" v-if="!$v.password.required"
                      >Mot de passe requis</span
                    >
                    <span class="error" v-if="!$v.password.minLength"
                      >Votre mot de passe doit faire au moins 4 caractères.</span
                    >
                    <span class="error" v-if="!$v.password.maxLength"
                      >Votre mot de passe doit faire moins de 50 caractères.</span
                    >
                  </div>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn value="Submit" type="submit" rounded color="teal accent-3" >Se connecter</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import Vue from 'vue';

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(50),
    },
    email: {
      required,
      email
    },
  },
  methods: {
    loginSubmit( e ) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const dataForm = JSON.stringify( {
        email: this.email,
        password: this.password,
      } );

      Vue.$http.post( '/auth/login', dataForm )
        .then( (res) => {
          if ( res.status === 200 &&  res.data.token ) {
              this.$session.start()
              this.$session.set( 'jwt', res.data.token )
              this.$router.push("chat");
            }
        },)
        .catch( error => {
          console.log( error );
        });
    },
    validate() {
      this.$refs.form.validate();
    },
  },
    
};
</script>

<style>
.row {
  margin: 0;
}
.v-application .error {
  background-color: white !important;
  color: red;
}
</style>