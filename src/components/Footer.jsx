import React from 'react';

export default function Footer() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div>
          Data current as of <span className="footer-highlight">{currentDate}</span> — <strong>Pragya AI Pilot, Class 1–5</strong>
        </div>
        <div>
          Stravelle AI Literacy Initiative
        </div>
      </div>
    </footer>
  );
}
