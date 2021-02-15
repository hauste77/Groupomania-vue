
<template>
  <v-app>
    <v-app-bar app>
      <v-container class="py-0 fill-height">
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco" to="/Chat">
        <v-btn rounded color="teal accent-3" class="mr-3">forum</v-btn>
      </router-link>
          <v-btn @click.prevent="deconnexion()" rounded color="teal accent-3">déconnexion</v-btn>
      </v-container>
    </v-app-bar>
    <div id="profil" class="d-flex align-center justify-center">
      <v-form @submit="updateUser"
        ref="form">
        <v-card
        class="d-flex flex-column elevation-12"
        color="grey lighten-3"
      >
        <v-avatar class="Aligned flex item" color="grey darken-1" size="56">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-card-title class="my-3 justify-center">
          <h1>Mon profil</h1>
        </v-card-title>

        <v-card-text>
          <p>Nom :</p>
          <input
            label="username"
            name="username"
            id="username"
            :placeholder="[[user.username]]"
            :class="{ 'is-invalid': submitted && $v.username.$error }"
            v-model.trim="username"
          />
          <div v-if="submitted && $v.username.$error" class="invalid-feedback">
            <span class="error" v-if="!$v.username.minLength"
              >Votre nom doit faire au moins 4 caractères.</span
            >
            <span class="error" v-if="!$v.username.maxLength"
              >Votre nom doit faire moins de 20 caractères.</span
            >
          </div>

          <p>E-mail :</p>
          <input
            label="email"
            id="email"
            name="email"
            v-model.trim="email"
            :placeholder="[[user.email]]"
            :class="{ 'is-invalid': submitted && $v.email.$error }"
          />
          <div v-if="submitted && $v.email.$error" class="invalid-feedback">
            <span class="error" v-if="!$v.email.email"
              >L' email doit être valide</span
            >
          </div>
          <p>bio: <br> {{user.bio}}</p>
          <v-textarea color="teal accent-3" v-model.trim="bio">
            <template v-slot:label>
              <div>Bio <small>(optional)</small></div>
            </template>
          </v-textarea>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
            class="mr-3"
            color="teal accent-3"
            value="Submit"
            type="submit"
            rounded
            >Modifier</v-btn
          >
          <v-btn rounded color="teal accent-3">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
      
    </div>
  </v-app>
</template>

<script>
import { minLength, maxLength, email } from "vuelidate/lib/validators";

import Vue from "vue";

export default {
  data() {
    return {
      user: {},
      id: "",
      username: "",
      email: "",
      bio: "",
      rights: [],
      submitted: false,
    };
  },
  validations: {
    username: {
      minLength: minLength(4),
      maxLength: maxLength(20),
    },
    bio: {
      minLength: minLength(4),
      maxLength: maxLength(250),
    },
    email: {
      email,
    },
  },

  created: function () {
    Vue.$http
      .get("/users/me")
      .then((res) => {
        this.user = res.data;
        console.log(this.user)
        
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateUser: function (e) {

      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if ( this.email || this.username || this.bio ) {
        const data = {
          id: this.user.id
        };

        if ( this.email ) {
          data[ "email" ] = this.email;
        }
        if ( this.username ) {
          data[ "username" ] = this.username;
        }
        if ( this.bio ) {
          data[ "bio" ] = this.bio;
        }

        Vue.$http
          .put( "/users/me", data )
          .then((res) => {
            window.location.reload();
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

     deconnexion: function() {
         this.$session.destroy();
        window.location.reload();
       },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
#profil {
  display: flex;
  justify-content: center;
  height: 90vh;
  align-items: center;
}

.v-application p {
  margin-bottom: 10px;
}

input {
  margin-bottom: 10px;
}

.container.fill-height {
    align-items: center;
    display: flex;
}

.v-application--wrap {
  min-height: 0;
}

.v-toolbar__content {
  width: 100vw;
}

.d-flex.flex-column.elevation-12.v-card.v-sheet.theme--light.grey.lighten-3 {
  min-width: 20%;
}

@media (max-width: 768px) {
  
  .container.fill-height {
    flex-wrap: nowrap;
}
 
}
</style>