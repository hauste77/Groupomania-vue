
<template>
  <div id="profil" class="d-flex align-center justify-center">
    <v-form @submit="updateUser"
      ref="form">
      <v-card
      class="d-flex flex-column elevation-12"
      color="grey lighten-3"
    >
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
        <p>bio:</p>
        <span class="bio">{{user.bio}}</span>
        <v-textarea color="primary" v-model.trim="bio">
          <template v-slot:label>
            <div color="#ffffff">Bio <small>(optional)</small></div>
          </template>
        </v-textarea>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          class="mr-3"
          color="primary"
          value="Submit"
          type="submit"
          depressed
          >Modifier</v-btn
        >
        <v-btn @click.prevent="() => deleteUser(user.id)" depressed color="error" >Supprimer compte</v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
    
  <v-snackbar top v-model="snackbar" color="success">
    {{ snackbarText }}
  </v-snackbar>
  </div>
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
      snackbar: false,
      snackbarText: "",
      submitted: false
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

    deleteUser() {
      Vue.$http.delete("/users/me")
      .then(() => {
        this.snackbar = true;
        this.snackbarText = "Compte supprimer";
        this.$session.destroy();
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((error) => {
        console.log(error);
      });
    },

     deconnexion: function() {
         this.$session.destroy();
        window.location.reload();
       },

    validate() {
      this.$refs.form.validate();
    },
  },

   computed: {
    isAdmin() {
      return (
        this.user.rights &&
        this.user.rights.length > 0 &&
        this.user.rights.includes("admin")
      );
    },
  },
};
</script>

<style>
#profil {
  height: 100vh;
}

form.v-form {
    min-width: 100vw;
    display: flex;
    justify-content: center;
}

.v-application p {
  margin-bottom: 10px;
}

h1 {
  color: #1976d2;
}

.v-card__text p {
  color: #1976d2;
}

input {
  margin-bottom: 10px;
}

.container.fill-height {
    align-items: center;
    display: flex;
}

.d-flex.flex-column.elevation-12.v-card.v-sheet.theme--light.grey.lighten-3 {
  min-width: 20%;
}

.d-flex.flex-column.elevation-12.v-card.v-sheet.theme--light.grey.lighten-3 {
    background-color: #1E1E1E !important;
}

.theme--light.v-input input, .theme--light.v-input textarea {
    color: #ffffff !important;
}

.bio {
  color: #ffffff;
}

label.v-label.theme--light {
  color: #1976d2;
}

@media (max-width: 375px) {
  #profil {
    height: 110vh;
  }
}
</style>