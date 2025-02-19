import React, { useEffect, useState } from 'react';

const Objective = () => {
  

  return (
    <div>
      <h1>Objective</h1>
      <p>This is the Objective page.</p>
      <h2>Device Information</h2>
      <p>User Agent: {deviceInfo.userAgent}</p>
      <p>Browser Name: {deviceInfo.browserName}</p>
      <p>Platform: {deviceInfo.platform}</p>
    </div>
  );
};

export default Objective;
