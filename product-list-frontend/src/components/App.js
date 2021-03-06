import React, { Component } from "react";
import ProductView from "./ProductView";
import SortByDropdown from "./SortByDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { loadProducts, updatePagination, updateCategory } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {

  componentDidMount() {
    //initial page load
    this.props.loadProducts(null,null, 1);
  }

  componentWillReceiveProps(nextProps) {
    //checks to see if incoming category/page/sort props are different than current and dispatches an API call with new values.
    const {category, sort, page} = this.props;
    if (category !== nextProps.category || sort !== nextProps.sort || page !== nextProps.page) {
      this.props.loadProducts(nextProps.category, nextProps.sort, nextProps.page);
    }
  }
  
  onClickPageNumber(e) {
    const clickedPage = e.currentTarget.textContent;
    this.props.updatePagination(clickedPage)
  }

  //Pushes page numbers to array that we can then use to map our elements.
  pagination() {
    const pages = [];
    if (this.props.products.pagesCount) {
    for (let i=1;i<=this.props.products.pagesCount;i++) {
        pages.push(i);
    }
  } else {
    return (
      <div>Loading...</div>
    )
  }

  return pages.map(page => {
    if(page == this.props.page) {
    return (
      <li key={page} onClick={this.onClickPageNumber.bind(this)}><strong>{page}</strong></li>
    )
    } else return (
      <li key={page} onClick={this.onClickPageNumber.bind(this)}>{page}</li>
    )
  })
  }

  render() {
    return (
      <div className="container-fluid">
      <h1 align="center">PRODUCTS</h1>
      <div className="d-flex">
      <div className="flex-fill-search">
      <form>
      <div className="input-group">
      <button type="button" className="btn btn-primary">Search</button>
      <input type="text" className="form-control" id="searchVal"defaultValue="<under construction>"></input>
      </div>
      </form>
      </div>
      <div className="flex-fill-categories">
        <CategoryDropdown />
        </div>
        <div className="flex-fill-sortby">
        <SortByDropdown />
        </div>
        </div>
        <ProductView />
        <div>
          <ul className="pages">
        {this.pagination()}
        </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products, page, category, sort }) {
  return { products, page, category, sort };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadProducts, updatePagination, updateCategory},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);