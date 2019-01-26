import React from 'react'

export default props => (
    <div className="header">
        <div className="logo"></div>
        <nav className="menu-header">
            <ul>
                <li>
                    <i className="icon-credit"></i>
                    Comprar Passagens
                    </li>
                <li> 
                    <i className="icon-miles"></i>
                    Vender Milhas
                </li>
                <li> 
                    <i className="icon-question"></i>
                    Tirar Duvidas
                </li>
                <li> 
                    <i className="icon-user"></i>
                    Login
                </li>
            </ul>
        </nav>
    </div>
)