<template>
  <v-container fluid>
    <v-card class="d-flex flex-column elevation-12" color="grey lighten-3">
      <v-form
        ref="form"
        d-flex
        align-center
        justify-center
        lazy-validation
        @submit.prevent="updatePost"
      >
        <v-col>
          <div v-if="submitted && $v.title.$error" class="invalid-feedback">
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

          <v-row justify="space-around" align="end">
            <input
              type="file"
              ref="inputFile"
              accept="image/*"
              @change="saveInputFile"
            />
            <v-btn
              color="primary"
              class="mt-4"
              type="submit"
              value="Submit"
              >modifié</v-btn
            >
          </v-row>
        </v-col>
      </v-form>
    </v-card>
    <v-snackbar
    top
    v-model="snackbar"
    color="success"
    >
    {{snackbarText}}
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
      snackbar: false,
      snackbarText: ""
    };
  },
  validations: {
    title: { minLength: minLength(3), maxLength: maxLength(50) },
    content: { minLength: minLength(3), maxLength: maxLength(250) },
  },

  methods: {
    saveInputFile: function () {
      this.file = this.$refs.inputFile.files[0];
    },

    async updatePost(e) {
      e.preventDefault();
      this.$v.$touch();

      if (this.title || this.content || this.file) {
        const id = this.$route.params.id,
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
          .then((res) => {
            console.log(res);
              this.snackbar = true;
              this.snackbarText = "Message mise à jour"
              setTimeout(() => this.$router.push("chat"), 2000)
          }) 
          .catch((err) => console.log(err)); // Afficher un message d'erreur
      } else {
        // Afficher un message qui dit que y'a aucun input de rempli
      }
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
  min-width: 50vw;
  width: 50%;
}

main.v-main.main.grey.lighten-2 {
  height: 95vh;
  display: flex;
  align-items: center;
}

@media (max-width: 500px) {
  .v-form {
    width: 100%;
}
}
</style>