import React, { useState } from 'react';
import { useChild } from '../../context/ChildContext';
import { useMoments } from '../../context/MomentContext';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, Plus, Sparkles, Check, UserPlus, Palette } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { activeChild, children, setActiveChildId, addChild } = useChild();
  const { feedbackMessage } = useMoments();
  const { themeName, availableThemes, openLookSetup } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddChildOpen, setIsAddChildOpen] = useState<boolean>(false);
  const [newChildName, setNewChildName] = useState<string>('');
  const [newChildBirthDate, setNewChildBirthDate] = useState<string>('');

  const calculateAge = (birthDateStr: string) => {
    try {
      const birth = new Date(birthDateStr);
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 30) {
        return `${Math.max(1, Math.floor(diffDays / 7))} weeks`;
      }
      const months = Math.floor(diffDays / 30.4375);
      if (months < 24) {
        return `${months} months`;
      }
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} years`;
    } catch {
      return '';
    }
  };

  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    await addChild({
      name: newChildName.trim(),
      birthDate: newChildBirthDate || new Date().toISOString().slice(0, 10),
      relationship: 'Child',
    });

    setNewChildName('');
    setNewChildBirthDate('');
    setIsAddChildOpen(false);
    setIsDropdownOpen(false);
  };

  const currentTheme = availableThemes[themeName];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--lc-background)',
          borderBottom: '1px solid var(--lc-border-subtle)',
          paddingTop: 'calc(var(--sat) + 8px)',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px',
          transition: 'background-color 0.25s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          {/* Child Switcher / Avatar */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 8px 4px 4px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--lc-surface)',
                border: '1px solid var(--lc-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--lc-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                {activeChild ? activeChild.name[0] : 'L'}
              </div>

              <div style={{ textAlign: 'left', marginRight: '2px' }}>
                <div
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'var(--lc-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{activeChild ? activeChild.name : 'Select Child'}</span>
                  <ChevronDown size={14} color="var(--lc-text-secondary)" />
                </div>
                {activeChild && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--lc-text-muted)' }}>
                    {calculateAge(activeChild.birthDate)}
                  </div>
                )}
              </div>
            </button>

            {/* Child Dropdown Menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  width: '240px',
                  backgroundColor: 'var(--lc-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--lc-border)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 200,
                }}
                className="animate-slide-up"
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--lc-text-muted)',
                    padding: '6px 10px',
                  }}
                >
                  Family Children
                </div>

                {children.map((child) => {
                  const isSelected = child.id === activeChild?.id;
                  return (
                    <button
                      key={child.id}
                      onClick={() => {
                        setActiveChildId(child.id);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected
                          ? 'var(--lc-surface-muted)'
                          : 'transparent',
                        color: 'var(--lc-text-primary)',
                        textAlign: 'left',
                        marginBottom: '4px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--lc-secondary)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                          }}
                        >
                          {child.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                            {child.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--lc-text-muted)' }}>
                            {calculateAge(child.birthDate)}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="var(--lc-secondary)" />}
                    </button>
                  );
                })}

                <div
                  style={{
                    borderTop: '1px solid var(--lc-border-subtle)',
                    marginTop: '6px',
                    paddingTop: '6px',
                  }}
                >
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsAddChildOpen(true);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--lc-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Another Child</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      openLookSetup();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--lc-text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <Palette size={16} />
                    <span>Personalise Look...</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Look Pill & App Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quick Look Customiser Pill */}
            <button
              onClick={openLookSetup}
              title="Personalise your look"
              aria-label="Choose look"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--lc-surface)',
                border: '1px solid var(--lc-border)',
                boxShadow: 'var(--shadow-sm)',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--lc-text-primary)',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--lc-primary)',
                }}
              />
              <span>{currentTheme?.name.split('—')[0].trim()}</span>
            </button>

            {/* Brand Title */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: '1.02rem',
                  color: 'var(--lc-primary)',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Little Chapters</span>
                <Sparkles size={12} color="var(--lc-secondary)" />
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--lc-text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                Family Journal
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Feedback Pill */}
        {feedbackMessage && (
          <div
            style={{
              maxWidth: '680px',
              margin: '8px auto 0',
              padding: '8px 14px',
              backgroundColor: 'var(--lc-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-md)',
            }}
            className="animate-slide-up"
          >
            <Check size={14} color="var(--lc-secondary)" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </header>

      {/* Add Child Modal */}
      <Modal
        isOpen={isAddChildOpen}
        onClose={() => setIsAddChildOpen(false)}
        title="Add Child Profile"
      >
        <form onSubmit={handleCreateChild}>
          <div style={{ marginBottom: '14px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--lc-text-secondary)',
                marginBottom: '6px',
              }}
            >
              Child's Name
            </label>
            <input
              type="text"
              required
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="e.g. Leo"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--lc-border)',
                backgroundColor: 'var(--lc-surface)',
                color: 'var(--lc-text-primary)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--lc-text-secondary)',
                marginBottom: '6px',
              }}
            >
              Birth Date
            </label>
            <input
              type="date"
              value={newChildBirthDate}
              onChange={(e) => setNewChildBirthDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--lc-border)',
                backgroundColor: 'var(--lc-surface)',
                color: 'var(--lc-text-primary)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth size="md" icon={<UserPlus size={16} />}>
            Create Profile
          </Button>
        </form>
      </Modal>
    </>
  );
};
