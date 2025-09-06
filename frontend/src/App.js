import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSchool from './components/AddSchool';
import ShowSchools from './components/ShowSchools';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            🏫 School Management System
                        </Link>
                        
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        View Schools
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">
                                        Add School
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<ShowSchools />} />
                    <Route path="/add" element={<AddSchool />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
