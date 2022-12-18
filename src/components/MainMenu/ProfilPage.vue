<template>
    <v-card
      class="mx-auto"
    >
      <v-img
        src="https://wallpapers.com/images/hd/epic-scenery-with-lava-akxg1bi24b0hlxcp.jpg"
        height="700px"
      ></v-img>
  
      <v-card-title>
        Profile Page
      </v-card-title>
  
      <v-card-subtitle>
        Welcome to profil menu!
      <v-spacer></v-spacer>
       <v-icon large>mdi-account</v-icon>
       Username : {{ user.username }} 
       <v-spacer></v-spacer>
       <v-icon large>mdi-email</v-icon>
        Email : {{ user.email }}
        <v-spacer></v-spacer>
       <v-icon large>mdi-calendar</v-icon> 
       Tanggal Lahir : {{ user.tgllahir }}
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn
          color="orange lighten-2" text
          @click="update"
        >
          Update Profile
        </v-btn>
      </v-card-actions>
  

    </v-card>
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
        dialogConfirm: false,
        showPreview: false,
        formUser: new FormData(),
        user : [],
        editIndex: localStorage.getItem("id"),
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
      update(){
        this.$router.push({
            name: "EditProfilPage",
        })
        },
    },
    mounted() {
      this.readData();
    },
  };
  </script> 