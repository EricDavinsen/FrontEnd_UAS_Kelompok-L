<template>
    <v-main class="Employee-lists">
      <v-card color="blue">
        <v-list-item>
          <v-list-item-avatar>
            <img
              src=https://png.pngtree.com/png-vector/20190316/ourmid/pngtree-employee-icon-design-template-vector-isolated-png-image_856368.jpg alt="John"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline white--text">Employee List</v-list-item-title>
            <v-list-item-subtitle class="white--text">You can add,remove,and edit your employee list</v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true"> Add Employee </v-btn>
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
          :items="Employees"
          :search="search"
          item-key="nama_pegawai"
          class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="ma-2" outlined small color="error" @click="editPegawai(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined small color="success" @click="deletePegawai(item.id)">
                <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}} Employee</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formTodo.nama_pegawai" label="Employee Name" required :rules="namaPegawaiRules"></v-text-field>
          <v-text-field v-model="formTodo.alamat" label="Address" required :rules="addressRules"></v-text-field>
          <v-text-field v-model="formTodo.umur" label="Age" required :rules="ageRules"></v-text-field>
          <v-text-field v-model="formTodo.jenis_kelamin" label="Gender" required :rules="genderRules"></v-text-field>
          <v-text-field v-model="formTodo.tugas" label="Job" required :rules="tugasRules"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setEmployee"> Save </v-btn>
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
    name : "Employee-lists",
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
        nama_pegawai: "",
        namaPegawaiRules: [(v) => !!v || "Employee name must be fill and cannot empty !"],
        alamat: "",
        addressRules: [(v) => !!v || "Address must be fill and cannot empty !"],
        umur: "",
        ageRules: [(v) => !!v || "Age must be fill and cannot empty !"],
        jenis_kelamin: "",
        genderRules: [(v) => !!v || "Gender must be fill and cannot empty !"],
        tugas: "",
        tugasRules: [(v) => !!v || "Job must be fill and cannot empty !"],
        headers: [
          {
            text: "Employee Name",
            align: "start",
            sortable: true,
            value: "nama_pegawai",
          },
          { text: "Address", value: "alamat"},
          { text: "Age", value: "umur"},
          { text: "Gender", value: "jenis_kelamin" },
          { text: "Job", value: "tugas" },
          { text: "Actions", value: "actions" },
        ],
        employee: new FormData,
        Employees:[],
        formTodo: {
          nama_pegawai: null,
          alamat: null,
          umur: null,
          jenis_kelamin: null,
          tugas: null,   
        },
            deleteIndex:'',
            editIndex:''
      };
    },
    methods: {
    setEmployee(){
        if(this.inputan !== 'Add'){
          this.edit();
      }
      else{
        this.tambah();
      }
    },

    readData(){
      var url = this.$api + '/pegawai';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Employees = response.data.data;
      })
    },

    tambah(){
      this.employee.append('nama_pegawai',this.formTodo.nama_pegawai);
      this.employee.append('alamat',this.formTodo.alamat);
      this.employee.append('umur',this.formTodo.umur);
      this.employee.append('jenis_kelamin',this.formTodo.jenis_kelamin);
      this.employee.append('tugas',this.formTodo.tugas);

      var url= this.$api + '/pegawai'
      this.load = true;
      this.$http.post(url, this.employee, {
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
        nama_pegawai : this.formTodo.nama_pegawai,
        alamat : this.formTodo.alamat,
        umur : this.formTodo.umur, 
        jenis_kelamin : this.formTodo.jenis_kelamin,
        tugas : this.formTodo.tugas
      };
      var url = this.$api + '/pegawai/' + this.editIndex;
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
      var url = this.$api + '/pegawai/' + this.deleteIndex;
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
          this.Employees.splice(this.index, 1);
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

    editPegawai(item){
      this.inputan = 'Edit';
      this.editIndex = item.id;
      this.formTodo.nama_pegawai = item.nama_pegawai;
      this.formTodo.alamat = item.alamat;
      this.formTodo.umur = item.umur;
      this.formTodo.jenis_kelamin = item.jenis_kelamin;
      this.formTodo.tugas = item.tugas;
      this.dialog = true;
    },

    deletePegawai(id) {
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
        nama_pegawai : null,
        alamat : null,
        umur : null,
        jenis_kelamin : null,
        tugas : null,
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
  