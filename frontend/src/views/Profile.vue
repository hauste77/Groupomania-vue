<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <v-form @submit="updateUser" ref="form">
        <h1>Mon profil</h1>

        <div v-if="submitted && $v.username.$error" class="invalid-feedback">
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
          v-model="username"
          :placeholder="user.username"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
          prepend-icon="person"
          color="#1976d2"
          type="text"
        />

        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
          <span class="error" v-if="!$v.email.email"
            >L' email doit être valide</span
          >
        </div>
        <v-text-field
          dark
          label="email"
          name="email"
          id="email"
          v-model="email"
          :placeholder="user.email"
          :class="{ 'is-invalid': submitted && $v.email.$error }"
          prepend-icon="person"
          color="#1976d2"
          type="text"
        />

        <v-textarea
          dark
          label="bio"
          name="bio"
          id="bio"
          v-model="bio"
          :placeholder="user.bio"
          :class="{ 'is-invalid': submitted && $v.bio.$error }"
          prepend-icon="person"
          color="#1976d2"
          type="text"
        />

        <v-btn value="Submit" type="submit" color="primary" depressed
          >Modifier</v-btn
        >
        <v-btn
          @click.prevent="() => deleteUser(user.id)"
          color="error"
          depressed
          >Supprimer compte</v-btn
        >
      </v-form>
    </v-card>

    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
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
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
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
  methods: {
    updateUser: function (e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.email || this.username || this.bio) {
        const data = {
          id: this.user.id,
        };

        if (this.email) {
          data["email"] = this.email;
        }
        if (this.username) {
          data["username"] = this.username;
        }
        if (this.bio) {
          data["bio"] = this.bio;
        }

        Vue.$http
          .put("/users/me", data)
          .then(() => window.location.reload())
          .catch((e) => {
            const err = e.response;

            this.snackbar = {
              message: `HTTP ${err.status} / ${err.data.name} / ${err.data.errors[0].message}`,
              color: "error",
              show: true,
            };
          });
      }
    },

    deleteUser() {
      Vue.$http
        .delete("/users/me")
        .then(() => {
          this.snackbar = {
            message: "Compte supprimer",
            color: "success",
            show: true,
          };
          this.$store.dispatch("isSignedInUser", null).then(() => {
            this.$session.destroy();
            window.location.reload();
          });
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

    deconnexion: function () {
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

<style scoped>
.container {
  justify-content: center;
}

.v-btn:last-child {
  margin-left: 10px;
}
</style>