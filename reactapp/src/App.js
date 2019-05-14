import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import WorkerPage from './pages/WorkerPAge';
import IndexPage from './pages/IndexPage'
import ManagerPage from './pages/ManagerPage';
import OrderPage from './pages/OrderPage';
import Stats from './pages/Stats';
function App() {
  return (
      <Router>
        <div className="App">
            <div className="container">
                <Sidebar/>
                <Route exact path="/" render={props=>(
                    <React.Fragment>
                        <IndexPage/>
                    </React.Fragment>
                )}
               />
                <Route path="/Worker" render={props =>(
                    <React.Fragment>
                        <WorkerPage/>
                    </React.Fragment>
                )}/>
                <Route path="/Manager" render={props=>(
                    <React.Fragment>
                        <ManagerPage/>
                    </React.Fragment>
                )}/>
                <Route path="/Order" render={props=>(
                    <React.Fragment>
                        <OrderPage/>
                    </React.Fragment>
                )}/>
                <Route path="/Stats" render={props=>(
                    <React.Fragment>
                        <Stats/>
                    </React.Fragment>
                )}/>
            </div>
        </div>
      </Router>
  );
}

export default App;
