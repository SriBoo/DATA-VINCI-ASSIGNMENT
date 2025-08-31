import React from 'react';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <div className="layout">
        <div className="section">
          <h3>System Overview</h3>
          <p>Users: 1,206</p>
          <p>Projects: 118</p>
          <p>Active Sessions: 79</p>
        </div>
        <div className="section">
          <h3>API Usage</h3>
          <p>Requests Today: 1,243</p>
          <p>Errors: 14</p>
          <p>Latency: 210ms</p>
        </div>
        <div className="section">
          <h3>Resource Allocation</h3>
          <p>CPU: 67%</p>
          <p>Memory: 72%</p>
          <p>Disk: 81%</p>
        </div>
      </div>
    </div>
  );
}