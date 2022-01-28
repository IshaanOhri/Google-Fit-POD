import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home'
import Dashboard from "./pages/dashboard";

export class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;