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
          backgroundColor: 'var(--background)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingTop: 'calc(var(--sat) + 8px)',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px',
          transition: 'background-color 0.22s ease',
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
                gap: '8px',
                padding: '4px 10px 4px 4px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {activeChild ? activeChild.name[0] : 'L'}
              </div>

              <div style={{ textAlign: 'left', marginRight: '2px' }}>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{activeChild ? activeChild.name : 'Select Child'}</span>
                  <ChevronDown size={13} color="var(--text-secondary)" />
                </div>
                {activeChild && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
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
                  backgroundColor: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 200,
                }}
                className="animate-slide-up"
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    color: 'var(--text-muted)',
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
                          ? 'var(--surface-subtle)'
                          : 'transparent',
                        color: 'var(--text-primary)',
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
                            backgroundColor: 'var(--accent-soft)',
                            color: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {child.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>
                            {child.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {calculateAge(child.birthDate)}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check size={15} color="var(--accent)" />}
                    </button>
                  );
                })}

                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
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
                      color: 'var(--accent)',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                    }}
                  >
                    <Plus size={15} />
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
                      color: 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                    }}
                  >
                    <Palette size={15} />
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
                padding: '5px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                fontSize: '0.76rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                }}
              />
              <span>{currentTheme?.name.split('—')[0].trim()}</span>
            </button>

            {/* Brand Title */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: '1.08rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Little Chapters</span>
                <Sparkles size={11} color="var(--accent)" />
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.01em',
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
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.84rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-md)',
            }}
            className="animate-slide-up"
          >
            <Check size={14} color="var(--accent)" />
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
                fontWeight: 500,
                color: 'var(--text-secondary)',
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
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--text-primary)',
                fontSize: '0.94rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
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
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--text-primary)',
                fontSize: '0.94rem',
              }}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth size="md" icon={<UserPlus size={15} />}>
            Create Profile
          </Button>
        </form>
      </Modal>
    </>
  );
};
