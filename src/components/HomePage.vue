<template>
    <v-carousel height="100vh" dark cycle show-arrows-on-hover draggable="true" hide-delimiter-background>
      <v-carousel-item v-for="(carousel, indexs) in page" :key="indexs" :src="carousel.src" class="gradient-fill">
        <v-container fill-height>
          <div style="max-width: 1000px">
            <div class="text-md-h2 mb-2 text-sm-h3 text-h6 font-weight-bold yellow--text">
              {{ carousel.heading }}
            </div>
            
            <h5 class=" font-weight-bold text-h2 white--text">
                {{ carousel.subHeading }}
            </h5>
            
            <v-btn @click="login" class="my-3 red white--text">Login</v-btn>
            
            <span class="mr-4"></span>

            <v-btn @click="register" class="my-3 green white--text">Register</v-btn>

            <v-spacer></v-spacer>
     
          </div>
        </v-container>
      </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      page: [
        {
          src: 'https://i.ytimg.com/vi/oFm6rbA5BD8/maxresdefault.jpg',
          heading: 'My Bookstore',
          subHeading:
            'Welcome to our bookstore website!',
        },

        {
          src: 'https://wallpaperaccess.com/full/124383.jpg',
          heading: 'My Bookstore',
          subHeading:
            'Welcome to our bookstore website!',
        },

        {
          src: 'https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg',
          heading: 'My Bookstore',
          subHeading:
            'Welcome to our bookstore website!',
        },
      ],
    }
  },
  methods: {
    register(){
      this.$router.push({
          name: "RegisterMenu",
      });
    },

    login(){
      this.$router.push({
          name: "LoginMenu",
      });
    },
  }
}

</script>

<style>
.carousel-item img {
        height:100vh!important ;
    }

</style>