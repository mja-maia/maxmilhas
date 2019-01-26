import React from 'react'

export default props => (
    <div className="header">
        <div className="logo"></div>
        <nav className="menu-header">
            <ul>
                <li>
                    <i className="icon-credit"></i>
                    Comprar passagens
                    </li>
                <li> 
                    <i className="icon-miles"></i>
                    Vender milhas
                </li>
                <li> 
                    <i className="icon-question"></i>
                    Tirar Dúvidas
                </li>
                <li> 
                    <i className="icon-user"></i>
                    Login
                </li>
            </ul>
        </nav>
    </div>
)