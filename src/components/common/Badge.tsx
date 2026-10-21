import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'subtle' | 'solid' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'var(--lc-secondary)',
  variant = 'subtle',
  size = 'md',
  icon,
  style,
}) => {
  const isSubtle = variant === 'subtle';

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { padding: '2px 8px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }
      : { padding: '4px 10px', fontSize: '0.825rem', borderRadius: 'var(--radius-sm)' };

  const variantStyle: React.CSSProperties = isSubtle
    ? {
        backgroundColor: `color-mix(in srgb, ${color} 14%, var(--lc-surface))`,
        color: color,
        border: `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
      }
    : {
        backgroundColor: color,
        color: '#FFFFFF',
      };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.01em',
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};
