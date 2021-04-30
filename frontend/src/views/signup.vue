<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <v-form @submit="signUpSubmit" ref="form">
        <h1>S'enregistrer</h1>
        <h4 class="text-center">Entrez votre email pour vous inscrire</h4>

        <div v-if="submitted && $v.username.$error" class="invalid-feedback">
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
          dark
          label="username"
          name="username"
          id="username"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
          v-model="username"
          prepend-icon="person"
          type="text"
          color="#1976d2"
          required
          hint="Entre 4 et 20 caractères"
        />

        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
          <span class="error" v-if="!$v.email.required">Email requis</span>
          <span class="error" v-if="!$v.email.email"
            >L' email doit être valide</span
          >
        </div>
        <v-text-field
          dark
          label="email"
          name="email"
          id="email"
          :class="{ 'is-invalid': submitted && $v.email.$error }"
          v-model="email"
          prepend-icon="email"
          type="text"
          color="#1976d2"
          required
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
          label="Password"
          name="password"
          id="password"
          :class="{ 'is-invalid': submitted && $v.password.$error }"
          v-model="password"
          prepend-icon="lock"
          type="password"
          color="#1976d2"
          required
        />

        <v-btn type="submit" value="Submit" color="primary"
          >Créer un compte</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script scoped>
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
        .then(() => this.$router.push("login"))
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