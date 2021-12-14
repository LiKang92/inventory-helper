import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './pages/admin/admin'
import Admin from './pages/login/login'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>

      </Switch>
    </div>
  );
}

export default App;
