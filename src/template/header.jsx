import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
	<div className="header">
		<div className="logo" />
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
);