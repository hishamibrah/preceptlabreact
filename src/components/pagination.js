import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div>
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={1000}
          pageRangeDisplayed={20}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default Page;
