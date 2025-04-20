import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Edge Vision Kit</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>Settings</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
};