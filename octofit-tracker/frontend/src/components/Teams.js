import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = buildEndpoint('teams');

    console.log('Teams endpoint:', endpoint);

    async function loadTeams() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Teams fetched data:', payload);
        setTeams(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <p className="text-secondary mb-0">Loading teams...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="row g-3">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div key={team.id} className="col-sm-6 col-lg-4">
                  <article className="card h-100 border">
                    <div className="card-body">
                      <h3 className="h5 mb-1">{team.name}</h3>
                      <p className="text-secondary mb-0">Team ID: {team.id}</p>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-light border mb-0">No teams returned by the API.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;