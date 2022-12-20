<template>
    <v-main class="Magazine-lists">
      <v-card color="blue">
        <v-list-item>
          <v-list-item-avatar>
            <img
              src=https://images.assetsdelivery.com/compings_v2/macro1/macro11905/macro1190507244.jpg alt="John"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline white--text">Magazine List</v-list-item-title>
            <v-list-item-subtitle class="white--text">You can add,remove,and edit your magazine list</v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true"> Add Magazine </v-btn>
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
          :items="Magazines"
          :search="search"
          item-key="nama_majalah"
          class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="ma-2" outlined small color="error" @click="editMajalah(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined small color="success" @click="deleteMajalah(item.id)">
                <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}} Magazine</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formTodo.nama_majalah" label="Magazine Name" required :rules="namaMajalahRules"></v-text-field>
          <v-text-field v-model="formTodo.jenis_majalah" label="Magazine Type" required :rules="typeRules"></v-text-field>
          <v-text-field v-model="formTodo.penerbit" label="Author" required :rules="penerbitRules"></v-text-field>
          <v-text-field v-model="formTodo.harga_majalah" prefix="Rp." label="Price" required :rules="hargaMajalahRules"></v-text-field>
          <v-text-field v-model="formTodo.jumlah_majalah" suffix="Magazine" label="Stock" required :rules="jumlahMajalahRules"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setMagazine"> Save </v-btn>
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
    name : "Magazine-lists",
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
        nama_majalah: "",
        namaMajalahRules: [(v) => !!v || "Magazine name must be fill and cannot empty !"],
        jenis_majalah: "",
        typeRules: [(v) => !!v || "Magazine type must be fill and cannot empty !"],
        penerbit: "",
        penerbitRules: [(v) => !!v || "Author must be fill and cannot empty !"],
        harga_majalah: "",
        hargaMajalahRules: [(v) => !!v || "Price must be fill with number and cannot empty !"],
        jumlah_majalah: "",
        jumlahMajalahRules: [(v) => !!v || "Stock must be fill with number and cannot empty !"],
        headers: [
          {
            text: "Magazine Name",
            align: "start",
            sortable: true,
            value: "nama_majalah",
          },
          { text: "Magazine Type", value: "jenis_majalah"},
          { text: "Author", value: "penerbit"},
          { text: "Stock", value: "jumlah_majalah" },
          { text: "Price", value: "harga_majalah" },
          { text: "Actions", value: "actions" },
        ],
        magazine: new FormData,
        Magazines:[],
        formTodo: {
          nama_majalah: null,
          jenis_majalah: null,
          penerbit:null,
          jumlah_majalah: null,
          harga_majalah: null,
        },
            deleteIndex:'',
            editIndex:''
      };
    },
    methods: {
    setMagazine(){
        if(this.inputan !== 'Add'){
          this.edit();
      }
      else{
        this.tambah();
      }
    },

    readData(){
      var url = this.$api + '/majalah';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Magazines = response.data.data;
      })
    },

    tambah(){
      this.magazine.append('nama_majalah',this.formTodo.nama_majalah);
      this.magazine.append('jenis_majalah',this.formTodo.jenis_majalah);
      this.magazine.append('penerbit',this.formTodo.penerbit);
      this.magazine.append('harga_majalah',this.formTodo.harga_majalah);
      this.magazine.append('jumlah_majalah',this.formTodo.jumlah_majalah);

      var url= this.$api + '/majalah'
      this.load = true;
      this.$http.post(url, this.magazine, {
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
        nama_majalah : this.formTodo.nama_majalah,
        jenis_majalah : this.formTodo.jenis_majalah,
        penerbit : this.formTodo.penerbit, 
        harga_majalah : this.formTodo.harga_majalah,
        jumlah_majalah : this.formTodo.jumlah_majalah
      };
      var url = this.$api + '/majalah/' + this.editIndex;
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
      var url = this.$api + '/majalah/' + this.deleteIndex;
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
          this.Magazines.splice(this.index, 1);
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

    editMajalah(item){
      this.inputan = 'Edit';
      this.editIndex = item.id;
      this.formTodo.nama_majalah = item.nama_majalah;
      this.formTodo.jenis_majalah = item.jenis_majalah;
      this.formTodo.penerbit = item.penerbit;
      this.formTodo.harga_majalah = item.harga_majalah;
      this.formTodo.jumlah_majalah = item.jumlah_majalah;
      this.dialog = true;
    },

    deleteMajalah(id) {
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
        nama_majalah : null,
        jenis_majalah : null,
        penerbit : null,
        harga_majalah : null,
        jumlah_majalah : null,
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
  