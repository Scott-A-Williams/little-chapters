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
        padding: '40px 22px',
        textAlign: 'center',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--surface-elevated)',
        border: '1px dashed var(--border)',
        boxShadow: 'var(--shadow-sm)',
        margin: '16px 0',
      }}
      className="animate-fade-in"
    >
      {icon && (
        <div
          style={{
            width: '58px',
            height: '58px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: 'var(--accent-strong)',
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.25rem',
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
          marginBottom: '7px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          maxWidth: '330px',
          lineHeight: 1.5,
          marginBottom: actionLabel ? '20px' : '0',
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          variant="accent"
          size="md"
          icon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
