import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 20px',
        textAlign: 'center',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--lc-surface-card)',
        border: '1.5px dashed var(--lc-border)',
        margin: '16px 0',
      }}
      className="animate-fade-in"
    >
      {icon && (
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--lc-surface-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
            color: 'var(--lc-secondary)',
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: 'var(--lc-text-primary)',
          marginBottom: '6px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--lc-text-secondary)',
          maxWidth: '320px',
          lineHeight: 1.45,
          marginBottom: actionLabel ? '20px' : '0px',
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="accent" size="md" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
