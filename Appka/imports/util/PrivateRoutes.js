import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ isAuthenticated, children }) => (
  isAuthenticated ? (
    Array.isArray(children) ? children.map(child => child) : children
  ) : (
    <Redirect to={{
        pathname: '/',
      }}
    />
  )
);
