<template>
  <v-container id="comments" fluid>
    <h1>Commentaire</h1>

    <v-toolbar rounded dense dark>
      <v-text-field
        class="mr-10"
        placeholder="Ajouter un commentaire"
        hide-details
        v-model="content"
        prepend-icon="edit"
        color="primary"
      ></v-text-field>
      <v-btn color="#1976d2" @click="commentPost">envoyer</v-btn>
    </v-toolbar>
    <v-card
      v-for="comment in comments.slice().reverse()"
      v-bind:key="comment.id"
      class="card comment"
      elevation="3"
      dark
    >
    <div class="comment_btn">

          <v-icon
            v-if="isMyComment(comment.userId) || isAdmin"
            dense
            color="error"
            class="mdi-delete-clock"
            @click.prevent="() => deleteComment(comment.id)"
            >mdi-delete-off</v-icon
          >
          
    </div>
        <p class="content">{{ comment.content }}</p>

      <div class="header">
        <div class="author">@{{ comment.user.username }}</div>
        <div class="date">{{ format_date(comment.createdAt) }}</div>
      </div>
    </v-card>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import Vue from "vue";
import moment from "moment";

moment.locale("fr");

export default {
  data() {
    return {
      comments: [],
      content: "",
      user: "",
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },

  created: function () {
    const id = this.$route.query.id;


    Vue.$http
      .get(`/posts/${id}/comments`)
      .then((res) => {
        this.comments = res.data.comment;
      })
      .catch((e) => {
        const err = e.response;

        this.snackbar = {
          message:  `HTTP ${err.status} / ${err.data.name} / ${err.data.errors[0].message}`,
          color: "error",
          show: true,
        };
      });
  },

  methods: {
    commentPost: function (e) {
      e.preventDefault();
      const postId = this.$route.query.id,
        data = new FormData();

      data.append("content", this.content);

      Vue.$http
        .post(`/posts/${postId}/comment`, data)
        .then(() => {
          this.snackbar = {
            message: "Message créer",
            color: "success",
            show: true,
          };
          window.location.reload();
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

    deleteComment(id) {
      const postId = this.$route.query.id;

      if (id !== -1) {
        Vue.$http
          .delete(`/posts/${postId}/comment/${id}`)
          .then(() => {
            this.snackbar = {
              message: "Message supprimer",
              color: "success",
              show: true,
            };
            setTimeout(() => window.location.reload(), 300);
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

    isMyComment(id) {
    const user = this.$store.getters.user;
      return user.id === id;
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YY à LT");
      }
    },

  },
    computed: {
      isAdmin() {
       const user = this.$store.getters.user;
        return (
          user.rights &&
          user.rights.length > 0 &&
          user.rights.includes("admin")
        );
      },
    },
};
</script>

<style scoped>
h1 {
  color: #1976d2;
}

.comment_btn {
  display: flex;
  justify-content: flex-end;
}

.delete_icon {
  display: flex;
}
.delete_icon p {
  flex: 1;
}

.content {
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 6px 10px;
  font-size: 0.9em;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px !important;
}
</style>