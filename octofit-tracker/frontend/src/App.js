import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function App() {
  return (
    <main className="app-shell min-vh-100 text-dark">
      <header className="app-header border-bottom shadow-sm">
        <div className="container py-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div className="d-flex align-items-start gap-3 app-brand-wrap">
              <img src="/octofitapp-small.png" alt="OctoFit logo" className="app-logo" />
              <div>
                <span className="badge rounded-pill text-bg-success mb-2 px-3 py-2">OctoFit Tracker</span>
                <h1 className="display-6 fw-bold mb-2">Frontend connected to the Django REST API</h1>
                <p className="text-secondary mb-0 app-subtitle">
                  Browse live users, teams, workouts, activities, and leaderboard data.
                </p>
              </div>
            </div>
            <nav aria-label="OctoFit sections">
              <div className="nav nav-pills gap-2 flex-wrap justify-content-lg-end app-nav">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive
                        ? 'nav-link active shadow-sm'
                        : 'nav-link text-dark border bg-white'
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;