import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import Profil from "./client/Profil";
import Client from "./client/Client";
import Cart from "./client/Cart";
import Register from "./page/Register";
import Login from "./page/Login";
import Users from "./page/Users";
import Lapangan from "./page/Lapangan";
import Sewa from "./page/Sewa";
import Produk from "./client/Produk";




class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}
            <Route path="/login" component={Login} />
            <Route exact path="/">
                 <Navbar />
                 <Produk />
                 </Route>


                 <Route path="/users">
                 <Navbar />
                 <Users />
                 </Route>

                 <Route path="/client">
                 <Navbar />
                 <Client />
                 </Route>

                 <Route path="/lapangan">
                 <Navbar />
                 <Lapangan />
                 </Route>





                 <Route path="/register">
                 <Navbar />
                 <Register />
                 </Route>



                 <Route path="/profil">
                 <Navbar />
                 <Profil />
                 </Route>
                 <Route path="/sewa">
                 <Navbar />
                 <Sewa />
                 </Route>
                 <Route path="/cart">
                 <Navbar />
                 <Cart />
                 </Route>


               </Switch>
        );
    }
}
export default Main;
