import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Quiz2 from './components/Quiz2';
import Menu2 from './components/Menu2';


function App() {

  //const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180, R = 6371e3;
  //const d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R; 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Menu2 />} />
          <Route path="/quiz/:id" element={<Quiz2 />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    </>

  );

}

export default App;
