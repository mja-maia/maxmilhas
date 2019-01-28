import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './../template/home'
import Results from './../home/results'


export default props => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/busca" component={Results} />
		<Route exact path="*" render={() => <Redirect to="/" />} />
	</Switch>
);