<template>
  <v-container fluid>
    <v-form @submit="loginSubmit" ref="form">
      <v-card class="elevation-12">
        <v-row>
          <v-col cols="12">
            <v-card-text class="">
              <h1
                class="text-center display-2"
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
                color="primary"
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
                color="primary"
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
              <v-btn value="Submit" type="submit" color="primary" >Se connecter</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
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
            this.$store.dispatch( 'isSignedInUser', res.data.user )
              .then( () => { 
                this.$session.start()
                this.$session.set( 'jwt', res.data.token )
                this.$router.push("chat");
              } )
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

<style scoped>
.container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center !important;
}

.v-form {
  width: 50%;
} 

h1.text-center.display-2 {
  color: #1976d2;
}

.logo {
  color: #1976d2;
}

.v-application .error {
  background-color: white !important;
  color: red;
}

@media (max-width: 1170px) {
  .v-form {
    width: 100%;
  } 
}
</style>