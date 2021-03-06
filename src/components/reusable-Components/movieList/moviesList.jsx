import React from "react";
import PaginationComponent from "../pagination/pagination";
import "./movieList.scss";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";

class MoviesList extends React.Component {
  render() {
    if (this.props.Movies === 0) {
      return <div></div>;
    } else {
      return (
        <section className="movie-list">
          <div className="movie-list-movies">
            <Row xs={1} md={2} lg={3} xl={4}>
              {this.props.Movies.map((item, index) => (
                <div key={index}>
                  <Col>
                    <MovieCard movie={item} />
                  </Col>
                </div>
              ))}
            </Row>
          </div>
          <div className="movie-list-pagination">
            <PaginationComponent
              currentPage={this.props.currentPage}
              pageCount={this.props.PageCount}
              onPageChange={this.props.handlePageChange}
            />
          </div>
        </section>
      );
    }
  }
}

export default MoviesList;
