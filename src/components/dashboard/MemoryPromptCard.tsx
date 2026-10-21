import React, { useMemo } from 'react';
import { Card } from '../common/Card';
import { useMoments } from '../../context/MomentContext';
import { useChild } from '../../context/ChildContext';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

const PROMPTS = [
  'What made your little one smile or giggle out loud today?',
  'Notice the little things: how do they like to be held to sleep right now?',
  'Did they make a sweet new sound or babble something funny today?',
  'What is their favourite song, toy, or silly game this week?',
  'Record a small moment of calm connection you shared today.',
  'What funny expression or face did they make today that you never want to forget?',
];

export const MemoryPromptCard: React.FC = () => {
  const { openQuickLog } = useMoments();
  const { activeChild } = useChild();

  const promptText = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    return PROMPTS[dayOfYear % PROMPTS.length];
  }, []);

  return (
    <Card
      variant="elevated"
      padding="md"
      style={{
        marginBottom: '20px',
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--lc-accent) 12%, var(--lc-surface-card)) 0%, var(--lc-surface-card) 100%)',
        border: '1.5px solid color-mix(in srgb, var(--lc-accent) 35%, transparent)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'color-mix(in srgb, var(--lc-accent) 22%, transparent)',
            color: 'var(--lc-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Sparkles size={18} color="var(--lc-secondary)" />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--lc-text-secondary)',
              marginBottom: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Daily Memory Prompt</span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.02rem',
              fontWeight: 600,
              color: 'var(--lc-text-primary)',
              lineHeight: 1.35,
              marginBottom: '10px',
            }}
          >
            {promptText}
          </p>

          <button
            onClick={() => openQuickLog('memory')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--lc-secondary)',
              padding: 0,
            }}
          >
            <Heart size={14} />
            <span>Write for {activeChild?.name || 'baby'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
};
