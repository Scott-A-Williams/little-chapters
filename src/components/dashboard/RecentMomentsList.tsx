import React from 'react';
import { useMoments } from '../../context/MomentContext';
import { useChild } from '../../context/ChildContext';
import { MomentCard } from '../moment/MomentCard';
import { EmptyState } from '../common/EmptyState';
import { Heart, Plus } from 'lucide-react';

export const RecentMomentsList: React.FC = () => {
  const { moments, openQuickLog } = useMoments();
  const { activeChild } = useChild();

  const childMoments = moments.filter(
    (m) => !activeChild || m.childId === activeChild.id
  );

  const recent = childMoments.slice(0, 5);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--lc-text-primary)',
          }}
        >
          Recent Journal
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--lc-text-muted)' }}>
          {childMoments.length} moments
        </span>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          icon={<Heart size={28} />}
          title="No moments captured yet"
          description={`Your chapter with ${activeChild?.name || 'your little one'} is just beginning. Capture their first smile, feed, or sweet nap.`}
          actionLabel="Capture First Moment"
          actionIcon={<Plus size={16} />}
          onAction={() => openQuickLog()}
        />
      ) : (
        <div>
          {recent.map((moment) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              childName={activeChild?.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
