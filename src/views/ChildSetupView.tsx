import React, { useMemo, useState } from 'react';
import { CalendarDays, Ruler, Scale, UserRound } from 'lucide-react';
import { useChild } from '../context/ChildContext';

const calculateAge = (dateOfBirth: string): string => {
  if (!dateOfBirth) return '';

  const dob = new Date(`${dateOfBirth}T00:00:00`);
  const today = new Date();

  if (Number.isNaN(dob.getTime()) || dob > today) {
    return '';
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();

  if (today.getDate() < dob.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    if (months === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} old`;
    }

    return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${
      months === 1 ? 'month' : 'months'
    } old`;
  }

  return `${months} ${months === 1 ? 'month' : 'months'} old`;
};

export const ChildSetupView: React.FC = () => {
  const { addChild } = useChild();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const age = useMemo(
    () => calculateAge(dateOfBirth),
    [dateOfBirth]
  );

  const canSubmit = name.trim().length > 0 && !saving;

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!canSubmit) return;

    setSaving(true);

    try {
      await addChild({
        name: name.trim(),
        dateOfBirth: dateOfBirth || undefined,
        heightCm: height ? Number(height) : undefined,
        weightKg: weight ? Number(weight) : undefined,
        pronouns: pronouns.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '32px 20px 100px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
          >
            <UserRound size={28} />
          </div>

          <p
            style={{
              margin: '0 0 6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Welcome to Little Chapters
          </p>

          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'var(--text-primary)',
            }}
          >
            Tell us about your little one
          </h1>

          <p
            style={{
              margin: '10px auto 0',
              maxWidth: '440px',
              fontSize: '0.94rem',
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
            }}
          >
            Start with their name. Everything else is optional and
            can be added or changed later.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '22px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Name */}
            <div style={{ marginBottom: '22px' }}>
              <label
                htmlFor="child-name"
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                Name <span style={{ color: 'var(--danger)' }}>*</span>
              </label>

              <input
                id="child-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Their name"
                autoComplete="off"
                autoFocus
                style={inputStyle}
              />
            </div>

            {/* Date of birth */}
            <div style={{ marginBottom: '22px' }}>
              <label
                htmlFor="child-dob"
                style={labelStyle}
              >
                Date of birth
              </label>

              <div style={{ position: 'relative' }}>
                <CalendarDays
                  size={17}
                  style={iconStyle}
                />

                <input
                  id="child-dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) =>
                    setDateOfBirth(event.target.value)
                  }
                  max={new Date().toISOString().split('T')[0]}
                  style={{
                    ...inputStyle,
                    paddingLeft: '44px',
                  }}
                />
              </div>

              {age && (
                <div
                  style={{
                    marginTop: '7px',
                    fontSize: '0.82rem',
                    color: 'var(--accent)',
                    fontWeight: 500,
                  }}
                >
                  {age}
                </div>
              )}
            </div>

            {/* Measurements */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '22px',
              }}
            >
              <div>
                <label
                  htmlFor="child-height"
                  style={labelStyle}
                >
                  Height
                </label>

                <div style={{ position: 'relative' }}>
                  <Ruler
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="child-height"
                    type="number"
                    min="0"
                    step="0.1"
                    value={height}
                    onChange={(event) =>
                      setHeight(event.target.value)
                    }
                    placeholder="e.g. 72"
                    style={{
                      ...inputStyle,
                      paddingLeft: '44px',
                      paddingRight: '48px',
                    }}
                  />

                  <span style={unitStyle}>cm</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="child-weight"
                  style={labelStyle}
                >
                  Weight
                </label>

                <div style={{ position: 'relative' }}>
                  <Scale
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="child-weight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={weight}
                    onChange={(event) =>
                      setWeight(event.target.value)
                    }
                    placeholder="e.g. 8.5"
                    style={{
                      ...inputStyle,
                      paddingLeft: '44px',
                      paddingRight: '48px',
                    }}
                  />

                  <span style={unitStyle}>kg</span>
                </div>
              </div>
            </div>

            {/* Pronouns */}
            <div style={{ marginBottom: '22px' }}>
              <label
                htmlFor="child-pronouns"
                style={labelStyle}
              >
                Pronouns
              </label>

              <input
                id="child-pronouns"
                type="text"
                value={pronouns}
                onChange={(event) =>
                  setPronouns(event.target.value)
                }
                placeholder="Optional"
                style={inputStyle}
              />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="child-notes"
                style={labelStyle}
              >
                Anything else?
              </label>

              <textarea
                id="child-notes"
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Optional notes about your little one"
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '86px',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: '100%',
                minHeight: '48px',
                border: 0,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--button)',
                color: 'var(--button-text)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                opacity: canSubmit ? 1 : 0.5,
                transition: 'all 0.16s ease',
              }}
            >
              {saving ? 'Creating profile…' : 'Create profile'}
            </button>
          </div>

          <p
            style={{
              margin: '14px 0 0',
              textAlign: 'center',
              fontSize: '0.76rem',
              color: 'var(--text-muted)',
            }}
          >
            You can add or update these details whenever you like.
          </p>
        </form>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '7px',
  fontSize: '0.86rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  minHeight: '44px',
  padding: '10px 13px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--surface)',
  color: 'var(--text-primary)',
  fontSize: '0.92rem',
  outline: 'none',
  fontFamily: 'inherit',
};

const iconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--text-muted)',
  pointerEvents: 'none',
};

const unitStyle: React.CSSProperties = {
  position: 'absolute',
  right: '13px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '0.78rem',
  color: 'var(--text-muted)',
  pointerEvents: 'none',
};
