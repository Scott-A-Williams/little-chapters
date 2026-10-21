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
  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? {
          padding: '3px 8px',
          fontSize: '0.74rem',
          borderRadius: 'var(--radius-sm)',
        }
      : {
          padding: '4px 10px',
          fontSize: '0.8rem',
          borderRadius: 'var(--radius-sm)',
        };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'subtle':
        return {
          backgroundColor: `color-mix(in srgb, ${color} 14%, var(--surface))`,
          color,
          border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
        };

      case 'solid':
        return {
          backgroundColor: color,
          color: 'var(--button-text)',
          border: `1px solid ${color}`,
        };

      case 'outline':
        return {
          backgroundColor: 'transparent',
          color,
          border: `1px solid ${color}`,
        };

      default:
        return {};
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        ...sizeStyle,
        ...getVariantStyle(),
        ...style,
      }}
    >
      {icon && (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};
