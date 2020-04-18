import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/Slide1.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Client extends Component {
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
      let url = "http://localhost/lapangan/public/myorder/"+id;
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
    let id = JSON.parse(localStorage.getItem('id'))
    let url = "http://localhost/lapangan/public/users/"+id;
    axios.get(url)
    .then(response => {
        this.setState({
          users: response.data.users,
        });
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
      if (window.confirm("Apakah anda yakin ingin Cancel data ini?")) {
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
  Cancel = (id) => {
      if (window.confirm("Apakah anda yakin ingin Cancel data ini?")) {
          $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/sewa/cancel/"+id;
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
      let id = JSON.parse(localStorage.getItem('id'))
      console.log(this.state.id_user)
      event.preventDefault();
      $("#modal_user").modal("hide");
      let url = "http://localhost/lapangan/public/sewa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("id_user", id);
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
      const { sewa } =  this.state;
      return(
        <div className="container">
        <input type="text" className="form-control"
        name="find" value={this.state.find}
        onChange={this.bind}
        onKeyUp={this.Search} required placeholder="Pencarian.." />
          <div>
          <div style={{ paddingTop: "1%" }}>
            <div className="#" style={{}}>

                <div className="">

                <div className="">
                    { this.state.sewa.map((item) => {
                    return(
                      <div className="card" style={{marginTop: "2%", marginBottom: "4%"}} key={item.id}>
                        <div>

                        <h4 className="card-header text-center text-dark" style={{ fontWeight: "700" }}>PESANAN</h4>
                        </div>
                                            <div className="card-body ">
                  <p className="text-dark text-center ">Dipesan : {item.tgl_book} </p>
                  <p className="text-dark text-center "></p>
                    <td className="list-group-item text-center card-header" style={{ fontWeight: "700" }}>
                    Nama : {item.username}<br/>
                    Nama Lapangan : {item.nama_lapangan}<br/>
                    Status : {item.status}<br/>
                    Durasi : {item.durasi} Jam<br/>
                    Biaya : {item.biaya}<br/>
                    Mulai : {item.wkt_mulai}<br/>
                    Selesai : {item.wkt_selesai}</td>
                    <td className="list-group-item text-center card-header" style={{ fontWeight: "700" }}>

                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Cancel(item.id)}>
                                                    <span className="fa ">Cancel</span>
                                                </button>


</td>

                      </div>
                      </div>
                      );
                    })}
                    <button className="btn btn-success my-2" onClick={this.Add}>
                      <span className="fa fa-plus"></span> Sewa
                    </button>
                     </div>
              </div>
            </div>
          </div>
          </div>

          <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
            <form onSubmit={this.Save}>
            <div className="col-md-4 mb-3">
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

      );

    }



}
export default Client;
