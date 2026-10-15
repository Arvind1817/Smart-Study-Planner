import React, { useState } from 'react';
import { TimetableClass } from '../types';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (newClass: TimetableClass) => void;
  selectedDay: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
}

export const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onAddClass,
  selectedDay,
}) => {
  const [title, setTitle] = useState('');
  const [courseTag, setCourseTag] = useState('CS 330 • Lecture');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [instructor, setInstructor] = useState('Prof. Dr. Martinez');
  const [location, setLocation] = useState('Lab 402 (Engineering Block)');
  const [classType, setClassType] = useState<'lecture' | 'lab' | 'break' | 'focus'>('lecture');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newClass: TimetableClass = {
      id: `tt-user-${Date.now()}`,
      day: selectedDay,
      startTime,
      endTime,
      periodLabel: `${startTime} - ${endTime}`,
      courseTag,
      type: classType,
      title: title.trim(),
      instructor: classType !== 'break' ? instructor : undefined,
      location,
      attachment: {
        name: 'Lecture Syllabus & Slides.pdf',
        actionText: 'View',
      },
    };

    onAddClass(newClass);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-surface border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_add_on</span>
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">
              + Add to {selectedDay} Schedule
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto flex-1">
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
              Class / Activity Name
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Computing"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Type
              </label>
              <select
                value={classType}
                onChange={(e) => setClassType(e.target.value as any)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="lecture">Lecture</option>
                <option value="lab">Lab & Lecture</option>
                <option value="focus">Focus Block</option>
                <option value="break">Recharge Break</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Course Tag
              </label>
              <input
                type="text"
                value={courseTag}
                onChange={(e) => setCourseTag(e.target.value)}
                placeholder="CS 330 • Lecture"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="09:00"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                End Time
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="10:30 AM"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
              Instructor / Organizer
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Prof. Name"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
              Location / Room
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Science Hall 102"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Add to Timetable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
