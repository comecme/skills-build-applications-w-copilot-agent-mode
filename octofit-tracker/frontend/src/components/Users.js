import React from 'react';
import ResourcePage from './ResourcePage';

function Users() {
  return (
    <ResourcePage
      title="Users"
      resource="users"
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