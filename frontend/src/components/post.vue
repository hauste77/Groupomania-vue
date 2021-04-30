<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <h1>Nouveau message</h1>
      <v-form ref="form" lazy-validation @submit="messagePost">
        <div v-if="submitted && $v.title.$error" class="invalid-feedback">
          <span v-if="!$v.title.required">Un titre est requis</span>
          <span class="error" v-if="!$v.title.minLength"
            >Le titre doit faire au moins 3 caractères de long</span
          >
          <span class="error" v-if="!$v.title.maxLength"
            >Le titre doit faire moins de 50 caractères de long</span
          >
        </div>
        <v-text-field
          v-model="title"
          :class="{ 'is-invalid': submitted && $v.title.$error }"
          label="Titre"
          color="#1976d2"
          dark
          required
          hint="Entre 3 et 50 caractères"
        ></v-text-field>

        <div v-if="submitted && $v.content.$error" class="invalid-feedback">
          <span v-if="!$v.content.required">Du contenu est requis</span>
          <span class="error" v-if="!$v.content.minLength"
            >Le contenu doit faire au moins 3 caractères de long</span
          >
          <span class="error" v-if="!$v.content.maxLength"
            >Le contenu doit faire moins de 250 caractères de long</span
          >
        </div>
        <v-textarea
          v-model="content"
          :class="{ 'is-invalid': submitted && $v.content.$error }"
          label="Contenu"
          color="#1976d2"
          required
          dark
          hint="Entre 3 et 250 caractères"
        ></v-textarea>

        <input
          type="file"
          ref="inputFile"
          accept="image/*"
          @change="saveInputFile"
        />
        <v-btn type="submit" value="Submit" color="primary" depressed
          >Valider</v-btn
        >
      </v-form>
    </v-card>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import Vue from "vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "",
    content: "",
    file: "",
    submitted: false,
    snackbar: {
      show: false,
      message: null,
      color: null,
    },
  }),
  validations: {
    title: { required, minLength: minLength(3), maxLength: maxLength(50) },
    content: { required, minLength: minLength(3), maxLength: maxLength(250) },
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

  validate() {
    this.$refs.form.validate();
  },

  methods: {
    saveInputFile: function () {
      this.file = this.$refs.inputFile.files[0];
    },

    messagePost: async function (e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) return;

      const data = new FormData();

      data.append("title", this.title);
      data.append("content", this.content);

      if (this.file && this.file instanceof File) {
        data.append(
          "attachment",
          new Blob([new Uint8Array(await this.file.arrayBuffer())], {
            type: this.file.type,
          })
        );
      } else {
        data.append("attachment", null);
      }

      Vue.$http
        .post("/posts/", data)
        .then(() => {
          this.snackbar = {
            message: "Message créer",
            color: "success",
            show: true,
          };
          setTimeout(() => this.$router.push("chat"), 700);
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
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
}
</style>