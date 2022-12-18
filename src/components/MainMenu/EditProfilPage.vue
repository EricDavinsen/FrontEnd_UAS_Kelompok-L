<template>
    <v-main class="list-profil">
        <h1>Edit Profile</h1>
      <v-card>
        <v-card-text>
          <v-text-field label="Username" v-model="user.username" required>{{user.username}}</v-text-field>
          <v-text-field label="Email" v-model="user.email" required>{{user.email}}</v-text-field>
          <v-text-field label="Password" v-model="user.password" required>{{user.password}}</v-text-field>
          <v-text-field type="date" label="Tanggal Lahir" v-model="user.tgllahir" required></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color = "green" @click="update"> Update Profile </v-btn>
          <v-btn class="mr-2" color = "red" @click="deleteacc(user.id)">Delete Account</v-btn>
          <v-btn color = "yellow" @click="back">Back</v-btn>
        </v-card-text>
      </v-card>

      <v-dialog v-model="deleting" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Are you sure to delete?</span>
            </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="confirm"> Yes</v-btn>
                        <v-btn color="red darken-1" text @click="deleting = false"> No</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
  </template>
  <script>
  export default {
    name: "list-profil",
    data() {
      return {
        load: false,
        snackbar: false,
        error_message: "",
        color: "",
        search: null,
        dialog: false,
        deleting: false,
        showPreview: false,
        formUser: new FormData(),
        user : [],
        editIndex: localStorage.getItem("id"),
        deleteIndex: localStorage.getItem("id"),
      };
    },
    methods: {
      readData() {
        
        this.$http.get(this.$api + '/user/'+localStorage.getItem('id'),{
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(response => {
          this.user = response.data.data;
        }).catch(error => {
          console.log(error)
        })  
      },
  
      update() {
        let newData = {
          username : this.user.username,
          email : this.user.email,
          password : this.user.password,
          tgllahir : this.user.tgllahir
        };
        var url = this.$api + '/user/' + this.editIndex;
        this.load = true;
        this.$http.put(url, newData, {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
          this.error_message = response.data.message;
          this.color = 'green';
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData();
          this.inputan = 'Add';
        })
        .catch(error => {
          this.error_message = error.response.data.message;
          this.color = 'red';
          this.snackbar = true;
          this.load = false;
        });  
      },

    deleteacc(id){
      this.deleteIndex = id;
      this.deleting = true;
    },

    confirm() {
      var url = this.$api + '/user/' + this.deleteIndex;
      this.$http.delete(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.$router.push({
            name: "HomePage",
         });
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    close() {
      this.dialog = false;
      this.inputan = "Add";
      this.deleting = false;
      this.readData();
    },

    back(){
      this.$router.push({
            name: "ProfilPage",
        })
      }
  },        
    mounted() {
      this.readData();
    },
  };
  </script> 