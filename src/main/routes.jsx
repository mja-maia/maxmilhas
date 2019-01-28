import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './../template/home'
import List from './../home/list'


export default props => (
	<Switch>
		<Route exact path="/" component={Home} />
        <Route exact path="/busca" component={List} />
        <Route exact path="*" render={() => (
            <Redirect to='/'/>
        )} />
	</Switch>
);