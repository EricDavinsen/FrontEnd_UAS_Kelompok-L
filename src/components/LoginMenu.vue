<template>
    <main>
      <v-container fluid fill-height class="bg">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm6 elevation-6>
            <v-toolbar class="red darken-3">
              <v-toolbar-title >
                <h1>Login Form</h1>
              </v-toolbar-title>
            </v-toolbar>
  
            <v-card>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      required
                    >
                    </v-text-field>
                    <v-layout>
                    <v-btn
                      class="mr-3 mt-3"
                      @click="submit"
                      :class="{
                        'blue white--text': valid, disabled: !valid 
                      }"
                      >Login
                    </v-btn>

                    <v-btn @click="clear" class="yellow green--text mr-3 mt-3"
                      >Clear
                    </v-btn>

                    <v-btn @click="regis" class="green white--text mt-3"
                      >Register
                    </v-btn>

                  </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
              {{ error_message }}
            </v-snackbar>
            <v-snackbar v-model="success" color="green" timeout="2000" bottom>
              Berhasil Verifikasi Email
            </v-snackbar>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </template>
  
  
   <script>
  export default {
    name: "LoginMenu",
    components: {
    },
    data() {
      return {
        load: false,
        snackbar: false,
        error_message: "",
        color: "",
        valid: false,
        email: "",
        emailRules: [(v) => !!v || "E-mail harus diisi dan tidak boleh kosong !"],
        password: "",
        passwordRules: [(v) => !!v || "Password harus diisi dan tidak boleh kosong !"],
      };
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.load = true;
          this.$http
            .post(this.$api + "/login", {
              email: this.email,
              password: this.password,
            })
            .then((response) => {
              localStorage.setItem("id", response.data.user.id);
              localStorage.setItem("token", response.data.access_token);
              this.error_message = response.data.message;
              this.color = "green";
              this.snackbar = true;
              this.load = false;
              this.clear();
              this.$router.push({
                name: "DashboardPage",
              });
            })
            .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              this.snackbar = true;
              localStorage.removeItem("token");
              this.load = false;
            });
        }
      },
      Verif() {
        if (this.$route.query.verified == "success") {
          this.success = true;
          this.$router.push("/login");
        }
      },
        clear() {
            this.$refs.form.reset(); 
        },
        
        mounted() {
        this.Verif();
        },
        regis(){
        this.$router.push({
            name: "RegisterMenu",
        })
        },
    }
};
  </script> 

<style>
.bg{
  background-image: url('https://media.cntraveler.com/photos/5edf98c162bb344a7a7bab53/16:9/w_2560%2Cc_limit/SistersUptownBooks-NYC-WTJ2W3.jpg');
  height: 100vh!important;
}
</style>