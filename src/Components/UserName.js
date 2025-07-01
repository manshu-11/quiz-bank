import React from "react";

function UserName({ user }) {
  return <p>Welcome, {user.displayName}</p>;
}

export default UserName;
