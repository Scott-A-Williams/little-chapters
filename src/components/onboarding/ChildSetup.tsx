import React, { useState } from 'react';
import { useChild } from '../../context/ChildContext';
import { Card } from '../common/Card';
import { Baby, Calendar, Scale, Ruler, Heart, ArrowRight } from 'lucide-react';

export const ChildSetup: React.FC = () => {
  const { addChild } = useChild();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [relationship, setRelationship] = useState('');
  const [gender, setGender] = useState<
    'female' | 'male' | 'other' | 'prefer_not_to_say' | ''
  >('');
  const [birthWeightKg, setBirthWeightKg] = useState('');
  const [birthHeightCm, setBirthHeightCm] = useState('');
  const [saving, setSaving] = useState(false);

  const calculateAge = (date: string) => {
    if (!date) return '';

    const dob = new Date(`${date}T00:00:00`);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (today.getDate() < dob.getDate()) {
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}${
        months > 0 ? ` ${months} ${months === 1 ? 'month' : 'months'}` : ''
      }`;
    }

    return `${months} ${months === 1 ? 'month' : 'months'}`;
  };

  const age = calculateAge(birthDate);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !birthDate) return;

    try {
      setSaving(true);

      await addChild({
        name: name.trim(),
        birthDate,
        nickname: nickname.trim() || undefined,
        relationship: relationship || undefined,
        gender: gender || undefined,
        birthWeightKg: birthWeightKg
          ? Number(birthWeightKg)
          : undefined,
        birthHeightCm: birthHeightCm
          ? Number(birthHeightCm)
          : undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: 'var(--background)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              margin: '0 auto 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
          >
            <Baby size={27} />
          </div>

          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Your little chapter
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.25rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Tell us about your little one
          </h1>

          <p
            style={{
              margin: '12px auto 0',
              maxWidth: '480px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            Start with the basics. You can add or change anything later.
          </p>
        </div>

        <Card variant="default" padding="lg">
          <form onSubmit={handleSubmit}>
            {/* Essentials */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <label>
                <span className="lc-form-label">
                  Name <span className="lc-required">*</span>
                </span>

                <input
                  className="lc-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya"
                  autoFocus
                  required
                />
              </label>

              <label>
                <span className="lc-form-label">
                  Date of birth <span className="lc-required">*</span>
                </span>

                <div style={{ position: 'relative' }}>
                  <Calendar
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                      pointerEvents: 'none',
                    }}
                  />

                  <input
                    className="lc-input"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                </div>

                {age && (
                  <div
                    style={{
                      marginTop: '7px',
                      fontSize: '0.8rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                    }}
                  >
                    {age} old
                  </div>
                )}
              </label>
            </div>

            {/* Optional information */}
            <div
              style={{
                marginTop: '28px',
                paddingTop: '24px',
                borderTop: '1px solid var(--lc-border-subtle)',
              }}
            >
              <div style={{ marginBottom: '18px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  A little more, if you want
                </h2>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    margin: '5px 0 0',
                  }}
                >
                  All of these are completely optional.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <label>
                  <span className="lc-form-label">Nickname</span>
                  <input
                    className="lc-input"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="What do you call them?"
                  />
                </label>

                <label>
                  <span className="lc-form-label">Relationship</span>
                  <select
                    className="lc-input"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Child">Child</option>
                    <option value="Niece">Niece</option>
                    <option value="Nephew">Nephew</option>
                    <option value="Grandchild">Grandchild</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  <span className="lc-form-label">Gender</span>
                  <select
                    className="lc-input"
                    value={gender}
                    onChange={(e) =>
                      setGender(
                        e.target.value as
                          | 'female'
                          | 'male'
                          | 'other'
                          | 'prefer_not_to_say'
                          | ''
                      )
                    }
                  >
                    <option value="">Prefer not to say</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  <span className="lc-form-label">Birth weight</span>
                  <div style={{ position: 'relative' }}>
                    <Scale
                      size={17}
                      style={{
                        position: 'absolute',
                        left: '13px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none',
                      }}
                    />
                    <input
                      className="lc-input"
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={birthWeightKg}
                      onChange={(e) => setBirthWeightKg(e.target.value)}
                      placeholder="e.g. 3.42 kg"
                      style={{ paddingLeft: '40px' }}
                    />
                  </div>
                </label>

                <label>
                  <span className="lc-form-label">Birth height</span>
                  <div style={{ position: 'relative' }}>
                    <Ruler
                      size={17}
                      style={{
                        position: 'absolute',
                        left: '13px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none',
                      }}
                    />
                    <input
                      className="lc-input"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={birthHeightCm}
                      onChange={(e) => setBirthHeightCm(e.target.value)}
                      placeholder="e.g. 51 cm"
                      style={{ paddingLeft: '40px' }}
                    />
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !birthDate || saving}
              className="lc-primary-button"
              style={{
                width: '100%',
                marginTop: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {saving ? 'Creating chapter...' : 'Start their little chapter'}
              {!saving && <ArrowRight size={17} />}
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '14px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <Heart size={13} />
              You can add the details later
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
