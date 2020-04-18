import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import Avatar from '../image/Avatar.png';
import App from '../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
       super();
       this.state = {
           username: "",
           password: "",
           message: "",
       }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/lapangan/public/login";
        let form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            let role = response.data.role;
            if (logged) {

              if(role === "admin"){
                window.location = "/Products";
              }else{
                window.location = "/";
              }
                this.setState({message: "Login Berhasil"});
                //menyimpan data token pada local storage
                localStorage.setItem("Token", response.data.token);
                //menyimpan data login user ke local storage
                localStorage.setItem("id", JSON.stringify(response.data.users.id));
                //direct ke halaman data siswa
                localStorage.setItem("role", response.data.users.role)
            } else {
                this.setState({message: "Login Gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return (
            <div className="container" style={{width: "30%"}}>
                <div className="card my-2">
                    <div className="card-header bg-light">
                        <h5 className="text-dark text-center">Login</h5>
                        </div>
                            <Toast id="message" autohide="false" title="informasi">
                                {this.state.message}
                                </Toast>
                          <form onSubmit={this.Login} action="action_page.php" method="post">
    <div className="imgcontainer">
      <img src={Avatar} alt="Avatar" className="avatar" />
    </div>
    <div className="container">
      <label htmlFor="uname">
        <b>Username</b>
      </label>
      <input value={this.state.username} onChange={this.bind} type="text" placeholder="Enter Username" name="username" required />
      <label htmlFor="password">
        <b>Password</b>
      </label>
      <input value={this.state.password} onChange={this.bind} type="password" placeholder="Enter Password" name="password" required />
      <button type="submit">Login</button>
      <label>
      <p> Belum Punya Akun?
    <Link to="/Register">
    Register
    </Link>
    </p>
      </label>
    </div>
    <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
    </div>
  </form>

                                        </div>
                                        </div>
        );
    }
}
export default Login;
