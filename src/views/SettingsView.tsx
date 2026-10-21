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
            fontFamily: 'var(--font-serif)',
            fontSize: '1.65rem',
            fontWeight: 600,
            color: 'var(--lc-text-primary)',
            marginBottom: '4px',
          }}
        >
          Settings & Journal
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--lc-text-secondary)' }}>
          Themes, data export, profiles, and family preferences
        </p>
      </div>

      {/* Child Profile Info */}
      <Card variant="default" padding="md" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--lc-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            {activeChild ? activeChild.name[0] : 'L'}
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
              {activeChild ? activeChild.name : 'No active child'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--lc-text-muted)' }}>
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
      <Card variant="default" padding="lg" style={{ marginBottom: '18px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--lc-text-primary)',
            marginBottom: '16px',
          }}
        >
          Theme & Aesthetic
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <ModeToggle />
        </div>

        <ThemeSelector />
      </Card>

      {/* Data Export & Backup */}
      <Card variant="default" padding="lg" style={{ marginBottom: '18px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--lc-text-primary)',
            marginBottom: '6px',
          }}
        >
          Data Ownership & Backup
        </h3>
        <p
          style={{
            fontSize: '0.86rem',
            color: 'var(--lc-text-secondary)',
            marginBottom: '16px',
          }}
        >
          Your family memories are yours forever. Download clean spreadsheets or complete backups anytime.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="secondary"
            fullWidth
            icon={<FileSpreadsheet size={16} color="var(--lc-secondary)" />}
            onClick={handleExportCSV}
          >
            Export All Moments to CSV
          </Button>

          <Button
            variant="secondary"
            fullWidth
            icon={<Download size={16} color="var(--lc-secondary)" />}
            onClick={handleExportJSON}
          >
            Download Full JSON Backup
          </Button>
        </div>
      </Card>

      {/* Cloud & Architecture Status */}
      <Card variant="muted" padding="md" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <ShieldCheck size={20} color="var(--lc-secondary)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
              Cloud & Storage Architecture
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--lc-text-secondary)',
                marginTop: '2px',
                lineHeight: 1.4,
              }}
            >
              {firebaseStatus.statusText}
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile App & Future Store Packaging */}
      <Card variant="default" padding="md" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Smartphone size={20} color="var(--lc-secondary)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--lc-text-primary)' }}>
              App Store & PWA Readiness
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--lc-text-secondary)',
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
            color: 'var(--lc-text-muted)',
            marginBottom: '10px',
          }}
        >
          Testing with parent cohorts? You can restore sample moments anytime.
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={<RotateCcw size={14} />}
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
          marginTop: '24px',
          fontSize: '0.75rem',
          color: 'var(--lc-text-muted)',
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
