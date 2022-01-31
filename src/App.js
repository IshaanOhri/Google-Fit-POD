import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home'
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

export class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/steps' element={<Steps/>} />
        <Route path='/distance' element={<Distance/>} />
        <Route path='/speed' element={<Speed/>} />
        <Route path='/active-minutes' element={<ActiveMinutes/>} />
        <Route path='/calories-expended' element={<CaloriesExpended/>} />
        <Route path='/heart-minutes' element={<HeartMinutes/>} />
        <Route path='/sleep-segment' element={<SleepSegment/>} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;