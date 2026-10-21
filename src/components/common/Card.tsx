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
    lg: { padding: '20px 22px' },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        };
      case 'muted':
        return {
          backgroundColor: 'var(--surface-subtle)',
          border: '1px solid var(--border-subtle)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid var(--accent)',
        };
      case 'flat':
        return {
          backgroundColor: 'transparent',
          border: '1px solid var(--border)',
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        transition: 'border-color 0.16s ease, background-color 0.16s ease',
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
