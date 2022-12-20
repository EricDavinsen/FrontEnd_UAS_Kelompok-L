<template>
  <main>
    <v-container fluid fill-height class="bg">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-toolbar class="blue darken-3">
            <v-toolbar-title >
              <h1>Register Form</h1>
            </v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form"> 
                  <v-text-field
                    label="Username"
                    v-model="username"
                    :rules="usernameRules"
                    required
                  >
                  </v-text-field> 

                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                  >
                  </v-text-field>

                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    :rules="passwordRules"
                    required
                  >
                  </v-text-field>

                  <v-text-field
                    label="Tanggal Lahir"
                    v-model="tgllahir"
                    type="date"
                    :rules="tgllahirRules"
                    required
                  >
                  </v-text-field>
                  <v-layout>
                    <v-btn
                      class="mr-3 mt-3"
                      @click="submit"
                      :class="{
                        'green white--text': valid, disabled: !valid 
                      }"
                      >Register
                    </v-btn>

                    <v-btn @click="clear" class="yellow green--text mr-3 mt-3"
                      >Clear
                    </v-btn>
                  </v-layout>

                  <v-layout>
                    <h3 class="mt-5">Back to home menu?</h3>
                  </v-layout>
                  
                  <v-layout>
                    <v-btn @click="home" class="blue darken-3 white--text mt-3"
                      >Home
                    </v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "RegisterMenu",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      valid: false,
      username: '',
      usernameRules: [(v) => !!v || "Username harus diisi dan tidak boleh kosong !"],
      password: '',
      passwordRules: [(v) => !!v || "Password harus diisi dan tidak boleh kosong !"],
      email: "",
      emailRules: [(v) => !!v || "E-mail harus diisi dan tidak boleh kosong !"],
      tgllahir: "",
      tgllahirRules: [(v) => !!v || "Tanggal Lahir harus diisi dan tidak boleh kosong !"],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$http
          .post(this.$api + '/register', {
            username:this.username,
            email: this.email,
            password: this.password,
            tgllahir: this.tgllahir,
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: "LoginMenu",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          })
      }
    },
    home(){
      this.$router.push({
          name: "HomePage",
      });
    },
    clear() {
      this.$refs.form.reset(); 
    },
  },
};
</script> 

<style>
.bg{
  background-image: url('https://img.freepik.com/premium-vector/bookstore-shop-exterior_169241-3291.jpg?w=2000');
  height: 100vh!important;
  background-size: cover;
}
</style>