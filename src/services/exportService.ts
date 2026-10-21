import { Moment } from '../types/moment';
import { Child } from '../types/child';

export class ExportService {
  /**
   * Generates a portable JSON backup of children and moments.
   */
  exportJSON(children: Child[], moments: Moment[]): void {
    const backupData = {
      app: 'Little Chapters',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      children,
      moments,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    this.triggerDownload(blob, `little-chapters-backup-${new Date().toISOString().slice(0, 10)}.json`);
  }

  /**
   * Generates a clean CSV file of all recorded moments.
   */
  exportCSV(moments: Moment[], children: Child[]): void {
    const childMap = new Map(children.map((c) => [c.id, c.name]));
    const headers = ['Date', 'Time', 'Child', 'Category', 'Title', 'Notes', 'Tags', 'Created By'];

    const rows = moments.map((m) => {
      const dt = new Date(m.dateTime);
      const dateStr = dt.toLocaleDateString();
      const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const childName = childMap.get(m.childId) || 'Unknown';
      const cleanNotes = (m.notes || '').replace(/"/g, '""');
      const cleanTags = (m.tags || []).join('; ');

      return [
        `"${dateStr}"`,
        `"${timeStr}"`,
        `"${childName}"`,
        `"${m.category}"`,
        `"${m.title.replace(/"/g, '""')}"`,
        `"${cleanNotes}"`,
        `"${cleanTags}"`,
        `"${m.createdBy}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, `little-chapters-moments-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const exportService = new ExportService();
