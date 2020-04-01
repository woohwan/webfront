<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="6"
          >
            <v-card class="elevation-12 lg-">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title >로그인</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Userid"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="userid"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    @keyup.enter="login"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                class="blue darken-1 white--text subtitle-1" 
                large 
                block
                @click="login({userid, password})">
                로그인</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        userid: null,
        password: null
      }
    },
    methods: {
      login(loginObj) {
        this.$store.dispatch('authentication/login', loginObj)
        console.log(loginObj);
      }
    }
  }
</script>