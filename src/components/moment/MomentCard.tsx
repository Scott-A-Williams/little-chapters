import React from 'react';
import { Moment } from '../../types/moment';
import { CATEGORY_MAP } from '../../services/categoryMeta';
import { MomentCategoryIcon } from './MomentCategoryIcon';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { Clock, Trash2, Tag } from 'lucide-react';
import { useMoments } from '../../context/MomentContext';

interface MomentCardProps {
  moment: Moment;
  childName?: string;
}

export const MomentCard: React.FC<MomentCardProps> = ({ moment, childName }) => {
  const { deleteMoment } = useMoments();
  const meta = CATEGORY_MAP[moment.category];

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return `Today at ${timeStr}`;
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${timeStr}`;
    }

    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${timeStr}`;
  };

  const renderCategoryDataPreview = () => {
    const d = moment.categoryData;
    if (!d) return null;

    if (d.feeding) {
      const feed = d.feeding;
      return (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          {feed.feedType === 'breast' && feed.breastSide && (
            <Badge size="sm">
              Side: {feed.breastSide.toUpperCase()}
            </Badge>
          )}
          {feed.durationMinutes && (
            <Badge size="sm">
              Duration: {feed.durationMinutes}m
            </Badge>
          )}
          {feed.amountMl && (
            <Badge size="sm">
              {feed.amountMl} ml
            </Badge>
          )}
        </div>
      );
    }

    if (d.nappy) {
      return (
        <div style={{ marginTop: '6px' }}>
          <Badge size="sm">
            Condition: {d.nappy.condition.toUpperCase()}
          </Badge>
        </div>
      );
    }

    if (d.quote) {
      return (
        <div
          style={{
            marginTop: '8px',
            padding: '10px 14px',
            backgroundColor: 'var(--surface-subtle)',
            borderLeft: '2.5px solid var(--accent)',
            borderRadius: '4px',
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.45,
          }}
        >
          &ldquo;{d.quote.quoteText}&rdquo;
          {d.quote.context && (
            <div style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              — {d.quote.context}
            </div>
          )}
        </div>
      );
    }

    if (d.growth) {
      return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
          {d.growth.weightKg && (
            <Badge size="sm">
              Weight: {d.growth.weightKg} kg
            </Badge>
          )}
          {d.growth.heightCm && (
            <Badge size="sm">
              Length: {d.growth.heightCm} cm
            </Badge>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Card variant="default" padding="md" style={{ marginBottom: '12px' }} className="animate-fade-in">
      {/* Top Meta Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge
            color={meta?.color || 'var(--accent)'}
            icon={<MomentCategoryIcon category={moment.category} size={13} color={meta?.color} />}
          >
            {meta?.shortLabel || moment.category}
          </Badge>

          {childName && (
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
              }}
            >
              • {childName}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            <Clock size={12} />
            <span>{formatTimestamp(moment.dateTime)}</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm(`Delete "${moment.title}"?`)) {
                deleteMoment(moment.id);
              }
            }}
            title="Delete moment"
            aria-label="Delete moment"
            style={{
              color: 'var(--text-muted)',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.05rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          marginBottom: moment.notes ? '5px' : '2px',
        }}
      >
        {moment.title}
      </h4>

      {/* Notes */}
      {moment.notes && (
        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            whiteSpace: 'pre-line',
          }}
        >
          {moment.notes}
        </p>
      )}

      {/* Category Specific Data View */}
      {renderCategoryDataPreview()}

      {/* Tags */}
      {moment.tags && moment.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
          {moment.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};
