import React from 'react';
import { Card } from '../common/Card';
import { useMoments } from '../../context/MomentContext';
import { useChild } from '../../context/ChildContext';
import { Milk, Moon, Baby, Sparkles } from 'lucide-react';

export const TodaySummary: React.FC = () => {
  const { moments } = useMoments();
  const { activeChild } = useChild();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysMoments = moments.filter(
    (m) =>
      (!activeChild || m.childId === activeChild.id) &&
      new Date(m.dateTime).getTime() >= today.getTime()
  );

  const feedsCount = todaysMoments.filter((m) => m.category === 'feeding').length;
  const napsCount = todaysMoments.filter((m) => m.category === 'sleep').length;
  const nappiesCount = todaysMoments.filter((m) => m.category === 'nappy_toileting').length;
  const totalCount = todaysMoments.length;

  return (
    <Card variant="default" padding="sm" style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 6px 10px',
          borderBottom: '1px solid var(--lc-border-subtle)',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--lc-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Sparkles size={14} color="var(--lc-secondary)" />
          Today's Rhythm
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--lc-text-muted)' }}>
          {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginTop: '10px',
        }}
      >
        {/* Feeds */}
        <div style={{ textAlign: 'center', padding: '6px 2px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 155, 193, 0.12)',
              color: '#009BC1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 4px',
            }}
          >
            <Milk size={16} />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
            {feedsCount}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--lc-text-muted)', fontWeight: 500 }}>
            Feeds
          </div>
        </div>

        {/* Naps */}
        <div style={{ textAlign: 'center', padding: '6px 2px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(107, 122, 161, 0.12)',
              color: '#6B7AA1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 4px',
            }}
          >
            <Moon size={16} />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
            {napsCount}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--lc-text-muted)', fontWeight: 500 }}>
            Naps
          </div>
        </div>

        {/* Nappies */}
        <div style={{ textAlign: 'center', padding: '6px 2px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(78, 159, 61, 0.12)',
              color: '#4E9F3D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 4px',
            }}
          >
            <Baby size={16} />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
            {nappiesCount}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--lc-text-muted)', fontWeight: 500 }}>
            Nappies
          </div>
        </div>

        {/* Total Captured */}
        <div style={{ textAlign: 'center', padding: '6px 2px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 184, 109, 0.16)',
              color: 'var(--lc-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 4px',
            }}
          >
            <Sparkles size={16} />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--lc-text-muted)', fontWeight: 500 }}>
            Moments
          </div>
        </div>
      </div>
    </Card>
  );
};
