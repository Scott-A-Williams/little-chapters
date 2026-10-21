import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'muted' | 'accent' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className = '',
  style,
  ...props
}) => {
  const paddingStyles: Record<'none' | 'sm' | 'md' | 'lg', React.CSSProperties> = {
    none: { padding: '0px' },
    sm: { padding: '12px 14px' },
    md: { padding: '16px 18px' },
    lg: { padding: '22px 24px' },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: 'var(--lc-surface-card)',
          border: '1px solid var(--lc-border)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--lc-surface-card)',
          border: '1px solid var(--lc-border-subtle)',
          boxShadow: 'var(--shadow-md)',
        };
      case 'muted':
        return {
          backgroundColor: 'var(--lc-surface-muted)',
          border: '1px solid var(--lc-border-subtle)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--lc-surface-card)',
          border: '1.5px solid var(--lc-secondary)',
          boxShadow: '0 4px 14px var(--lc-ring)',
        };
      case 'flat':
        return {
          backgroundColor: 'transparent',
          border: '1px solid var(--lc-border)',
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        cursor: interactive ? 'pointer' : 'default',
        ...paddingStyles[padding],
        ...getVariantStyles(),
        ...style,
      }}
      className={`lc-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
