import React from 'react';
import ResourcePage from './ResourcePage';

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      resource="teams"
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