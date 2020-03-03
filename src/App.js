import React,{ Component } from 'react';
import './App.css';
import { Media, Button, Toast ,ToastHeader, ToastBody, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Columns from 'react-columns';
import Pagination from "react-js-pagination";


class App extends Component {
  constructor(){
    super();
    this.state = {
      datas:[],
      totalResult:0,
      currentPage:1,
      totalPages:100,
      activePage:1
    }
  }
  async handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber,});
    let url = new URL('http://localhost:8080');
    url.search= new URLSearchParams({
      page: this.state.activePage
    })
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      datas:data.items
    })
    console.log(this.state.datas);
  }

  async componentDidMount(){
    let url = new URL('http://localhost:8080');
    url.search= new URLSearchParams({
      page: this.state.activePage
    })
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      datas:data.items
    })
    console.log(this.state.datas);
  }

  handleClick(){

  }


  render(){
    return (
      <div>
        <div className="search">
          <InputGroup>
            <Input  placeholder="username" />
            <InputGroupAddon addonType="apend">
              <Button onClick={this.handleClick.bind(this)}>Search </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="box">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={1000}
            pageRangeDisplayed={15}
            onChange={this.handlePageChange.bind(this)}
          />
            <Columns columns="5">
              {this.state.datas.map((items,index) => (
              <Toast style={{width:130}}>
                <ToastHeader>
                  {items.login}
                </ToastHeader>
                <ToastBody>
                  <div>
                  <img
                    className="images"
                    src={items.avatar_url}
                    alt=""
                  />
                  </div>
                </ToastBody>
              </Toast>
              ))}
            </Columns>
        </div>
      </div>
    );
  }
}

export default App;
