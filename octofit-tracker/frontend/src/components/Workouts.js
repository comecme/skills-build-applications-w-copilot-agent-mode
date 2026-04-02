import React from 'react';
import ResourcePage from './ResourcePage';

function Workouts() {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  return (
    <ResourcePage
      title="Workouts"
      endpoint={endpoint}
      description="Workout names and descriptions from the REST API with searchable rows and detail popups."
      emptyMessage="No workouts returned by the API."
      columns={[
        { label: 'ID', key: 'id' },
        { label: 'Workout', key: 'name' },
        { label: 'Description', key: 'description' },
      ]}
    />
  );
}

export default Workouts;