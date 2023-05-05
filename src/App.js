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
