import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = buildEndpoint('activities');

    console.log('Activities endpoint:', endpoint);

    async function loadActivities() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Activities fetched data:', payload);
        setActivities(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <p className="text-secondary mb-0">Loading activities...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            {activities.length > 0 ? (
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Workout</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.id}</td>
                      <td>{activity.user}</td>
                      <td>{activity.workout}</td>
                      <td>{activity.duration} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-light border mb-0">No activities returned by the API.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;