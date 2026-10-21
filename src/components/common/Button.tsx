import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    transition: 'all 0.18s ease',
    userSelect: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
  };

  const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
    sm: {
      padding: '8px 14px',
      fontSize: '0.875rem',
      minHeight: '38px',
    },
    md: {
      padding: '11px 20px',
      fontSize: '0.975rem',
      minHeight: '46px', // Mobile touch target friendly
    },
    lg: {
      padding: '14px 26px',
      fontSize: '1.05rem',
      minHeight: '52px',
      borderRadius: 'var(--radius-lg)',
    },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--lc-primary)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--lc-surface-muted)',
          color: 'var(--lc-text-primary)',
          border: '1px solid var(--lc-border)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--lc-secondary)',
          color: '#FFFFFF',
          boxShadow: '0 3px 10px rgba(0, 155, 193, 0.25)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--lc-primary)',
          border: '1.5px solid var(--lc-primary)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--lc-text-secondary)',
        };
      case 'danger':
        return {
          backgroundColor: 'rgba(200, 76, 68, 0.12)',
          color: 'var(--lc-error)',
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
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};
