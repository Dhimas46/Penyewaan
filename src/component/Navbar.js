import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component{
  Logout = () => {
      localStorage.removeItem("Token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      window.location = "/";
  }
    render(){
      let role = localStorage.getItem("role");
      let auth = localStorage.getItem("Token");
        return(
            <div className="navbar navbar-expand-lg bg-dark
             navbar-dark">
                <button type="button" className="navbar-toggler navbar-toggler-right"
                data-toggle="collapse" data-target="#menu">
                <span className="navbar navbar-toggler-icon"></span>
                </button>
              <div className="navbar-collapse collapse" id="menu">
                  <ul className="navbar-nav">



                  <a className="navbar-brand ml-5 text-white" href="#">RentField</a>
  { role === "admin" ? auth ? <li className="navbar-item"><Link className="nav-link" to="/Users">Data Member</Link></li> : "" : ""}

                      { role === "admin" ? auth ? <li className="navbar-item"><Link className="nav-link" to="/Sewa">Sewa</Link></li> : "" : ""}
                      { role === "admin" ? auth ? <li className="navbar-item"><Link className="nav-link" to="/Lapangan">Data Lapangan</Link></li> : "" : ""}
                      { role === "admin" ? "" : <li className="navbar-item"><Link className="nav-link" to="/">Info</Link></li>}
                      { role === "admin" ? "" : <li className="navbar-item"><Link className="nav-link" to="/Client">Order</Link></li>}
                      </ul>
                      </div>
                      <ul className="nav navbar-nav navbar-right">
                      { role === "admin" ? "" : <li className="navbar-item"><Link className="nav-link" to="/Cart"><span className="fa fa-phone"></span></Link></li>}



                      { role === "admin" ? "" : <li><Link className="nav-link" to="/Profil"><span className="fa fa-fw fa-user"></span></Link></li>}
                       {!(auth) ? <li className="navbar-item"><Link className="nav-link" to="/login"><span className="fa fa-sign-in"></span></Link></li> :
                         <li className="navbar-item"><a className="nav-link" onClick={this.Logout}><span className="fa fa-sign-out"></span>Logout</a></li>}

                      </ul>
                      </div>
        );
    }
}
export default Navbar;
