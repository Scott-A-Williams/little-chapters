import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    transition:
      'background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
    userSelect: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  const sizeStyles: Record<
    'sm' | 'md' | 'lg',
    React.CSSProperties
  > = {
    sm: {
      padding: '8px 14px',
      fontSize: '0.85rem',
      minHeight: '38px',
    },
    md: {
      padding: '10px 18px',
      fontSize: '0.94rem',
      minHeight: '44px',
    },
    lg: {
      padding: '13px 24px',
      fontSize: '1rem',
      minHeight: '50px',
      borderRadius: 'var(--radius-lg)',
    },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--button)',
          color: 'var(--button-text)',
          boxShadow: 'var(--shadow-sm)',
        };

      case 'secondary':
        return {
          backgroundColor: 'var(--surface-subtle)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border)',
        };

      case 'accent':
        return {
          backgroundColor: 'var(--accent)',
          color: 'var(--button-text)',
          boxShadow: 'var(--shadow-sm)',
        };

      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--accent-strong)',
          borderColor: 'var(--accent)',
        };

      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
        };

      case 'danger':
        return {
          backgroundColor: 'color-mix(in srgb, var(--danger) 15%, transparent)',
          color: 'var(--danger)',
          borderColor: 'color-mix(in srgb, var(--danger) 25%, transparent)',
        };

      default:
        return {};
    }
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...getVariantStyles(),
        ...style,
      }}
      disabled={disabled}
      className={`lc-btn lc-btn-${variant} ${className}`}
      {...props}
    >
      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}

      {children}
    </button>
  );
};
