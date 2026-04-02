import React from 'react';
import ResourcePage from './ResourcePage';

function Teams() {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  return (
    <ResourcePage
      title="Teams"
      endpoint={endpoint}
      description="Team records displayed with a consistent Bootstrap table layout and detail modal."
      emptyMessage="No teams returned by the API."
      columns={[
        { label: 'ID', key: 'id' },
        { label: 'Team Name', key: 'name' },
      ]}
    />
  );
}

export default Teams;