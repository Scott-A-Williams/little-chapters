import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = '90vh',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      className="animate-fade-in"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.42)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
          maxHeight,
          backgroundColor: 'var(--surface)',
          color: 'var(--text-primary)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          borderBottom: 'none',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
          paddingBottom: 'calc(var(--sab) + 12px)',
        }}
        className="animate-slide-up"
      >
        {/* Grabber */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px',
            paddingBottom: '4px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '4px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--border)',
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '10px 20px 14px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ minWidth: 0 }}>
            {title && (
              <h2
                id="bottom-sheet-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.45,
                  color: 'var(--text-secondary)',
                  margin: '3px 0 0',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            style={{
              flexShrink: 0,
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--surface-subtle)',
              color: 'var(--text-secondary)',
              transition: 'background-color 0.16s ease, color 0.16s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          style={{
            overflowY: 'auto',
            padding: '16px 20px',
            flex: 1,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
