import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Menu from './components/Menu';
import Quiz from './components/Quiz';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Menu />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    </>

  );

}

export default App;
