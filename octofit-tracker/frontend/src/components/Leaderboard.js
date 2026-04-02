import React from 'react';
import ResourcePage from './ResourcePage';

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      resource="leaderboard"
      description="Competition standings ordered by score, displayed in the shared table layout."
      emptyMessage="No leaderboard entries returned by the API."
      columns={[
        { label: 'ID', key: 'id' },
        { label: 'User', key: 'user' },
        { label: 'Score', render: (entry) => `${entry.score} pts` },
      ]}
    />
  );
}

export default Leaderboard;