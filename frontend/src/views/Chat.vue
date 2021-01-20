<template>
  <v-app id="inspire">
    <v-app-bar app>
      
        <v-avatar class="mr-10" color="grey darken-1" size="40">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-spacer></v-spacer>
        <router-link class="nodeco" to="/">
          <v-btn rounded color="teal accent-3" class="mr-3" >home</v-btn>
        </router-link>
        <router-link class="nodeco" to="Profile">
          <v-btn rounded color="teal accent-3" class="mr-3" >profile</v-btn>
        </router-link>
        <router-link class="nodeco" to="post">
          <v-btn rounded color="teal accent-3" class="mr-3">créer message</v-btn>
        </router-link>
          <v-btn rounded color="teal accent-3" @click.prevent="deconnexion()">déconnexion</v-btn>
    </v-app-bar>

    <v-main class="main grey lighten-2">
      <v-container fluid style="padding: 0">
        <v-row class="row" no-gutters>
          <v-col sm="10">
            <div class="chat-container elevation-12">
              <v-card color="grey lighten-3" v-for="post in posts.slice().reverse()" v-bind:key="post.id">
                <v-card-title primary-title>
                  <div>
                    <p class="headline mb-2"  >  {{format_date(post.createdAt)}}  </p>
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
                  <v-btn class="mr-3" color="teal accent-3" rounded @click.prevent="() => like()" >👍 {{}}</v-btn>
                  <router-link class="nodeco mr-3"  :to="{name: 'updatePost', params: {id: post.id}}">
                  <v-btn 
                  color="teal accent-3" 
                  rounded
                  v-if="isMyPost( post.userId )" 
                  >modifié</v-btn>
                  </router-link>
                  <v-btn 
                  color="red" 
                    v-if="isMyPost( post.userId ) || isAdmin" 
                  rounded @click.prevent="() => deletePost(post.id)" >Supprimer</v-btn>
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
import moment from 'moment';

export default {
  data() {
    return {
      posts: [],
      user: ""
    };
  },

  created: function () {
    Vue.$http.get( '/posts') 
      .then( ( res ) => { 
        this.posts = res.data;
        console.log(this.posts)
        } )
      .catch( error => console.log( error ) );
  },

  mounted: function () {
    Vue.$http.get("/users/me")
      .then( res => { 
        this.user = res.data;
        console.log(this.user)
        // window.location.reload();
        
        } )
      .catch( error => console.log( error ) );
  },
  
  methods: {
    deletePost(id) {
      const postId = this.posts.findIndex((post) => post.id === id );

      if (postId !== -1) {
        this.posts.splice(postId);
        Vue.$http.delete("/posts/" + id);
        // window.location.reload();
        }
    },

    isMyPost( id ) { return this.user.id === id; },

    format_date(value){
         if (value) {
           return moment(String(value)).format('DD/MM/YYYY')
          }
      },

      deconnexion: function() {
         this.$session.destroy();
        window.location.reload();
       },

      likeDislike(id) {
        const postId = this.posts.findIndex((post) => post.id === id );
        const userId = this.user.id;
        console.log(userId)
        console.log(postId)
        if(postId !== -1 && userId === id) {
          Vue.$http.post( `/posts/${postId}/like`) 
          .then( ( res ) => { 
            console.log(res)
            console.log(666)
          //   console.log(this.posts)
        
        } )

          .catch( error => console.log( error ) );
        }
      }, 

      like() {
        Vue.$http.get( '/like')
        .then( res => { 
        // this.user = res.data;
        console.log(res)
        // window.location.reload();
        
        } )
      .catch( error => console.log( error ) );
      }  
  },
  computed: {
    isAdmin() {
      return this.user.rights
        && this.user.rights.length > 0
        && this.user.rights.includes( 'admin' );
    }
  }
};
</script>

<style scoped>
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

@media screen {
  /* .row{
    justify-content: space-between;
  } */

  /* .chat-container{
    width: 95vw;
  } */

}

</style>
