import './App.css';
import { Home } from './Home';
import { Employees } from './Employees';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <div className="App container">
          <h3 className = "d-flex justify-content-center m-3">
            Employee Benefits App
          </h3>
          <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
            <ul className='navbar-nav'>
              <li className='nav-item- m-1'>
                <NavLink className='btn btn-light btn-outline-primary' to='/home'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item- m-1'>
                <NavLink className='btn btn-light btn-outline-primary' to='/employees'>
                  Employees
                </NavLink>
              </li>
            </ul>
          </nav>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/employees' element={<Employees/>}/>
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
