import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Loading each pages' components, import if add new ones
import Home from './Home';
import Latest from './Latest';
import Historical from './Historical';
import HistoryList from './HistoryList';
import Converter from './Converter';

const Router = () => (
    // Add a new Route if add new path
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/latest' component={Latest} />
            <Route exact path='/historical' component={Historical} />
            <Route exact path='/list' component={HistoryList} />
            <Route exact path='/converter' component={Converter} />
        </Switch>
)

export default Router;