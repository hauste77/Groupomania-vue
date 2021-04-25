<template>
  <v-container fluid>
    <router-link to="/post">
      <v-btn
        absolute
        fab
        large
        dark
        bottom
        right
        class="btn-add"
      >
        <v-icon>mdi-comment-plus</v-icon>
      </v-btn>
    </router-link>

    <v-toolbar
      rounded
      dense
      dark
    >
      <v-text-field
        class="mr-10"
        v-model="search"
        placeholder="search author"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        color="primary"
      ></v-text-field>
    </v-toolbar>
    <v-card
      v-for="post in filteredPosts.slice().reverse()"
      v-bind:key="post.id"
      class="card"
      elevation="3"
      dark
    >
      <v-card-title primary-title>
        <h2>{{ post.title }}</h2>
        <v-spacer></v-spacer>
        <div class="btn">
          <router-link :to="{ name: 'updatePost', params: { id: post.id } }">
            <v-btn
              v-if="isMyPost(post.userId)"
              small
              color="primary"
            >
              <v-icon dense class="material-icons">edit</v-icon>
            </v-btn>
          </router-link>
          <v-btn
            v-if="isMyPost(post.userId) || isAdmin"
            small
            color="error"
          >
            <v-icon
              dense
              class="mdi-delete-clock"
              @click.prevent="() => deletePost(post.id)"
              >mdi-delete-off</v-icon
            >
          </v-btn>
      </div>
      </v-card-title>

      <p class="body">{{ post.content }}</p>
      <img :src="dataUrl(post.attachment)" />
      <div class="infos">
        <p class="author">Auteur : {{ post.user.username }}</p>
        <v-spacer></v-spacer>
        <p size class="date">Créé le {{ format_date(post.createdAt) }}</p>
      </div>
    </v-card>
  <v-snackbar top v-model="snackbar" color="error">
    {{ snackbarText }}
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
      posts: [],
      user: "",
      search: "",
      snackbar: false,
      snackbarText: "",
    };
  },

  created: function () {
    Vue.$http
      .get("/posts")
      .then((res) => {
        this.posts = res.data;
      })
      .catch((error) => console.log(error));
  },

  mounted: function () {
    Vue.$http
      .get("/users/me")
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));
  },

  methods: {
    dataUrl(blob) {
      if (blob) {
        let buff = new Buffer(blob.data);

        return `data:image/jpeg;base64,${buff.toString("base64")}`;
      }
    },
    deletePost(id) {
      const postId = this.posts.findIndex((post) => post.id === id);

      if (postId !== -1) {
        this.posts.splice(postId);
        Vue.$http.delete("/posts/" + id);
        this.snackbar = true;
        this.snackbarText = "Message supprimer";
        setTimeout(() => window.location.reload(), 1000);
      }
    },

    isMyPost(id) {
      return this.user.id === id;
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YY à LT");
      }
    },

    deconnexion: function () {
      this.$session.destroy();
      window.location.reload();
    },

    likeDislike(id) {
      const postId = this.posts.findIndex((post) => post.id === id);
      const userId = this.user.id;
      if (postId !== -1 && userId === id) {
        Vue.$http
          .post(`/posts/${postId}/like`)
          .then(() => {})

          .catch((error) => console.log(error));
      }
    },

    like(id) {
      const postId = this.posts.findIndex((post) => post.id === id);
      Vue.$http
        .get(`/posts/${postId}/like`)
        .then((res) => {
          // this.user = res.data;
          console.log(res);
          // window.location.reload();
        })
        .catch((error) => console.log(error));
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

    filteredPosts: function () {
      return this.posts.filter((post) => {
        return post.user.username.match(this.search);
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
}

.v-btn--fab.v-size--large.v-btn--absolute.v-btn--bottom {
  right: 30px;
  bottom: 20px;
}

.card.v-card {
  width: 45%;
  padding: 10px;
  border-radius: 6px;
}
.card.v-card:nth-child(n+2),
.card.v-card > *:nth-child(n+2) {
  margin-top: 20px;
}

.card.v-card .v-card__title {
  flex-wrap: nowrap;
  padding: 0 0 16px;
}

img {
  display: flex;
  max-height: 400px;
  max-width: 100%;
  margin: auto;
}

.infos {
  display:flex;
}
.infos > * {
  margin-bottom: 0;
}

.mdi-comment-plus::before {
    color: #1976d2;
}

@media (max-width: 1020px) {
  .card.v-card {
    width: 90%;
  }
}
@media (max-width: 500px) {
  .btn {
    align-self: flex-start;
    margin-left: 10px;
    text-align: -webkit-right;
}
}
</style>
