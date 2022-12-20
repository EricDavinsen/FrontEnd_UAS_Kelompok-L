<template>
    <v-main class="Book-lists">
      <v-card color="blue">
        <v-list-item>
          <v-list-item-avatar>
            <img
              src=https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg alt="John"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline white--text">Book List</v-list-item-title>
            <v-list-item-subtitle class="white--text">You can add,remove,and edit your book list</v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true"> Add Book </v-btn>
        </v-list-item>

        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            hide-details
            style="margin-top: 30px"
          ></v-text-field>
        </v-card-title>
      </v-card>

      <v-card>
        <v-data-table
          :headers="headers"
          :items="Books"
          :search="search"
          item-key="judul_buku"
          class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="ma-2" outlined small color="error" @click="editBuku(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined small color="success" @click="deleteBuku(item.id)">
                <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}} Book</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formTodo.judul_buku" label="Book Name" required :rules="judulbukuRules"></v-text-field>
          <v-text-field v-model="formTodo.penerbit" label="Author" required :rules="penerbitRules"></v-text-field>
          <v-text-field v-model="formTodo.harga_buku" prefix="Rp." label="Price" required :rules="hargabukuRules"></v-text-field>
          <v-text-field v-model="formTodo.jumlah_buku" suffix="Book" label="Stock" required :rules="jumlahbukuRules"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setBook"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    name : "Book-lists",
    data() {
      return {
        inputan: 'Add',
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        search: null,
        dialog: false,
        deleting: false,
        judul_buku: "",
        judulbukuRules: [(v) => !!v || "Book name must be fill and cannot empty !"],
        penerbit: "",
        penerbitRules: [(v) => !!v || "Author must be fill and cannot empty !"],
        harga_buku: "",
        hargabukuRules: [(v) => !!v || "Price must be fill with number and cannot empty !"],
        jumlah_buku: "",
        jumlahbukuRules: [(v) => !!v || "Stock must be fill with number and cannot empty !"],
        headers: [
          {
            text: "Book Name",
            align: "start",
            sortable: true,
            value: "judul_buku",
          },
          { text: "Author", value: "penerbit"},
          { text: "Stock", value: "jumlah_buku" },
          { text: "Price", value: "harga_buku" },
          { text: "Actions", value: "actions" },
        ],
        book: new FormData,
        Books:[],
        formTodo: {
          judul_buku: null,
          penerbit:null,
          jumlah_buku: null,
          harga_buku: null,
        },
            deleteIndex:'',
            editIndex:''
      };
    },
    methods: {
    setBook(){
        if(this.inputan !== 'Add'){
          this.edit();
      }
      else{
        this.tambah();
      }
    },

    readData(){
      var url = this.$api + '/buku';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Books = response.data.data;
      })
    },

    tambah(){
      this.book.append('judul_buku',this.formTodo.judul_buku);
      this.book.append('penerbit',this.formTodo.penerbit);
      this.book.append('harga_buku',this.formTodo.harga_buku);
      this.book.append('jumlah_buku',this.formTodo.jumlah_buku);

      var url= this.$api + '/buku'
      this.load = true;
      this.$http.post(url, this.book, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = true;
        this.close();
        this.readData();
        this.resetForm();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },

    edit(){
      let newData = {
        judul_buku : this.formTodo.judul_buku,
        penerbit : this.formTodo.penerbit, 
        harga_buku : this.formTodo.harga_buku,
        jumlah_buku : this.formTodo.jumlah_buku
      };
      var url = this.$api + '/buku/' + this.editIndex;
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
        this.resetForm();
        this.inputan = 'Add';
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });
    },

    confirm() {
      var url = this.$api + '/buku/' + this.deleteIndex;
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
          this.Books.splice(this.index, 1);
          this.close();
          this.readData(); 
          this.resetForm();        
          this.inputan = "Add";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    editBuku(item){
      this.inputan = 'Edit';
      this.editIndex = item.id;
      this.formTodo.judul_buku = item.judul_buku;
      this.formTodo.penerbit = item.penerbit;
      this.formTodo.harga_buku = item.harga_buku;
      this.formTodo.jumlah_buku = item.jumlah_buku;
      this.dialog = true;
    },

    deleteBuku(id) {
      this.deleteIndex = id;
      this.deleting = true;
    },

    close() {
      this.dialog = false;
      this.inputan = "Add";
      this.deleting = false;
      this.readData();
    },

    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.deleting = false;
      this.inputan = "Add";
    },

    resetForm() {
      this.formTodo = {
        judul_buku : null,
        penerbit : null,
        harga_buku : null,
        jumlah_buku : null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputan;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
  
  <style>
  .text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 40px;
    font-style: italic;
  }
  </style>
  