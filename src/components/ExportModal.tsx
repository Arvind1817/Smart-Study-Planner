import React, { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'export' | 'sync';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const [synced, setSynced] = useState(false);

  if (!isOpen) return null;

  const handleDownloadReport = () => {
    // Generate CSV string
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Subject,Hours,Percentage,Assignments,Status\n' +
      'Computer Science,10.5,43%,3,On Track\n' +
      'Mathematics,7.0,28%,2,On Track\n' +
      'Physics,4.5,18%,2,Needs Review\n' +
      'Literature,2.5,11%,1,Pending\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'StudyFlow_Academic_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleCalendarSync = () => {
    setSynced(true);
    setTimeout(() => {
      setSynced(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden p-5 flex flex-col text-center">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 font-bold text-sm text-primary">
            <span className="material-symbols-outlined text-[20px]">
              {type === 'sync' ? 'sync' : 'download'}
            </span>
            <span>{type === 'sync' ? 'Calendar Synchronization' : 'Export Academic Report'}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {type === 'sync' ? (
          <div className="space-y-4 py-2">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-primary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[30px]">event_repeat</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Sync Timetable with External Calendars</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Keep Google Calendar, Apple iCal, or Outlook in sync with your live class & exam schedule.
              </p>
            </div>

            {synced ? (
              <div className="p-3 bg-tertiary-fixed text-tertiary rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Successfully synced with Google Calendar!</span>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCalendarSync}
                  className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                  <span>Sync Google Calendar</span>
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="w-full py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all"
                >
                  Download .iCal Calendar Feed
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-secondary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[30px]">summarize</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Academic Performance Overview</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Download a clean report with 24.5h focus time, 80% assignment completion, and syllabus exam readiness.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadReport}
                className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Download CSV Data File</span>
              </button>
              <button
                onClick={() => {
                  window.print();
                  onClose();
                }}
                className="w-full py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all"
              >
                Print / Save as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
