import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Steps from "./pages/steps";
import Distance from "./pages/distance";
import Speed from "./pages/speed";
import CaloriesExpended from "./pages/caloriesExpended";
import ActiveMinutes from "./pages/activeMinutes";
import HeartRate from "./pages/heartRate";
import HeartPoints from "./pages/heartPoints";

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/steps" element={<Steps />} />
            <Route path='/distance' element={<Distance/>} />
        <Route path='/speed' element={<Speed/>} />
        <Route path='/active-minutes' element={<ActiveMinutes/>} />
        <Route path='/calories-expended' element={<CaloriesExpended/>} />
        <Route path='/heart-rate' element={<HeartRate/>} />
        <Route path='/heart-points' element={<HeartPoints/>} />
        {/* <Route path='/sleep-segment' element={<SleepSegment/>} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
