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
          <v-col cols="12" md="8">
            <v-form @submit="signUpSubmit" ref="form">
              <v-card class="elevation-12">
                <v-card-text class="">
                  <h1 class="text-center display-2 teal--text text--accent-3">
                    Créer un compte
                  </h1>
                  <h4 class="text-center mt-4">
                    Entrez votre email pour vous inscrire
                  </h4>
                  <v-text-field
                    label="username"
                    name="username"
                    id="username"
                    :class="{ 'is-invalid': submitted && $v.username.$error }"
                    v-model="username"
                    prepend-icon="person"
                    type="text"
                    required
                    color="teal accent-3"
                    hint="Entre 4 et 20 caractères"
                  />
                  <div
                    v-if="submitted && $v.username.$error"
                    class="invalid-feedback"
                  >
                    <span class="error" v-if="!$v.username.required"
                      >Nom d'utilisateur requis</span
                    >
                    <span class="error" v-if="!$v.username.minLength"
                      >Votre nom doit faire au moins 4 caractères.</span
                    >
                    <span class="error" v-if="!$v.username.maxLength"
                      >Votre nom doit faire moins de 20 caractères.</span
                    >
                  </div>
                  <v-text-field
                    label="email"
                    name="email"
                    id="email"
                    :class="{ 'is-invalid': submitted && $v.email.$error }"
                    v-model="email"
                    prepend-icon="email"
                    type="text"
                    required
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
                    label="Password"
                    name="password"
                    id="password"
                    :class="{ 'is-invalid': submitted && $v.password.$error }"
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                    required
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
                <div class="text-center pb-5">
                  <v-btn
                    type="submit"
                    value="Submit"
                    rounded
                    color="teal accent-3"
                    >Créer un compte</v-btn
                  >
                </div>
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

export default {
  name: "signup",

  data() {
    return {
      step: 1,

      email: "",
      username: "",
      password: "",
      submitted: false,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20),
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(50),
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    signUpSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let dataForm = JSON.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: dataForm,
        
      })
        .then((res) => {
          console.log(res);
          console.log(dataForm);

          this.$router.push("login");
        })
        .catch((error) => {
          console.log("Une erreur s'est produite:", error.response);
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
</style>