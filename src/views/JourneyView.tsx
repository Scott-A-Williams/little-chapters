import React from 'react';
import { useMoments } from '../context/MomentContext';
import { useChild } from '../context/ChildContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MomentCard } from '../components/moment/MomentCard';
import { Award, Sparkles, BookOpen, Plus, Heart } from 'lucide-react';

export const JourneyView: React.FC = () => {
  const { moments, openQuickLog } = useMoments();
  const { activeChild } = useChild();

  const childMoments = moments.filter(
    (m) => !activeChild || m.childId === activeChild.id
  );

  const milestoneMoments = childMoments.filter(
    (m) => m.category === 'milestone' || m.category === 'first'
  );

  // Suggested Chapters based on child's development
  const suggestedChapters = [
    {
      title: 'Chapter 1: The Arrival & Fourth Trimester',
      subtitle: '0 to 3 months',
      description: 'First cuddles, newborn days, sleepless nights, and the first social smiles.',
      isCurrent: true,
    },
    {
      title: 'Chapter 2: Wonder & Discoveries',
      subtitle: '3 to 6 months',
      description: 'Rolling over, babbling, giggling, and reaching out for the world.',
      isCurrent: false,
    },
    {
      title: 'Chapter 3: Little Explorer & First Tastes',
      subtitle: '6 to 12 months',
      description: 'Weaning adventures, sitting tall, crawling, and finding their voice.',
      isCurrent: false,
    },
  ];

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
          {activeChild ? `${activeChild.name}'s Journey` : 'Journey'}
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Chapters of growth, unforgettable firsts, and precious milestones
        </p>
      </div>

      {/* Chapters Preview Carousel */}
      <div style={{ marginBottom: '24px' }}>
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
              fontFamily: 'var(--font-sans)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <BookOpen size={16} color="var(--accent)" />
            Little Chapters
          </h3>
          <Badge size="sm">
            Automatic
          </Badge>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {suggestedChapters.map((ch) => (
            <Card
              key={ch.title}
              variant="default"
              padding="md"
              style={{
                borderLeft: ch.isCurrent ? '3px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                  }}
                >
                  {ch.subtitle}
                </span>
                {ch.isCurrent && (
                  <Badge size="sm">
                    Current Chapter
                  </Badge>
                )}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}
              >
                {ch.title}
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {ch.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Milestones & Firsts Section */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Award size={16} color="var(--accent)" />
              Milestones & Firsts
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {milestoneMoments.length} recorded
            </span>
          </div>

          <Button
            size="sm"
            variant="accent"
            icon={<Plus size={14} />}
            onClick={() => openQuickLog('milestone')}
          >
            Record Milestone
          </Button>
        </div>

        {milestoneMoments.length === 0 ? (
          <Card variant="muted" padding="lg" style={{ textAlign: 'center' }}>
            <Sparkles size={24} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              No milestones recorded yet
            </h4>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                maxWidth: '280px',
                margin: '0 auto 14px',
                lineHeight: 1.45,
              }}
            >
              Record their first smile, roll, tooth, or steps to look back on forever.
            </p>
            <Button
              size="md"
              variant="primary"
              icon={<Heart size={15} />}
              onClick={() => openQuickLog('milestone')}
            >
              Record First Milestone
            </Button>
          </Card>
        ) : (
          <div>
            {milestoneMoments.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                childName={activeChild?.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
