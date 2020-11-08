import React, {Component} from 'react'
import './App.css';
import { Switch, Redirect } from 'react-router-dom';

//components
import Login from './components/login';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Links from './components/links';
import PublicRoute from './components/routes/public';
import ProtectedRoute from './components/routes/protected';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <PublicRoute path='/login' component={Login} redirectRoute='/links'/>
          <PublicRoute path='/signup' component={Signup} redirectRoute='/links'/>
          <ProtectedRoute path='/links' component={Links} redirectRoute='/login'/>
          <Redirect from='/' to='/login'/>
        </Switch>
      </div>
    );
  }
}

export default App;
