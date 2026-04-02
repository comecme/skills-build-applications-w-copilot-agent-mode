import React from 'react';
import ResourcePage from './ResourcePage';

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      resource="workouts"
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