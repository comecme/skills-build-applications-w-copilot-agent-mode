import React from 'react';
import ResourcePage from './ResourcePage';

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      resource="activities"
      description="Logged activities with user references, workout references, and duration values."
      emptyMessage="No activities returned by the API."
      columns={[
        { label: 'ID', key: 'id' },
        { label: 'User', key: 'user' },
        { label: 'Workout', key: 'workout' },
        { label: 'Duration', render: (activity) => `${activity.duration} min` },
      ]}
    />
  );
}

export default Activities;