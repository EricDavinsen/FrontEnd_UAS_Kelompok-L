<template>
  <div class="dashboard">
    <v-navigation-drawer class="fullheight" width="256" v-model="drawer" absolute temporary color="light-blue" >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title"> My Bookstore </v-list-item-title>
                <v-list-item-subtitle>Welcome to our bookstore!</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
            v-for="item in items"
            :key="item.title"
            Link
            color="light-blue darken-4"
            tag="router-link"
            :to="item.to"
            >
                <v-list-item-contehnt>
                    <v-icon>{{item.icon}}</v-icon>
                    <h>{{ item.title }}</h>
                </v-list-item-contehnt>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="50px" color="blue">
      <v-app-bar-nav-icon color = "yellow" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h3 class="yellow--text">My Bookstore Website</h3>
      <VSpacer/>
      <v-toolbar-items>
        <v-btn text router color = "green" @click = "profil"><v-icon>mdi-account</v-icon></v-btn>
        <v-btn text router color = "red" @click = "logout"><v-icon>mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <div class="fullheight">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DashboardIndex",
        data() {
            return {
                drawer: false,
                group: null,
                items: [
                    { title: " Dashboard", to:"/dashboard", icon:"mdi-view-dashboard"},
                    { title: " Book", to:"/book", icon: "mdi-notebook" }, 
                    { title: " Magazine", to:"/magazine", icon: "mdi-book-open-variant"},
                ],
            };
    },
    methods: {
      profil(){
        this.$router.push({
            name: "ProfilPage",
        })
        },
    logout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.reload();
    },
  },
  computed: {
    loggedIn(){
      return localStorage.getItem("token") != null;
    },
    loggedinAdmin(){
      return localStorage.getItem("id") == "4";
    }
  }
};
</script>

<style scoped>
.fullheight{
    min-height: 100vh !important;
}
</style>