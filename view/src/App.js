import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './pages/admin/admin.js'
import Admin from './pages/login/login.js'

const App = () => {
  return (
    <div>
      {/* <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
      </Switch> */}
      <Login/>
    </div>
  );
}

export default App;
