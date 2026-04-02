import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = buildEndpoint('workouts');

    console.log('Workouts endpoint:', endpoint);

    async function loadWorkouts() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Workouts fetched data:', payload);
        setWorkouts(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Workouts</h2>
        {loading && <p className="text-secondary mb-0">Loading workouts...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="row g-3">
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <div key={workout.id} className="col-12 col-lg-6">
                  <article className="card h-100 border">
                    <div className="card-body">
                      <h3 className="h5 mb-2">{workout.name}</h3>
                      <p className="text-secondary mb-0">{workout.description}</p>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-light border mb-0">No workouts returned by the API.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;