import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './template/home'
import List from './home/List'


export default props => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/busca/:from/:to/:departure/:arrival?/:adults/:children?/:infants?/:cabin" component={List} />
		<Route exact path="*" render={() => <Redirect to="/" />} />
	</Switch>
);
