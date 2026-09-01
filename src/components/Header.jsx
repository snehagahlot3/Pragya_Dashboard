import React from 'react';
import { PRAGYA_DATA } from '../data/pragyaData';
import { Award, Calendar, School } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="header-inner">
        <div>
          <div className="brand-badge">
            <Award size={14} /> Stravelle
          </div>
          <div className="header-title-group">
            <h1>Pragya AI Pilot Dashboard</h1>
            <p>Early-Stage AI Literacy for Primary School Students (Classes 1–5)</p>
          </div>
        </div>

        <div className="header-meta">
          <div className="meta-chip">
            <School size={14} />
            <span>School: <strong>{PRAGYA_DATA.meta.school}</strong></span>
          </div>
          <div className="meta-chip">
            <Calendar size={14} />
            <span>Academic Year: <strong>{PRAGYA_DATA.meta.schoolYear}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
