<template>
  <v-container id="chat" fluid>
    <router-link to="/post">
      <v-btn absolute fab large dark bottom right class="btn-add">
        <v-icon>mdi-comment-plus</v-icon>
      </v-btn>
    </router-link>

    <v-toolbar rounded dense dark>
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
          <router-link :to="{ name: 'comment', query: { id: post.id } }">
            <v-btn small color="green">
              <v-icon dense>mdi-message-outline</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'updatePost', query: { id: post.id } }">
            <v-btn small color="primary" v-if="isMyPost(post.userId)">
              <v-icon dense class="material-icons">edit</v-icon>
            </v-btn>
          </router-link>
          <v-btn small color="error" v-if="isMyPost(post.userId) || isAdmin">
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
      <div class="infos header">
        <div class="author">@{{ post.user.username }}</div>
        <div class="date">{{ format_date(post.createdAt) }}</div>
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
      posts: [],
      user: "",
      search: "",
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },

  created: function () {
    Vue.$http
      .get("/posts")
      .then((res) => {
        this.posts = res.data;
        console.log(this.posts)
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

  mounted: function () {
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
    dataUrl(blob) {
      if (blob) {
        let buff = new Buffer(blob.data);

        return `data:image/jpeg;base64,${buff.toString("base64")}`;
      }
    },
    deletePost(id) {
      if (id !== -1) {
        Vue.$http.delete("/posts/" + id)
       .then( () => {
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
            }
          });
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
    like(id) {
      const postId = this.posts.findIndex((post) => post.id === id);
      Vue.$http
        .get(`/posts/${postId}/like`)
        .then(() => {})
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
.v-btn--fab.v-size--large.v-btn--absolute.v-btn--bottom {
  right: 30px;
  bottom: 20px;
}

.btn > *:nth-child(n + 2) {
  margin-left: 5px;
}

.v-application a {
  text-decoration: none;
}

img {
  display: flex;
  max-height: 400px;
  max-width: 100%;
  margin: auto;
}

.infos {
  display: flex;
}
.infos > * {
  margin-bottom: 0;
}

.mdi-comment-plus::before {
  color: #1976d2;
}

@media (max-width: 500px) {
  .btn {
    display: flex;
    flex-direction: column-reverse;
    align-self: flex-start;
    margin-left: 10px;
    text-align: -webkit-right;
  }

  .v-card__title {
    align-items: flex-start;
}
}
</style>
