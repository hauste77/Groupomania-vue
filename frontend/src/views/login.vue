<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <v-form @submit="loginSubmit" ref="form">
        <h1>Se connecter</h1>
        <h4 class="text-center mlt-4 mt-4">
          Entrez votre email pour vous connecter
        </h4>

        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
          <span class="error" v-if="!$v.email.required">Email requis</span>
          <span class="error" v-if="!$v.email.email"
            >L' email doit être valide</span
          >
        </div>
        <v-text-field
          dark
          label="Email"
          name="email"
          id="email"
          v-model.trim="email"
          placeholder="user@yahoo.com"
          :class="{ 'is-invalid': submitted && $v.email.$error }"
          prepend-icon="email"
          type="email"
        />

        <div v-if="submitted && $v.password.$error" class="invalid-feedback">
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
        <v-text-field
          dark
          id="password"
          label="password"
          name="password"
          :class="{ 'is-invalid': submitted && $v.password.$error }"
          v-model="password"
          prepend-icon="lock"
          type="password"
        />

        <v-btn value="Submit" type="submit" color="primary">Se connecter</v-btn>
      </v-form>
    </v-card>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import Vue from "vue";

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
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
      email,
    },
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return true;
      }

      const dataForm = JSON.stringify({
        email: this.email,
        password: this.password,
      });

      Vue.$http
        .post("/auth/login", dataForm)
        .then((res) => {
          if (res.status === 200 && res.data.token) {
            this.$store.dispatch("isSignedInUser", res.data.user).then(() => {
              this.$session.start();
              this.$session.set("jwt", res.data.token);
              this.$router.push("chat");
            });
          }
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
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
}
</style>