import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/Slide1.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      nohp: "",
      alamat: "",
      image: null,
      last_password:"",
      new_password:"",
      password:"",
      action: "",
      find: "",
      message: "",
    }
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
   }
    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        username: item.username,
        first_name: item.first_name,
        last_name: item.last_name,
        gander: item.gender,
        date_birth: item.date_birth,
        nohp: item.nohp,
        alamat: item.alamat,
        image: item.image,
      });
    }
    Password = (echo) => {
      // membuka modal
      $("#modal_users").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: echo.id,
        password: echo.password
      });
    }
    get_users = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id'))
      // console.log(items)
      let url = "http://localhost/lapangan/public/users/"+id;
      axios.get(url)
      .then(response => {
          // $("#loading").toast("hide");
          this.setState({
            users: response.data.users,
          });
          // $("#message").toast("show");
      })
      .catch(error => {
          console.log(error);
      });
      // this.setState({
      //   user: items,
      //   id_user: items.id_user
      // });
    }
    componentDidMount = () => {
      this.get_users();
    }

    SavePwd = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");

      if (this.state.last_password === this.state.password)
      {
      let url = "http://localhost/lapangan/public/users/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("password", this.state.password);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        window.location="/Login"
      })
      .catch(error => {
        console.log(error);
      });
    }else{
      this.setState({message: "Password Lama Tidak Cocok"});
    }
}

    Save = (event) => {
      console.log(this.state.id)
      event.preventDefault();
      $("#modal_user").modal("hide");
      let url = "http://localhost/lapangan/public/users/save_profil";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("first_name", this.state.first_name);
      form.append("last_name", this.state.last_name);
      form.append("gender", this.state.gender);
      form.append("date_birth", this.state.date_birth);
      form.append("alamat", this.state.alamat);
      form.append("nohp", this.state.nohp);
      form.append("image", this.state.image, this.state.image.name);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({
          message: response.data.message});
        $("#message").toast("show");
        this.get_users();
      })
      .catch(error => {
        console.log(error);
      });
    }
  render(){
   const { users } =  this.state;
   console.log(users)

  return (
        <div className="container">
        <div className="card-body">

        <div className="card-header bg-primary">
            <div className="row">
                <div className="col-sm-8">
                    <h4 className="text-white">RentField</h4>
                </div>
            </div>

        </div>
            <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
              <div className="#" style={{ maxwidth: "200px" }}>
                <div className="row no-gutters">
  {users.map((item,index,) => {
    return (
            <div className="col-md-4">
              <img className="rounded float-left card-header" src={'http://localhost/lapangan/public/images/' + item.image}
              alt={item.image} style={{ height: "300px", width: "260px" }} required />
            </div>
          );
        })}
                <div style={{ paddingTop: "0%", paddingLeft: "0%" }}>
                <div className="card-header" cols="">
                  <h4 className="card-title text-center" style={{ fontWeight: "700" }}>PROFILE</h4>
                  <table className="table table-borderless">
                  {users.map((item,index,echo) => {
                      return (
                        <ul class="list-group list-group-flush " style={{width: "600px" }} key={index}>
                        Username :
                        <li cols="100" class="list-group-item"> {item.username}</li>

                        Email :
                        <li class="list-group-item "> {item.email}</li>

                        Nama Awal :
                        <li class="list-group-item "> {item.first_name}</li>
                        Nama Akhir :
                        <li class="list-group-item"> {item.last_name}</li>

                        Jenis Kelamin :
                        <li class="list-group-item"> {item.gender}</li>

                        Tanggal Lahir :
                        <li class="list-group-item"> {item.date_birth}</li>

                        No Hp :
                        <li class="list-group-item"> +62{item.nohp}</li>

                        Alamat :
                        <li class="list-group-item">   {item.alamat}</li>


                        <button  className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                          <span className="fa fa-edit"></span>Edit
                        </button>
                        
                      </ul>
                    );
                  })}
                      </table>
                      </div>
                      <Modal id="modal_users" title="Form User" bg_header="success"
                           text_header="white">
                           <form onSubmit={this.SavePwd}>
                       Password Awal
                       <input type="text" className="form-control" name="new_password"
                       value={this.state.new_password} onChange={this.bind} required />
                       <button type="submit" className="btn btn-info pull-right m-2">
                       <span className="fa fa-check"></span> Simpan
                       </button>
                       </form>
                       </Modal>

                      <Modal id="modal_user" title="Form User" bg_header="success"
                           text_header="white">
                           <form onSubmit={this.Save}>
                       Nama Awal
                       <input type="text" className="form-control" name="first_name"
                       value={this.state.first_name} onChange={this.bind} required />
                       Nama Akhir
                       <input type="text" className="form-control" name="last_name"
                       value={this.state.last_name} onChange={this.bind} required />
                       Jenis Kelamin
                       <input type="set" className="form-control" name="gender"
                       value={this.state.gender} onChange={this.bind} required />
                       Tanggal Lahir
                       <input type="date" className="form-control" name="date_birth"
                       value={this.state.date_birth} onChange={this.bind} required />
                       No HP
                       <input type="text" className="form-control" name="nohp"
                       value={this.state.nohp} onChange={this.bind} required />
                       Alamat
                       <input type="text" className="form-control" name="alamat"
                       value={this.state.alamat} onChange={this.bind} required />
                       Gambar
                        <input type="file" className="file-control" name="image"
                        onChange={this.bindImage} required />
                       <button type="submit" className="btn btn-info pull-right m-2">
                       <span className="fa fa-check"></span> Simpan
                       </button>
                       </form>
                       </Modal>



</div>
              </div>
            </div>
          </div>
          </div>
          </div>




      );
    }



}
export default Profil;
