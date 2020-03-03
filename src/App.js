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
      activePage:1,
      search:null,
      users:[],
      findUser:false,
      handle:1
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
  handleBack(){
    this.setState({
      findUser:false
    })
  }
  async handleClick(){
    let url = new URL('http://localhost:8080/users');
    url.search= new URLSearchParams({
      user: this.state.search
    })
    const response = await fetch(url);
    const data = await response.json();
    if(data.items===undefined){
      alert("user not found")
      this.setState({
        findUser:false,
        handle:0
      })
    }else{
        this.setState({
          users:data.items,
          findUser:true,
          handle:1
        })
      }
    }
  onTodoChange(value){
        this.setState({
             search: value
        });
    }


  render(){
    if(this.state.findUser===true){
      return (
        <div>
        <div className="box">
        <Button classname="Button" onClick={this.handleBack.bind(this)}>Back</Button>
        </div>
        <div className="search">
        <InputGroup>
        <Input type="text" value={this.state.name}
          onChange={e => this.onTodoChange(e.target.value)} placeholder="username" />
        <InputGroupAddon addonType="apend">
        <Button onClick={this.handleClick.bind(this)}>Search </Button>
        </InputGroupAddon>
        </InputGroup>

        </div>
        <div className="box">
        {this.state.users.map((items,index) => (
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
        </div>
        </div>
      )}
      else{
      return (
        <div>
        <div className="search">
        <InputGroup>
        <Input type="text" value={this.state.name}
          onChange={e => this.onTodoChange(e.target.value)} placeholder="username" />
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
}

export default App;
