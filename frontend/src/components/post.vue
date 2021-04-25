<template>
  <v-container fluid>
  <v-card class="d-flex flex-column elevation-12" color="grey lighten-3">
    <v-form
      ref="form"
      d-flex
      align-center
      justify-center
      lazy-validation
      @submit="messagePost"
    >
      <v-col>
        <div v-if="submitted && $v.title.$error" class="invalid-feedback">
          <span v-if="!$v.title.required">Un titre est requis</span>
          <span v-if="!$v.title.minLength"
            >Le titre doit faire au moins 3 caractères de long</span
          >
          <span v-if="!$v.title.maxLength"
            >Le titre doit faire moins de 50 caractères de long</span
          >
        </div>
        <v-row>
          <v-text-field
            v-model="title"
            prepend-icon="fa-pen"
            :class="{ 'is-invalid': submitted && $v.title.$error }"
            label="Titre"
            class="ma-2"
            required
            hint="Entre 3 et 50 caractères"
          ></v-text-field>
        </v-row>
        <div v-if="submitted && $v.content.$error" class="invalid-feedback">
          <span v-if="!$v.content.required">Du contenu est requis</span>
          <span v-if="!$v.content.minLength"
            >Le contenu doit faire au moins 3 caractères de long</span
          >
          <span v-if="!$v.content.maxLength"
            >Le contenu doit faire moins de 250 caractères de long</span
          >
        </div>
        <v-row>
          <v-textarea
            v-model="content"
            prepend-icon="fa-pen"
            :class="{ 'is-invalid': submitted && $v.content.$error }"
            label="Contenu"
            class="ma-2"
            required
            hint="Entre 3 et 250 caractères"
          ></v-textarea>
        </v-row>

        <input
          type="file"
          ref="inputFile"
          accept="image/*"
          @change="saveInputFile"
        />

        <v-row justify="space-around" align="end">
          <v-btn
            type="submit"
            value="Submit"
            class="mt-4"
            color="primary"
            depressed
            >Valider</v-btn
          >
        </v-row>
      </v-col>
    </v-form>
  </v-card>
  <v-snackbar top v-model="snackbar" color="success">
    {{ snackbarText }}
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
    snackbar: false,
    snackbarText: "",
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
      .catch((error) => {
        console.log(error);
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
        .then((res) => {
          console.log(res);
          this.snackbar = true;
          this.snackbarText = "Message créer";
          setTimeout(() => this.$router.push("chat"), 1000);
        })
        .catch((err) => console.log(err)); // Afficher un message d'erreur
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
  min-width: 50vw;
  width: 50%;
}

@media (max-width: 500px) {
  .v-form {
    width: 100%;
}
}
</style>