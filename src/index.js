import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize root rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap application in error boundary and setup context for future scalability
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance and optionally send it to an analytics endpoint
// Replace the console.log with a function to send to analytics if needed
reportWebVitals((metric) => {
  console.log(metric); // Logs performance metrics to the console
  // Example: send metric to an analytics endpoint
  // fetch('/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  // });
});
