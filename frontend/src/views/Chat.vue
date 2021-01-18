<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="40">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-spacer></v-spacer>
        <router-link class="nodeco" to="Profile">
          <v-btn rounded color="teal accent-3" class="mr-3" >profile</v-btn>
        </router-link>
        <router-link class="nodeco" to="post">
          <v-btn rounded color="teal accent-3" >message</v-btn>
        </router-link>
      </v-container>
    </v-app-bar>

    <v-main class="main grey lighten-2">
      <v-container fluid style="padding: 0">
        <v-row class="row" no-gutters>
          <v-col sm="10">
            <div class="chat-container elevation-12">
              <v-card color="grey lighten-3" v-for="post in posts.slice().reverse()" v-bind:key="post.id">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-2" > {{post.createdAt}} </h3>
                    <div>
                      <h2 class="mb-2"> {{post.title}} </h2>
                      <p>
                         {{post.content }}
                      </p>
                    </div>
                    <img
                      class="mt-4 align-center"
                      src="https://i.pinimg.com/736x/f5/fa/6b/f5fa6b83b802aa3d6d61c21ef7660f96.jpg"
                    />
                    <div>
                      <p class="mt-5 mb-0">author: {{post.user.username}}</p>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="d-flex">
                  <v-btn class="mr-3" color="teal accent-3" rounded >👍</v-btn>
                  <router-link class="nodeco mr-3" to="post">
                  <v-btn color="teal accent-3" rounded >modifié</v-btn>
                  </router-link>
                  <v-btn color="teal accent-3" rounded >supprimer</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
// import Cookies from 'js-cookie';


export default {
  data() {
    return {
      posts: [].reverse()
        
  
  };
  },
  created: function () {
        Vue.$http.get( '/posts') 
      .then( ( res ) => {
        this.posts = res.data
        
      },)
        .catch( error => {
          console.log( error );
        });
},
  
  methods: {
     updatePost: function (e) {

      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if ( this.title || this.content ) {
        const data = {
          id: this.user.id
        };

        if ( this.title ) {
          data[ "title" ] = this.title;
        }
        if ( this.content ) {
          data[ "content" ] = this.content;
        }

        Vue.$http
          .put( "/posts/:id", data )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validate() {
      this.$refs.form.validate();
    },

},
};
</script>

<style>
.v-application--wrap {
  min-height: 100vh;
}

.v-card__actions.d-flex {
    margin-bottom: 20px;
}

main.v-main.main.grey.lighten-2 {
  height: 95vh;
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

.col-sm-10.col {
  max-width: 50%;
}

.row {
  display: flex;
  justify-content: center;
}
.chat-container {
  box-sizing: border-box;
  overflow-y: scroll;
  height: 78vh;
  padding: 10px;
  background-color: #f2f2f2;
}

img {
  max-height: 400px;
}
</style>
