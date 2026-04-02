import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
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
    <main className="min-vh-100 bg-light text-dark">
      <header className="border-bottom bg-white shadow-sm">
        <div className="container py-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <span className="badge text-bg-success mb-2">OctoFit Tracker</span>
              <h1 className="h3 mb-1">Frontend connected to the Django REST API</h1>
              <p className="text-secondary mb-0">
                Browse live users, teams, workouts, activities, and leaderboard data.
              </p>
            </div>
            <nav aria-label="OctoFit sections">
              <div className="nav nav-pills gap-2 flex-wrap justify-content-lg-end">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link text-dark border'
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