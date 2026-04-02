import React from 'react';
import ResourcePage from './ResourcePage';

function Activities() {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  return (
    <ResourcePage
      title="Activities"
      endpoint={endpoint}
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