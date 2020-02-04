import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Academy from './pages/Academy'
import './App.css';
import { dailyAverageBatteryConsumption } from './helpers/dailyAverageBatteryConsumption'
import Battery from './pages/Battery';
import MainNavigation from './components/MainNavigation'

function App() {
  console.log(dailyAverageBatteryConsumption())
  return (
    <BrowserRouter>
    <React.Fragment>
      <MainNavigation/>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/battery" exact />
            <Route path="/academy" component={Academy} />
            <Route path="/battery" component={Battery} />
          </Switch>
        </main>
    </React.Fragment>
  </BrowserRouter>
  );
}

export default App;
