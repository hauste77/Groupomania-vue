<template>
  <v-app id="inspire">
    <v-app-bar app color="grey lighten-2" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn rounded color="teal accent-3" dark> hello</v-btn>

        <v-spacer></v-spacer>

        <v-icon class="mr-3">fas fa-search</v-icon>
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <v-row>
          <v-col>
            <div className="chat__body">
              <p className="chat__message chat__reciever">
                <span className="chat__name">xavier</span>
                hello world !!
              </p>

              <div className="chat__footer">
                <!-- <IconButton>
                      <InsertEmoticon /> 
                  </IconButton> -->
                <v-form>
                  <input placeholder="Ecrire votre message ici" type="text" />
                  <v-btn rounded color="teal accent-3" dark>Envoyer</v-btn>
                </v-form>
              </div>
            </div>
            <!-- <v-sheet class="chat__body" min-height="70vh" rounded="lg">
                <div class="chat__footer">
                  <v-responsive max-width="260">
                  <v-text-field
                    dense
                    flat
                    hide-details
                    rounded
                    solo-inverted
                  ></v-text-field>
                  <v-btn rounded color="teal accent-3" dark>
                    <v-icon>mdi-image-plus</v-icon>
                  </v-btn>
                </v-responsive>
                </div>
                
              </v-sheet> -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.chat__body {
  display: flex;
  flex: 1;
  padding: 30px;
  height: 70vh;
}

.chat__name {
  position: absolute;
  top: -20px;
  font-weight: 800;
  font-size: small;
}

.chat__reciever {
  margin-left: auto;
  background-color: #dcf8c6;
}

.chat_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
}

.chat__footer > form > input {
  flex: 1;
  padding: 10px;
  border-radius: 30px;
  border: none;
  outline: none;
}
</style>