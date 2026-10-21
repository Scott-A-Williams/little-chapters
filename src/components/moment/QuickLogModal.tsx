import React, { useState, useEffect } from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { Button } from '../common/Button';
import { MOMENT_CATEGORIES, CATEGORY_MAP } from '../../services/categoryMeta';
import { MomentCategory, Moment } from '../../types/moment';
import { MomentCategoryIcon } from './MomentCategoryIcon';
import { useMoments } from '../../context/MomentContext';
import { useChild } from '../../context/ChildContext';
import { Sparkles, ChevronDown, ChevronUp, Plus, Check } from 'lucide-react';

export const QuickLogModal: React.FC = () => {
  const { isQuickLogOpen, closeQuickLog, preselectedCategory, addMoment } = useMoments();
  const { activeChild, children } = useChild();

  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<MomentCategory>('memory');
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync active child and preselected category on open
  useEffect(() => {
    if (isQuickLogOpen) {
      if (activeChild) setSelectedChildId(activeChild.id);
      const cat = preselectedCategory || 'memory';
      setSelectedCategory(cat);

      // Pre-fill default title if category has a first preset
      const meta = CATEGORY_MAP[cat];
      if (meta?.quickPresets && meta.quickPresets.length > 0) {
        setTitle(meta.quickPresets[0]);
      } else {
        setTitle('');
      }

      setNotes('');
      setTags([]);
      setShowAdvanced(false);
    }
  }, [isQuickLogOpen, activeChild, preselectedCategory]);

  const currentMeta = CATEGORY_MAP[selectedCategory];

  const handleCategorySelect = (cat: MomentCategory) => {
    setSelectedCategory(cat);
    const meta = CATEGORY_MAP[cat];
    if (meta?.quickPresets && meta.quickPresets.length > 0) {
      setTitle(meta.quickPresets[0]);
    } else {
      setTitle('');
    }
  };

  const handlePresetTap = (preset: string) => {
    setTitle(preset);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);

      const momentData: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'> = {
        childId: selectedChildId || activeChild?.id || 'default',
        category: selectedCategory,
        title: title.trim(),
        notes: notes.trim() || undefined,
        tags: tags,
        photos: [],
        createdBy: 'Parent',
        dateTime: new Date().toISOString(),
      };

      // Add simple sensible structured data depending on preset/category
      if (selectedCategory === 'feeding') {
        const isBreast = title.toLowerCase().includes('breast');
        const isBottle = title.toLowerCase().includes('bottle');
        momentData.categoryData = {
          feeding: {
            feedType: isBreast ? 'breast' : isBottle ? 'bottle_formula' : 'solids',
            breastSide: title.toLowerCase().includes('left')
              ? 'left'
              : title.toLowerCase().includes('right')
              ? 'right'
              : 'both',
            durationMinutes: isBreast ? 15 : undefined,
          },
        };
      } else if (selectedCategory === 'nappy_toileting') {
        const isWet = title.toLowerCase().includes('wet');
        const isDirty = title.toLowerCase().includes('dirty');
        momentData.categoryData = {
          nappy: {
            condition: isWet && isDirty ? 'both' : isDirty ? 'dirty' : 'wet',
          },
        };
      } else if (selectedCategory === 'quote') {
        momentData.categoryData = {
          quote: {
            quoteText: title,
            context: notes || undefined,
          },
        };
      }

      await addMoment(momentData);
      closeQuickLog();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomSheet
      isOpen={isQuickLogOpen}
      onClose={closeQuickLog}
      title="Capture a Moment"
      subtitle={activeChild ? `For ${activeChild.name}` : undefined}
    >
      <form onSubmit={handleSubmit}>
        {/* Child selector if multiple children exist */}
        {children.length > 1 && (
          <div style={{ marginBottom: '14px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--lc-text-secondary)',
                marginBottom: '6px',
              }}
            >
              Child
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {children.map((c) => {
                const isSelected = c.id === selectedChildId;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setSelectedChildId(c.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected
                        ? '2px solid var(--lc-primary)'
                        : '1px solid var(--lc-border)',
                      backgroundColor: isSelected
                        ? 'var(--lc-surface-muted)'
                        : 'var(--lc-surface)',
                      color: isSelected
                        ? 'var(--lc-text-primary)'
                        : 'var(--lc-text-secondary)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    {isSelected && <Check size={14} color="var(--lc-primary)" />}
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Horizontal Scrolling Carousel */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--lc-text-secondary)',
              marginBottom: '6px',
            }}
          >
            Category
          </label>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {MOMENT_CATEGORIES.map((cat) => {
              const isSelected = cat.category === selectedCategory;
              return (
                <button
                  type="button"
                  key={cat.category}
                  onClick={() => handleCategorySelect(cat.category)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected
                      ? `2px solid ${cat.color}`
                      : '1px solid var(--lc-border)',
                    backgroundColor: isSelected
                      ? `color-mix(in srgb, ${cat.color} 15%, var(--lc-surface))`
                      : 'var(--lc-surface-card)',
                    color: isSelected ? cat.color : 'var(--lc-text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.84rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <MomentCategoryIcon
                    category={cat.category}
                    size={16}
                    color={isSelected ? cat.color : 'var(--lc-text-muted)'}
                  />
                  <span>{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1-Tap Quick Choice Presets */}
        {currentMeta?.quickPresets && currentMeta.quickPresets.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--lc-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={13} color="var(--lc-secondary)" />
                Quick 1-Tap Choices
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--lc-text-muted)' }}>
                Tap to select
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentMeta.quickPresets.map((preset) => {
                const isSelected = title === preset;
                return (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => handlePresetTap(preset)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected
                        ? 'var(--lc-primary)'
                        : 'var(--lc-surface-muted)',
                      color: isSelected ? '#FFFFFF' : 'var(--lc-text-primary)',
                      border: isSelected
                        ? '1px solid var(--lc-primary)'
                        : '1px solid var(--lc-border-subtle)',
                      fontSize: '0.88rem',
                      fontWeight: isSelected ? 600 : 500,
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                    }}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Title Input */}
        <div style={{ marginBottom: '14px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--lc-text-secondary)',
              marginBottom: '6px',
            }}
          >
            Title / Activity
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`e.g. ${currentMeta?.label || 'What happened?'}`}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--lc-border)',
              backgroundColor: 'var(--lc-surface)',
              color: 'var(--lc-text-primary)',
              fontSize: '1rem',
              fontWeight: 500,
            }}
            required
          />
        </div>

        {/* Optional Notes */}
        <div style={{ marginBottom: '14px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--lc-text-secondary)',
              marginBottom: '6px',
            }}
          >
            Notes / Details <span style={{ color: 'var(--lc-text-muted)' }}>(Optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any sweet observation, reaction, or details..."
            rows={2}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--lc-border)',
              backgroundColor: 'var(--lc-surface)',
              color: 'var(--lc-text-primary)',
              fontSize: '0.92rem',
              resize: 'none',
              lineHeight: 1.4,
            }}
          />
        </div>

        {/* Progressive Disclosure: Advanced / Tags */}
        <div style={{ marginBottom: '18px' }}>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '8px 0',
              color: 'var(--lc-text-secondary)',
              fontSize: '0.86rem',
              fontWeight: 600,
            }}
          >
            <span>More Options & Tags</span>
            {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdvanced && (
            <div
              style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--lc-surface-muted)',
              }}
              className="animate-fade-in"
            >
              <div style={{ marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--lc-text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  Tags
                </span>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--lc-border)',
                      backgroundColor: 'var(--lc-surface)',
                      color: 'var(--lc-text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--lc-surface)',
                          border: '1px solid var(--lc-border)',
                          fontSize: '0.78rem',
                          color: 'var(--lc-text-primary)',
                        }}
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          style={{ color: 'var(--lc-text-muted)', fontSize: '0.85rem' }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary Save Action */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Moment'}
        </Button>
      </form>
    </BottomSheet>
  );
};
