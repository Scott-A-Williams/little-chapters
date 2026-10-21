import React from 'react';
import { useMoments } from '../context/MomentContext';
import { useChild } from '../context/ChildContext';
import { MomentCard } from '../components/moment/MomentCard';
import { EmptyState } from '../components/common/EmptyState';
import { MOMENT_CATEGORIES } from '../services/categoryMeta';
import { MomentCategory } from '../types/moment';
import { Search, X, Clock, Plus } from 'lucide-react';
import { MomentCategoryIcon } from '../components/moment/MomentCategoryIcon';

export const TimelineView: React.FC = () => {
  const { moments, filter, setFilter, openQuickLog } = useMoments();
  const { activeChild } = useChild();

  const childMoments = moments.filter(
    (m) => !activeChild || m.childId === activeChild.id
  );

  const activeCategory = filter.category || 'all';

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '16px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '-0.015em',
            marginBottom: '4px',
          }}
        >
          Timeline
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Chronological story of {activeChild ? activeChild.name : 'your family'}
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={15} />
        </div>
        <input
          type="text"
          value={filter.searchQuery || ''}
          onChange={(e) => setFilter({ searchQuery: e.target.value })}
          placeholder="Search memories, milestones, notes, tags..."
          style={{
            width: '100%',
            padding: '10px 36px 10px 36px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface-elevated)',
            color: 'var(--text-primary)',
            fontSize: '0.92rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
        {filter.searchQuery && (
          <button
            onClick={() => setFilter({ searchQuery: '' })}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category Filter Carousel */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <button
          onClick={() => setFilter({ category: 'all' })}
          style={{
            padding: '6px 13px',
            borderRadius: 'var(--radius-full)',
            border: activeCategory === 'all'
              ? '1px solid var(--accent)'
              : '1px solid var(--border)',
            backgroundColor: activeCategory === 'all'
              ? 'var(--accent)'
              : 'var(--surface)',
            color: activeCategory === 'all' ? 'var(--button-text)' : 'var(--text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'all 0.16s ease',
          }}
        >
          All Moments
        </button>

        {MOMENT_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() =>
                setFilter({ category: isSelected ? 'all' : (cat.category as MomentCategory) })
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: isSelected
                  ? `1px solid ${cat.color}`
                  : '1px solid var(--border)',
                backgroundColor: isSelected
                  ? `color-mix(in srgb, ${cat.color} 15%, var(--surface))`
                  : 'var(--surface)',
                color: isSelected ? cat.color : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.16s ease',
              }}
            >
              <MomentCategoryIcon
                category={cat.category}
                size={13}
                color={isSelected ? cat.color : 'var(--text-muted)'}
              />
              <span>{cat.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Feed List */}
      {childMoments.length === 0 ? (
        <EmptyState
          icon={<Clock size={24} />}
          title={filter.searchQuery ? 'No moments match your search' : 'No moments found'}
          description={
            filter.searchQuery
              ? `We couldn't find anything matching "${filter.searchQuery}". Try clearing filters or searching another keyword.`
              : `Start logging moments for ${activeChild?.name || 'your child'} to build their story.`
          }
          actionLabel={filter.searchQuery ? 'Clear Filters' : 'Capture a Moment'}
          actionIcon={filter.searchQuery ? undefined : <Plus size={15} />}
          onAction={() => {
            if (filter.searchQuery || activeCategory !== 'all') {
              setFilter({ searchQuery: '', category: 'all' });
            } else {
              openQuickLog();
            }
          }}
        />
      ) : (
        <div>
          <div
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginBottom: '10px',
              paddingLeft: '2px',
            }}
          >
            Showing {childMoments.length} {childMoments.length === 1 ? 'moment' : 'moments'}
          </div>
          {childMoments.map((moment) => (
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
