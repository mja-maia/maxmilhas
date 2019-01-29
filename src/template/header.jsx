import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
class Header extends Component {

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(){
    this.props.history.push('/')
  }

  render(){
    return (
      <div className="header">
        <div onClick={this.handleClick} className="logo" />
        <nav className="menu-header">
          <ul>
            <li>
              <i className="icon-credit" />
              <Link to="/">Comprar passagens</Link>
            </li>
            <li>
              <i className="icon-miles" />
              <Link to="/">Vender milhas</Link>
            </li>
            <li>
              <i className="icon-question" />
              <Link to="/">Tirar Dúvidas</Link>
            </li>
            <li>
              <i className="icon-user" />
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)