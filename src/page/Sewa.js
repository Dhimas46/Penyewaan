import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/Slide1.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Sewa extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      username: "",
      email: "",
      role: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      nohp: "",
      alamat: "",
      image: null,

      lapangan: [],
      id: "",
      nama:"",
      harga:"",
      image: null,

      sewa: [],
      id: "",
      id_lapangan: "",
      id_user: "",
      tgl_book: "",
      wkt_mulai: "",
      wkt_selesai: "",
      durasi: "",
      biaya: "",
      status: "",
      tgl: "",
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

    Add = () => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",

        });
    }
    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        id_lapangan: item.id_lapangan,
        id_user: item.id_user,
        tgl_book: item.tgl_book,
        wkt_mulai: item.wkt_mulai,
        wkt_selesai: item.wkt_selesai,
      });
    }


    get_sewa = () => {
      let id = JSON.parse(localStorage.getItem('id'))
      let url = "http://localhost/lapangan/public/sewa";
      axios.get(url)
      .then(response => {
          this.setState({
            sewa: response.data.sewa,
          });
      })
      .catch(error => {
          console.log(error);
      });
    }

get_lapangan = () => {
    let url = "http://localhost/lapangan/public/lapangan";
    axios.get(url)
    .then(response => {
      this.setState({lapangan: response.data.lapangan});
      $("#loading").toast("hide");
    })
    .catch(error => {
      console.log(error);
    });
  }
  get_users = () => {
      let url = "http://localhost/lapangan/public/users";
      axios.get(url)
      .then(response => {
        this.setState({users: response.data.users});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    componentDidMount = () => {
      this.get_users();
      this.get_lapangan();
      this.get_sewa();
}

search = (event) => {
    if (event.keyCode === 13 ){
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa/find";
        let form = new FormData();
        form.append("find",this.state.find);
        form.append("tgl",this.state.tgl);
        axios.post(url,form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({sewa: response.data.sewa});
        })
    .catch(error => {
      console.log(error);
    });
  }
}

Used = (id) => {
      if (window.confirm("Apakah anda yakin ingin Accept data ini?")) {
          $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/sewa/used/"+id;
          axios.post(url)
          .then(response => {
              $("#loading").toast("hide");
              this.setState({message: response.data.message});
              $("#message").toast("show");
              this.get_sewa();
          })
          .catch(error => {
              console.log(error);
          });
      }
  }
  Done = (id) => {
      if (window.confirm("Apakah anda yakin ingin Decline data ini?")) {
          $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/sewa/done/"+id;
          axios.post(url)
          .then(response => {
              $("#loading").toast("hide");
              this.setState({message: response.data.message});
              $("#message").toast("show");
              this.get_sewa();
          })
          .catch(error => {
              console.log(error);
          });
      }
  }

    Save = (event) => {
      console.log(this.state.id_user)
      event.preventDefault();
      $("#modal_user").modal("hide");
      let url = "http://localhost/lapangan/public/sewa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("id_user", this.state.id_user);
      form.append("id_lapangan", this.state.id_lapangan);
      form.append("tgl_book", this.state.tgl_book);
      form.append("tgl", this.state.tgl_book);
      form.append("wkt_mulai", this.state.wkt_mulai);
      form.append("wkt_selesai", this.state.wkt_selesai);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({
          message: response.data.message});
        $("#message").toast("show");
        this.get_sewa();
      })
      .catch(error => {
        console.log(error);
      });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_sewa();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render(){
      const { sewa, users, lapangan } =  this.state;
      return(
        <div className="container">
            <div className="card mt-2">
                {/* header card */}
                <div className="card-header bg-primary">
                    <div className="row">
                        <div className="col-sm-8">
                            <h4 className="text-white">Data Sewa</h4>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="dd/mm/yyyy" />
                        </div>
                    </div>

                </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                  <th>#</th>
                  <th>Penyewa</th>
                    <th>Nama Lapangan</th>
                    <th>Tanggal Booking</th>
                    <th>Mulai</th>
                    <th>Selesai</th>
                    <th>Durasi</th>
                    <th>Biaya</th>
                    <th>Status</th>
                    <th>Opsi</th>
                    <th>Masa</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sewa.map((item,index) => {
                    return(
                      <tr key={item.id}>
                      <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.nama_lapangan}</td>
                        <td>{item.tgl_book}</td>
                        <td>{item.wkt_mulai}</td>
                        <td>{item.wkt_selesai}</td>
                        <td>{item.durasi}</td>
                        <td>{item.biaya}</td>
                        <td>{item.status}</td>
                          <button className="m-1 btn btn-sm btn-outline-info"
                            onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                      <td>
                          <button className="m-1 btn btn-sm btn-primary"
                             onClick={() => this.Used(item.id)}>
                             <span>Used</span>
                         </button>

                         <button className="m-1 btn btn-sm btn-danger"
                             onClick={() => this.Done(item.id)}>
                             <span>Done</span>
                         </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}

              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>


              <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                <div className="col-md-4 mb-3">

                      <label htmlFor="state">Username</label>
                      <select className="form-control" name="id_user" value={this.state.id_user} onChange={this.bind} required>
                        <option>Select</option>
                      {this.state.users.map((item) => {
                    return(
                      <option value={item.id}>{item.username}</option>
                      )})}
                    </select>
                      </div>
                      <div className="col-md-4 mb-3">
                              <label htmlFor="state">Nama Lapangan</label>
                            <select className="form-control" name="id_lapangan" value={this.state.id_lapangan} onChange={this.bind} required>
                              <option>Select</option>
                            {this.state.lapangan.map((item) => {
                          return(
                            <option value={item.id}>{item.nama}</option>
                            )})}
                          </select>
                            </div>
                  Tanggal Booking
                  <input type="date" className="form-control" name="tgl_book"
                    value={this.state.tgl_book} onChange={this.bind} required />
                    Waktu Mulai
                    <input type="time" className="form-control" name="wkt_mulai"
                      value={this.state.wkt_mulai} onChange={this.bind} required />
                      Waktu Selesai
                      <input type="time" className="form-control" name="wkt_selesai"
                        value={this.state.wkt_selesai} onChange={this.bind} required />



                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>


        </div>
      );
    }



    }
    export default Sewa;
