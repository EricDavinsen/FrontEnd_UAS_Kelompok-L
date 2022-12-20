<template>
  <v-container fluid class="bg" >
        <h2 class="yellow mt-10 mb-3">New books release on this year!</h2>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card class="mx-8 mb-5" max-width="250" max-height="400">
              <v-img
                :src="card.src"
                class="white--text align-end "
                height="300px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
  
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </template>
  <script>
    export default {
      data: () => ({
        cards: [
          { title: 'Doraemon', src: 'https://www.gramedia.com/blog/content/images/2019/11/batch_9789792789133_Doraemon-01-Terbit-Ulang.jpg'},
          { title: 'Chainsaw Man', src: 'https://static.wikia.nocookie.net/chainsaw-man/images/0/0f/Volume_01.png'},
          { title: 'Malin Kundang', src: 'https://s4.bukalapak.com/img/487035818/large/Legenda_Malin_Kundang_000_Si_Anak_Durhaka_dan_Dongeng_Terken.jpg.webp'},
          { title: 'Dear Hyun Nam', src: 'https://www.bukukita.com/babacms/displaybuku/119375_b.jpg'},
          { title: 'Wujud Tanpa Suara', src: 'https://deepublishstore.com/wp-content/uploads/2018/01/Wujud-Tanpa-Suara-Nurul-depan1.jpg'},
          { title: 'Ruang Sunyi', src: 'https://marketplace.canva.com/EAFFDGFkcdM/1/0/1003w/canva-hijau-biru-sederhana-ruang-sunyi-sampul-buku-novel-K3WxwPzlPyk.jpg'},
          { title: 'Hyderabad', src: 'https://deepublishstore.com/wp-content/uploads/2020/02/Hyderabad_Irvannd-rev-3.0-Convert-depan.jpg'},
          { title: 'Ayah', src: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602300563/smysuqq6ioww9pjnzzgz.jpg'},
          { title: 'Dragon Ball', src: 'https://ds393qgzrxwzn.cloudfront.net/resize/m500x500/cat1/img/images/0/YlEHsLxjju.jpg'},
          { title: 'Detektif Conan', src: 'https://1.bp.blogspot.com/-3zCN9dkvfOU/X_P1x2VeoNI/AAAAAAAANrM/_lEN1-VMQvgMYVLQTI-CNf0yWEAqI8bmQCLcBGAsYHQ/s448/comic%2Bdetektif%2Bconan%2Bvolume%2B52%2B-%2Baoyama%2Bgosho.png'},        
        ],
      }),
    }
  </script>

<style>
.bg{
  background-image: url('https://media.cntraveler.com/photos/5edf98c162bb344a7a7bab53/16:9/w_2560%2Cc_limit/SistersUptownBooks-NYC-WTJ2W3.jpg');
  height: 100vh!important;
  background-size: cover;
}
</style>