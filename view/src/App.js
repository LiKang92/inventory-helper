import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

const App = () => {
  return (
    <div className='app'>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
      </Switch>
    </div>
  );
}

export default App;
