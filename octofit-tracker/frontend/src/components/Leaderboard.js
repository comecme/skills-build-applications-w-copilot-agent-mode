import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = buildEndpoint('leaderboard');

    console.log('Leaderboard endpoint:', endpoint);

    async function loadLeaderboard() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);
        setEntries(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {loading && <p className="text-secondary mb-0">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <article key={entry.id} className="list-group-item d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <span className="badge text-bg-dark me-2">#{index + 1}</span>
                    <span>User {entry.user}</span>
                  </div>
                  <strong>{entry.score} pts</strong>
                </article>
              ))
            ) : (
              <div className="list-group-item text-secondary">No leaderboard entries returned by the API.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;