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
  color = 'var(--accent)',
  variant = 'subtle',
  size = 'md',
  icon,
  style,
}) => {
  const isSubtle = variant === 'subtle';

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { padding: '2px 8px', fontSize: '0.74rem', borderRadius: 'var(--radius-sm)' }
      : { padding: '3px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' };

  const variantStyle: React.CSSProperties = isSubtle
    ? {
        backgroundColor: `color-mix(in srgb, ${color} 14%, var(--surface))`,
        color: color,
        border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
      }
    : {
        backgroundColor: color,
        color: 'var(--button-text)',
      };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 500,
        lineHeight: 1.25,
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
