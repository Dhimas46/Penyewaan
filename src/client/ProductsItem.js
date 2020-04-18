import React from 'react';
import axios from "axios";
export default class ProductsItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      total: 0,
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
  }
  bind =(e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  addToCart = (item) => {
    let oldItems = JSON.parse(localStorage.getItem('cart')) || []
    let newid = item.id
    let match = oldItems.find(({ id }) => id === newid);
    if(match)
    {
      if(match['qty'] < item.stock)
      {
      match['qty'] += parseInt(this.state.quantity);
      match['total'] = match['total'] + (item.harga * parseInt(this.state.quantity));
    }
  }
  else{
      let newItem = {
        'id' : item.id,
        'name' : item.name,
        'harga' : item.harga,
        'qty' : parseInt(this.state.quantity),
        'total' : item.harga * parseInt(this.state.quantity)
      };
      oldItems.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(oldItems));
  }
  get_sewa = () => {
    let id = JSON.parse(localStorage.getItem('id'))
    let url = "http://localhost/lapangan/public/sewa"+id;
    axios.get(url)
    .then(response => {
        this.setState({
          status: response.data.status,
        });
    })
    .catch(error => {
        console.log(error);
    });
  }
  componentDidMount = () => {
    this.get_sewa();
}

  render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100" style={{ marginBottom: "10px"}}>
                <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + item.image} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{item.nama}</a>
                        </h4>
                        <h5>Rp. {item.harga}</h5>
                        {this.state.sewa.map((item,index) => {
                          return(
                            <tr key={item.id}>
                        <span className="card-text">
                            <small>Status: </small>{item.status}
                        </span>
                        </tr>
                      );
                    })}


                </div>
            </div>
            </div>
       )
    }

}
