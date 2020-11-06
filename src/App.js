import React, {Component} from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';

//components
import Login from './components/login';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Links from './components/links';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/links' component={Links}/>
        </Switch>
      </div>
    );
  }
}

export default App;
