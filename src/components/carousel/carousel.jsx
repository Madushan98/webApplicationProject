import React from "react";

import axios from "axios";

import CarouselContainer from "./carouselContainer";

import './carousel.scss'
class Carousel extends React.Component {

    state = {
        previewMovies : [],
    }


    componentDidMount() {
       
    
            axios.get('movies', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            }).then(res => {

                const shuffled = res.data.content.sort(() => 0.5 - Math.random());

                this.setState({

                    previewMovies: shuffled.slice(0, 5)
                })
     
                console.log(this.state.previewMovies)

            }).catch(
                err => {
                    console.error(err);
                })
      
    }

    render() {
       
        return (
            <div className="my__carousel_main">
                <CarouselContainer previewMovies={this.state.previewMovies} />
            </div>
        )
    }
}
 
 
 
export default Carousel;