import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./cartPage.scss";
import TitleBar  from "../../../components/reusable-Components/titleBar/titleBar"
import toastMessage from "../../../Toast/toastMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Cart extends React.Component {
  state = {
    moviesInCart : [],
    total : 0,
    userId : this.props.currentUser.userId
  };

  buyMovie(movieId, userId) {
    const url = "users/" + this.state.userId + "/purches";
    
    var idList = [];

    const movieIdList = this.state.moviesInCart.map(function (el) {
      
      const id = el.movieId;

      idList.push(el.movieId);
      return id;
    });

    console.log(movieIdList);

    const movies = {
      movies: idList,
    };
    setTimeout(() => {
      axios
        .put(url, movies, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.setState({moviesInCart: []})
          toastMessage("Buy SuccessFul");
        })
        .catch((error) => {
          toastMessage("Please Try Again");
        
        });
    }, 100);
  }

  getCart(userId) {
    const url = "users/" + userId + "/cart";
    setTimeout(() => {
      axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.setState({
            moviesInCart: res.data.moviesInCart,
             total : res.data.total,
             
          });

          console.log(this.state.cart);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);
  }


  removeItemFromCart(userId,movieId) {
    const url = "users/" + userId + "/cart/" + movieId
    
setTimeout(() => {
      axios
        .delete(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
         
          this.setState({
           moviesInCart: res.data.moviesInCart,
             total : res.data.total,
          })
          
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

}

  componentDidMount() {
    const { currentUser } = this.props;

    

    this.getCart(currentUser.userId);
  }

  render() {
    

      const {moviesInCart , total, userId } = this.state

      const imageUrl = "https://i.ibb.co/bdfMq7q/Romance.jpg";
      return (
        <section className="cart-page">
            <div>
            <ToastContainer />
          </div>
            <TitleBar title="Cart"/>
          <div className="cart-table">
          

            {
                 moviesInCart.length === 0 ?  (
                <div
                className="cart-empty "
                >
                NO ITEMS IN THE CART

              </div>
              ) : (
                       <table >
            <tr>
              <th>Movie</th>
              <th>Information</th>
              <th>Price</th>
            </tr>
           
              {
                
                
              moviesInCart.map((movie, index) => (
            
                <tr className="data-row" key={index}>
              <td className="table-data-1">
                <div
                  className="movie-img"
                  style={{ backgroundImage: `url(${movie.movieImageUrl ? movie.movieImageUrl:imageUrl })` }}
                ></div>
              </td>
              <td className="table-data-2">
                  <div>{movie.title }</div>
                <div>{movie.category}</div>
                <div className="cart-remove-button" onClick={()=> this.removeItemFromCart(userId,movie.movieId)} >Remove</div>
              </td>
                <td className="table-data-3">${ movie.moviePrice}</td>
            </tr>
              
              
            ))}
          
          </table>
              )
          }  
     
</div>
          <div className="cart-checkOut">
            <div className="cart-summery">Summery</div>
            <hr className="solid" />
            <div className="cart-total">
              <div>Total</div>
              <div>${ Number(total).toFixed(2)  }</div>
            </div>
            <div className="cart-checkOut-button " onClick={()=>this.buyMovie()}>CheckOut</div>
          </div>
        </section>
      );
    }
 
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(Cart);
