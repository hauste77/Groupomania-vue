<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-avatar class="mr-10" color="grey darken-1" size="40">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <v-spacer></v-spacer>
        <v-text-field
          class="mr-10"
          v-model="search"
          placeholder="search author"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
        ></v-text-field>
      <router-link class="nodeco" to="admin">
        <v-btn rounded color="teal accent-3" class="mr-3" v-if="isAdmin"
          >admin</v-btn
        >
      </router-link>
      <router-link class="nodeco" to="/">
        <v-btn rounded color="teal accent-3" class="mr-3">home</v-btn>
      </router-link>
      <router-link class="nodeco" to="Profile">
        <v-btn rounded color="teal accent-3" class="mr-3">profile</v-btn>
      </router-link>
      <router-link class="nodeco" to="post">
        <v-btn rounded color="teal accent-3" class="mr-3">créer message</v-btn>
      </router-link>
      <v-btn rounded color="teal accent-3" @click.prevent="deconnexion()"
        >déconnexion</v-btn
      >
    </v-app-bar>

    <v-main class="main grey lighten-2">
      <v-container fluid style="padding: 0">
        <v-row class="row" no-gutters>
          <v-col sm="10">
            <div class="chat-container elevation-12">
              <v-card
                color="grey lighten-3"
                v-for="post in filteredPosts.slice().reverse()"
                v-bind:key="post.id"
              >
                <v-card-title primary-title>
                  <div>
                    <p class="headline mb-2">
                     Créer le {{ format_date(post.createdAt)}}
                    </p>
                    <p class="headline mb-2">
                     Mise à jour le {{ format_date(post.updatedAt)}}
                    </p>
                    <div>
                      <h2 class="mb-2">{{ post.title }}</h2>
                      <p>
                        {{ post.content }}
                      </p>
                    </div>
                    <img
                      class="mt-4 align-center"
                      :src="dataUrl( post.attachment )"
                    />
                    <div>
                      <p class="mt-5 mb-0">author: {{ post.user.username }}</p>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="d-flex">
                  <!-- <v-btn
                    class="mr-3"
                    color="teal accent-3"
                    rounded
                    @click.prevent="() => like()"
                    >👍 {{}}</v-btn
                  > -->
                  <router-link
                    class="nodeco mr-3"
                    :to="{ name: 'updatePost', params: { id: post.id } }"
                  >
                    <v-btn
                      color="teal accent-3"
                      rounded
                      v-if="isMyPost(post.userId)"
                      >modifié</v-btn
                    >
                  </router-link>
                  <v-btn
                    color="red"
                    v-if="isMyPost(post.userId) || isAdmin"
                    rounded
                    @click.prevent="() => deletePost(post.id)"
                    >Supprimer</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
     <v-snackbar top v-model="snackbar" color="error">
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Vue from "vue";
import moment from "moment";

export default {
  data() {
    return {
      posts: [],
      user: "",
      search: "",
      snackbar: false,
      snackbarText: ""
    };
  },

  created: function () {
    Vue.$http
      .get("/posts")
      .then( res => { this.posts = res.data; } )
      .catch( ( error ) => console.log( error ) );
  },

  mounted: function () {
    Vue.$http
      .get("/users/me")
      .then( res => { this.user = res.data; } )
      .catch((error) => console.log(error));
  },

  methods: {
    dataUrl( blob ){
      if ( blob ) {
        let buff = new Buffer( blob.data );

        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
    },
    deletePost(id) {
      const postId = this.posts.findIndex((post) => post.id === id);

      if (postId !== -1) {
        this.posts.splice(postId);
        Vue.$http.delete("/posts/" + id);
          this.snackbar = true;
          this.snackbarText = "Message supprimer"
          setTimeout(() => window.location.reload(), 1000)
      }
    },

    isMyPost(id) {
      return this.user.id === id;
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YY à hh:mm");
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
          .then(() => {
          })

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
    }
  },
};
</script>

<style>
.v-application--wrap {
  min-height: 100vh;
  min-width: 100vw;
}

.v-card__actions.d-flex {
  margin-bottom: 20px;
}

main.v-main.main.grey.lighten-2 {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
}

.main {
  padding: 76px 0px 45px !important;
}

.nodeco {
  text-decoration: none !important;
}

.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.typer input[type="text"] {
  left: 2.5rem;
  padding: 1rem;
  width: 70%;
  margin-left: 5%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}

.row {
  display: flex;
  justify-content: center;
}
.chat-container {
  box-sizing: border-box;
  overflow-y: scroll;
  height: 80vh;
  margin-left: 20%;
  max-width: 60%;
  padding: 10px;
  background-color: #f2f2f2;
}

img {
  display: flex;
  max-height: 400px;
  max-width: 80%;
}

.v-input.mr-3.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--is-booted.v-text-field--placeholder {
  max-width: 20%;
}

@media (max-width: 768px) {
  .row{
    justify-content: space-between;
  } 

  .chat-container{
    min-width: 95vw;
    margin-left: 10px;
  }

  button.v-btn.v-btn--contained.v-btn--rounded {
    font-size: 10px;
}

 .v-application .headline {
   font-size: 1rem !important;
 } 

}
</style>
