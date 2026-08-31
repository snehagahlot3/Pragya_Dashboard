import React from 'react';
import { SUCCESS_THRESHOLD } from '../data/pragyaData';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ThresholdBadge({ rate, thresholdType = 'postAssessment', labelOverride }) {
  if (rate === null || rate === undefined || rate === "NOT_YET_COLLECTED" || typeof rate === 'string') {
    return <span className="empty-cell">—</span>;
  }

  const numRate = typeof rate === 'number' ? rate : parseFloat(rate);
  if (isNaN(numRate)) return <span className="empty-cell">—</span>;

  const target = SUCCESS_THRESHOLD[thresholdType] ?? 0.70;
  const isPass = numRate >= target;

  return (
    <span className={`threshold-badge ${isPass ? 'success' : 'warning'}`}>
      {isPass ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
      {labelOverride || (isPass ? `≥${(target * 100).toFixed(0)}% Target Met` : `<${(target * 100).toFixed(0)}% Below Target`)}
    </span>
  );
}
