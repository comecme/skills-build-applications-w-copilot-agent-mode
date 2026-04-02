import React from 'react';
import ResourcePage from './ResourcePage';

function Leaderboard() {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  return (
    <ResourcePage
      title="Leaderboard"
      endpoint={endpoint}
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