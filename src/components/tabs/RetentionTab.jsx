import React from 'react';
import { PRAGYA_DATA, getClassActivityMatrix } from '../../data/pragyaData';
import { Bookmark, Clock, Sparkles, HelpCircle, FileText } from 'lucide-react';

export default function RetentionTab() {
  const matrix = getClassActivityMatrix();

  return (
    <div className="tab-content">
      {/* Overview Banner */}
      <div className="summary-banner" style={{ borderLeftColor: 'var(--butter)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Bookmark size={18} style={{ color: 'var(--plum)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Vocabulary Acquisition & Long-Term Retention Tracking</h3>
        </div>
        <p style={{ fontSize: '0.875rem' }}>
          This module tracks key vocabulary terms introduced during role-play activities (e.g., <em>Rule</em>, <em>Machine</em>, <em>Robot</em>, <em>Pattern</em>, <em>Classify</em>) and monitors long-term retention across follow-up evaluation cycles.
        </p>
      </div>

      {/* Vocabulary Introduced Matrix */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Vocabulary Introduced by Class & Activity</h3>
          <p className="section-caption">Core non-technical terminology introduced during experiential workshops across all activities.</p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                {PRAGYA_DATA.meta.activities.map(act => (
                  <th key={act.id}>Act {act.id}: {act.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRAGYA_DATA.meta.classes.map(c => {
                const classStr = String(c);
                const classVocab = PRAGYA_DATA.vocabularyIntroducedByClassByActivity[classStr] || {};
                return (
                  <tr key={c}>
                    <td><strong>Class {c}</strong></td>
                    {PRAGYA_DATA.meta.activities.map(act => {
                      const vocab = classVocab[String(act.id)];
                      return (
                        <td key={act.id}>
                          {Array.isArray(vocab) && vocab.length > 0 ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                              {vocab.map((term, tIdx) => (
                                <span key={tIdx} className="vocab-chip">
                                  {term}
                                </span>
                              ))}
                            </div>
                          ) : vocab === "NA" ? (
                            <span className="empty-cell">N/A</span>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prominent In-Progress Cards for Uncollected Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div className="in-progress-card">
          <div className="in-progress-badge">
            <Clock size={15} /> In Progress - Scheduled Phase 2
          </div>
          <h4>Vocabulary Retention Assessment</h4>
          <p style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            Data Status: <strong style={{ color: 'var(--plum)' }}>To be collected at the end of the pilot</strong>
          </p>
          <p>
            Post-session retention tests measuring student recognition and recall of core vocabulary terms are scheduled for delivery 4 weeks post-activity.
          </p>
        </div>

        <div className="in-progress-card">
          <div className="in-progress-badge">
            <Clock size={15} /> In Progress - Scheduled Phase 2
          </div>
          <h4>Long-Term Longitudinal Retention</h4>
          <p style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            Data Status: <strong style={{ color: 'var(--plum)' }}>To be collected at the end of the pilot</strong>
          </p>
          <p>
            Longitudinal evaluation assessing concept persistence into the subsequent school term will commence following completion of all 5 planned activities.
          </p>
        </div>
      </div>
    </div>
  );
}
