import React from 'react';
import ResourcePage from './ResourcePage';

function Users() {
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  return (
    <ResourcePage
      title="Users"
      endpoint={endpoint}
      description="Authenticated users, profile emails, and team assignments from the backend API."
      emptyMessage="No users returned by the API."
      columns={[
        { label: 'ID', key: 'id' },
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Team', render: (user) => user.team ?? 'Unassigned' },
      ]}
    />
  );
}

export default Users;