import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ThemeSelector } from '../components/settings/ThemeSelector';
import { ModeToggle } from '../components/settings/ModeToggle';
import { useMoments } from '../context/MomentContext';
import { useChild } from '../context/ChildContext';
import { exportService } from '../services/exportService';
import { getFirebaseStatus } from '../config/firebase';
import {
  Download,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Info,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { moments, resetDemoData, showFeedback } = useMoments();
  const { children, activeChild } = useChild();

  const firebaseStatus = getFirebaseStatus();

  const handleExportCSV = () => {
    exportService.exportCSV(moments, children);
    showFeedback('Moments exported to CSV');
  };

  const handleExportJSON = () => {
    exportService.exportJSON(children, moments);
    showFeedback('Full journal backup exported to JSON');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '-0.015em',
            marginBottom: '4px',
          }}
        >
          Settings & Journal
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Themes, appearance, family profiles, and backups
        </p>
      </div>

      {/* Child Profile Info */}
      <Card variant="default" padding="md" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              fontWeight: 600,
            }}
          >
            {activeChild ? activeChild.name[0] : 'L'}
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {activeChild ? activeChild.name : 'No active child'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {activeChild?.birthDate
                ? `Born ${new Date(activeChild.birthDate).toLocaleDateString([], {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}`
                : 'Add a child profile in the top menu'}
            </div>
          </div>
        </div>
      </Card>

      {/* Appearance & Themes */}
      <Card variant="default" padding="lg" style={{ marginBottom: '16px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.12rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '14px',
          }}
        >
          Theme & Aesthetic
        </h3>

        <div style={{ marginBottom: '18px' }}>
          <ModeToggle />
        </div>

        <ThemeSelector />
      </Card>

      {/* Data Export & Backup */}
      <Card variant="default" padding="lg" style={{ marginBottom: '16px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.12rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
          }}
        >
          Data Ownership & Backup
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '14px',
            lineHeight: 1.45,
          }}
        >
          Your family memories are yours forever. Download clean spreadsheets or complete backups anytime.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            variant="secondary"
            fullWidth
            icon={<FileSpreadsheet size={15} color="var(--accent)" />}
            onClick={handleExportCSV}
          >
            Export All Moments to CSV
          </Button>

          <Button
            variant="secondary"
            fullWidth
            icon={<Download size={15} color="var(--accent)" />}
            onClick={handleExportJSON}
          >
            Download Full JSON Backup
          </Button>
        </div>
      </Card>

      {/* Cloud & Storage Architecture */}
      <Card variant="muted" padding="md" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Cloud & Storage Architecture
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginTop: '2px',
                lineHeight: 1.4,
              }}
            >
              {firebaseStatus.statusText}
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile App & Packaging Readiness */}
      <Card variant="default" padding="md" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Smartphone size={18} color="var(--accent)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              App Store & PWA Readiness
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginTop: '2px',
                lineHeight: 1.4,
              }}
            >
              Mobile-first responsive architecture ready for testing with parents, Progressive Web App (PWA) installation, and future Google Play / Apple App Store wrapper deployment.
            </div>
          </div>
        </div>
      </Card>

      {/* Demo Reset */}
      <Card variant="flat" padding="md" style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}
        >
          Testing with parent cohorts? You can restore sample moments anytime.
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={<RotateCcw size={13} />}
          onClick={() => {
            if (window.confirm('Reset journal to sample demo moments?')) {
              resetDemoData();
            }
          }}
        >
          Reset Sample Data
        </Button>
      </Card>

      {/* App Info Footer */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.74rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <Info size={12} />
        <span>Little Chapters v0.1.0 • Built with React & Vite</span>
      </div>
    </div>
  );
};
