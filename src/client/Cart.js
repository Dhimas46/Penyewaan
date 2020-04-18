import React,{Component} from 'react';
import $ from "jquery";
import axios from "axios";

export default class Cart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      carts: [],
      sewa:[],
      id:"",
      num: 0,
      total: 0,
      message:""
    }

    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
}

bind = (event) => {
  this.setState({[event.target.name] : event.target.value});
}



getCarts = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let total = 0
    let num = 0
    items.forEach(item => {
      total += item.total
      num += item.qty
    });
    this.setState({
      carts: items,
      num: num,
      total: total
    });
}

componentDidMount() {
    this.getCarts();
}

removeFromCart = (product) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== product.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()

}

clearCart = () => {
    localStorage.removeItem('cart');
    this.setState({carts: []});
}



get_order= () => {
    // $("#loading").toast("show");
    let url = "http://localhost/lapangan/public/myorder";
    axios.get(url)
    .then(response => {
        this.setState({order: response.data.order});
        // $("#loading").toast("hide");
    })
    .catch(error => {
        console.log(error);
    });
}

Order = (e) => {
  let id = JSON.parse(localStorage.getItem('id'))
  e.preventDefault()
  let url = "http://localhost/lapangan/public/myorder/save"
  let form = new FormData()
  form.append("id", id)
  form.append("total", this.state.total)
  form.append("carts", JSON.stringify(this.state.carts))

  axios.post(url, form)
       .then(res => {
          alert("Order Berhasil")
          this.setState({message: res.data.message})
          localStorage.removeItem('cart')
          this.getCarts()
        })
        .catch(error => {
              console.log(error);
        })
}



      render(){
        const { carts, num, total, alamat } =  this.state;
        return (
            <div>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content />
            <meta name="author" content />
            <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico" />
            <link
              rel="canonical"
              href="https://getbootstrap.com/docs/4.0/examples/checkout/"
            />
            {/* Bootstrap core CSS */}
            <link href="../../dist/css/bootstrap.min.css" rel="stylesheet" />
            {/* Custom styles for this template */}
            <link href="form-validation.css" rel="stylesheet" />
            <div className="container">
              <div className="py-3">
              </div>
              <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">{num}</span>
                  </h4>
                  <ul className="list-group mb-3">
                  { !carts.length ?

                  <h5 className="text-warning text-center">No item on the cart</h5>

                  :

                  <div>
                  {carts.map((product, index) =>
                  <ul className="list-group list-group-horizontal-md">
                  <li className="list-group-item d-flex n" key={index}>
                  <div>
                    <h6 className="my-0">{product.name}</h6>
                    <small className="text-muted">Harga: Rp{product.price}, Jumlah produk: {product.qty} </small>
                  </div>
                  <span className="text-muted">Rp. {product.total}</span>
                  <button className="btn btn-sm btn-outline-warning "
                  onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span>Remove</button>
                </li>
                </ul>

            )
          }
          </div>
        }

        { !carts.length ? "" :

            <li className="list-group-item d-flex n">
              <button className="btn btn-block btn-outline-danger float-right" onClick={this.clearCart}
                style={{ marginRight: "10px" }}><span className="fa fa-trash"></span> Clear Cart</button>
            </li>
                  }

                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (IDR)</span>
                      <strong>Rp. {total}</strong>
                    </li>

                  </ul>
                  <form className="card p-2">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Promo code"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                  <form className="needs-validation" onSubmit={this.Order} >


                    <hr className="mb-4" />
                    <button className="btn btn-outline-success btn-lg btn-block" type="submit" >
                      Continue to Payment
                    </button>
                  </form>

                </div>
              </div>

            </div>


       )
    }




}
