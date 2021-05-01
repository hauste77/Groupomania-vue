<template>
  <v-container fluid>
    <v-card class="elevation-12 theme--dark">
      <h1>Modifier message</h1>
      <v-form ref="form" lazy-validation @submit.prevent="updatePost">
        <div v-if="submitted && $v.title.$error" class="invalid-feedback">
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
          required
          dark
          hint="Entre 3 et 50 caractères"
        ></v-text-field>
        <div v-if="submitted && $v.content.$error" class="invalid-feedback">
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
          required
          color="#1976d2"
          dark
          hint="Entre 3 et 250 caractères"
        ></v-textarea>

        <v-row justify="space-around" align="end">
          <input
            type="file"
            ref="inputFile"
            accept="image/*"
            @change="saveInputFile"
          />
          <v-btn color="primary" class="mt-4" type="submit" value="Submit"
            >modifié</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import Vue from "vue";
import { minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      title: "",
      content: "",
      file: "",
      submitted: false,
      message: "",
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },
  validations: {
    title: { minLength: minLength(3), maxLength: maxLength(50) },
    content: { minLength: minLength(3), maxLength: maxLength(250) },
  },

  validate() {
    this.$refs.form.validate();
  },

  methods: {
    saveInputFile: function () {
      this.file = this.$refs.inputFile.files[0];
    },

    async updatePost(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();

      if (this.title || this.content || this.file) {
        const id = this.$route.query.id,
          data = new FormData();

        data.append("id", id);
        this.title && data.append("title", this.title);
        this.content && data.append("content", this.content);

        if (this.file instanceof File) {
          data.append(
            "attachment",
            new Blob([new Uint8Array(await this.file.arrayBuffer())], {
              type: this.file.type,
            })
          );
        }

        Vue.$http
          .put(`/posts/${id}`, data)
          .then(() => {
            this.snackbar = {
              message: "Message mise à jour",
              color: "success",
              show: true,
            };
            setTimeout(() => this.$router.push("chat"), 1000);
          })
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
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
}

input[type="file"] {
  color: #1976d2;
}
</style>