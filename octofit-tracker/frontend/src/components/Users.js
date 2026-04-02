import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = buildEndpoint('users');

    console.log('Users endpoint:', endpoint);

    async function loadUsers() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Users fetched data:', payload);
        setUsers(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Users</h2>
        {loading && <p className="text-secondary mb-0">Loading users...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {users.length > 0 ? (
              users.map((user) => (
                <article key={user.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h3 className="h6 mb-1">{user.username}</h3>
                      <p className="mb-1 text-secondary">{user.email}</p>
                    </div>
                    <span className="badge text-bg-light border">Team: {user.team ?? 'Unassigned'}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="list-group-item text-secondary">No users returned by the API.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;