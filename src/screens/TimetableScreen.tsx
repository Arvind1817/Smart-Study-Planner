import React, { useState } from 'react';
import { TimetableClass } from '../types';

interface TimetableScreenProps {
  schedule: Record<string, TimetableClass[]>;
  onOpenAddClass: (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat') => void;
  onOpenSync: () => void;
  onOpenPomodoro: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
}

export const TimetableScreen: React.FC<TimetableScreenProps> = ({
  schedule,
  onOpenAddClass,
  onOpenSync,
  onOpenPomodoro,
  onOpenNotifications,
  unreadNotifsCount,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>('Wed');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'lecture' | 'lab' | 'self-study'>('all');
  const [currentWeek, setCurrentWeek] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const days: { key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'; label: string; date: number; dots?: string[] }[] = [
    { key: 'Mon', label: 'Mon', date: 11, dots: ['bg-outline-variant/50'] },
    { key: 'Tue', label: 'Tue', date: 12, dots: ['bg-outline-variant/50'] },
    { key: 'Wed', label: 'Wed', date: 13, dots: ['bg-secondary-fixed', 'bg-tertiary-fixed'] },
    { key: 'Thu', label: 'Thu', date: 14, dots: ['bg-outline-variant/50'] },
    { key: 'Fri', label: 'Fri', date: 15, dots: ['bg-tertiary'] },
    { key: 'Sat', label: 'Sat', date: 16 },
  ];

  const currentClasses = schedule[selectedDay] || [];

  const filteredClasses = currentClasses.filter((c) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'lecture') return c.type === 'lecture';
    if (categoryFilter === 'lab') return c.type === 'lab';
    if (categoryFilter === 'self-study') return c.type === 'focus' || c.type === 'break';
    return true;
  });

  const lectureCount = currentClasses.filter((c) => c.type === 'lecture' || c.type === 'lab').length;
  const studyBlockCount = currentClasses.filter((c) => c.type === 'focus').length;

  return (
    <div className="flex-1 flex flex-col pb-28">
      {/* TopAppBar */}
      <header className="bg-surface border-b border-outline-variant/30 shadow-xs sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-md mx-auto">
          {/* Leading Icon / Brand identity */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-95 duration-150 text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined">school</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-primary tracking-tight">Class Timetable</h1>
            </div>
          </div>

          {/* Trailing actions: Add Class & Notifications */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenAddClass(selectedDay)}
              type="button"
              className="flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-primary-container active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Class</span>
            </button>
            <button
              onClick={onOpenNotifications}
              type="button"
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
              )}
            </button>
          </div>
        </div>

        {/* Subheader Week View Switcher & Sync Tool */}
        <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/15 max-w-md mx-auto w-full">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentWeek((w) => Math.max(1, w - 1))}
              className="w-6 h-6 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1 text-xs font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
              <span>Nov 11 - Nov 17</span>
              <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary-fixed ml-1">
                Week {currentWeek}
              </span>
            </div>
            <button
              onClick={() => setCurrentWeek((w) => w + 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
          <button
            onClick={onOpenSync}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary px-2 py-1 rounded-lg border border-primary/20 bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">sync</span>
            <span>iCal / Google</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {/* Horizontal Day Selector Pill Bar */}
        <section aria-label="Days of the Week">
          <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
            {days.map((day) => {
              const isSelected = selectedDay === day.key;
              return (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={`flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'min-w-[52px] py-2.5 px-1.5 bg-primary text-white shadow-md shadow-primary/25 scale-105 active:scale-100'
                      : 'min-w-[50px] py-2 px-1 bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container active:scale-95'
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wide ${
                      isSelected ? 'text-primary-fixed' : 'opacity-75'
                    }`}
                  >
                    {day.label}
                  </span>
                  <span className={`text-base mt-0.5 font-extrabold ${isSelected ? 'text-white' : ''}`}>
                    {day.date}
                  </span>
                  <div className="flex gap-0.5 mt-1 h-1.5 items-center">
                    {day.dots ? (
                      day.dots.map((dColor, idx) => (
                        <span key={idx} className={`w-1.5 h-1.5 rounded-full ${dColor}`}></span>
                      ))
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full transparent"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Daily Overview Metrics Banner */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="text-xs font-bold text-on-surface">
                {selectedDay === 'Wed' ? 'Wednesday Plan' : `${selectedDay}day Schedule`}
              </span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary-fixed/80 px-2 py-0.5 rounded-full">
              {selectedDay === 'Wed' ? 'Today' : 'Scheduled'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-outline-variant/20 text-center">
            <div className="bg-surface-container-low rounded-lg py-2 px-1">
              <span className="text-lg font-bold text-primary block">{lectureCount}</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Classes</span>
            </div>
            <div className="bg-surface-container-low rounded-lg py-2 px-1">
              <span className="text-lg font-bold text-tertiary block">{studyBlockCount}</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Study Blocks</span>
            </div>
            <div className="bg-surface-container-low rounded-lg py-2 px-1">
              <span className="text-lg font-bold text-on-surface block">6.0h</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Total Academic</span>
            </div>
          </div>
        </section>

        {/* Category Filter Pills */}
        <section className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex-shrink-0 cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter('lecture')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex-shrink-0 cursor-pointer ${
              categoryFilter === 'lecture'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Lectures Only
          </button>
          <button
            onClick={() => setCategoryFilter('lab')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex-shrink-0 cursor-pointer ${
              categoryFilter === 'lab'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Labs
          </button>
          <button
            onClick={() => setCategoryFilter('self-study')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex-shrink-0 cursor-pointer ${
              categoryFilter === 'self-study'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Self-Study
          </button>
        </section>

        {/* Vertical Timeline / Time Grid Layout */}
        <section className="space-y-3 pt-1">
          {filteredClasses.length === 0 ? (
            <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs text-on-surface-variant">
              No classes or blocks scheduled for this filter.
            </div>
          ) : (
            filteredClasses.map((item) => {
              if (item.type === 'break') {
                return (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="flex flex-col items-end w-14 flex-shrink-0">
                      <span className="text-xs font-semibold text-outline">{item.startTime}</span>
                      <span className="text-[10px] text-outline">{item.endTime}</span>
                    </div>
                    {/* Dashed break block */}
                    <div className="flex-1 bg-surface-container-low/70 border border-dashed border-outline-variant rounded-xl px-3.5 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px]">restaurant</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-on-surface block">{item.title}</span>
                          <span className="text-[10px] text-on-surface-variant">{item.location}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-outline bg-surface px-2 py-0.5 rounded border border-outline-variant/40 font-semibold">
                        1h
                      </span>
                    </div>
                  </div>
                );
              }

              // Color border accents based on type
              const borderLeftClass =
                item.type === 'lecture'
                  ? item.courseTag?.includes('MATH')
                    ? 'border-l-4 border-l-secondary'
                    : 'border-l-4 border-l-primary'
                  : item.type === 'focus'
                  ? 'border-l-4 border-l-primary-container'
                  : 'border-l-4 border-l-tertiary';

              return (
                <div key={item.id} className="flex gap-3">
                  {/* Time indicator column */}
                  <div className="flex flex-col items-end w-14 flex-shrink-0 pt-1">
                    <span className="text-xs font-bold text-on-surface">{item.startTime}</span>
                    <span className="text-[10px] text-on-surface-variant">{item.endTime}</span>
                    <div className="w-0.5 flex-1 bg-outline-variant/30 my-2 rounded-full"></div>
                  </div>

                  {/* Schedule Card */}
                  <div
                    className={`flex-1 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3.5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden ${borderLeftClass}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        {item.courseTag && (
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-md mb-1 font-bold ${
                              item.type === 'focus'
                                ? 'bg-primary-fixed-dim/60 text-on-primary-fixed-variant'
                                : item.type === 'lab'
                                ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                                : item.courseTag.includes('MATH')
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : 'bg-primary-fixed text-on-primary-fixed'
                            }`}
                          >
                            {item.courseTag}
                          </span>
                        )}
                        <h3 className="text-xs font-bold text-on-surface leading-tight">{item.title}</h3>
                      </div>

                      {/* Header trailing icon or alert badge */}
                      <div className="flex items-center gap-1">
                        {item.alertBadge && (
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.alertBadge.type === 'warning'
                                ? 'bg-secondary-fixed text-secondary'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[13px]">
                              {item.alertBadge.type === 'warning' ? 'warning' : 'quiz'}
                            </span>
                            {item.alertBadge.text}
                          </span>
                        )}
                        {item.type === 'focus' ? (
                          <span className="material-symbols-outlined text-primary-container text-[20px]">timer</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                            className="material-symbols-outlined text-outline hover:text-primary cursor-pointer text-[20px]"
                          >
                            more_vert
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Instructor & Location info */}
                    <div className="space-y-1.5 mt-2 text-xs text-on-surface-variant">
                      {item.instructor && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`material-symbols-outlined text-[16px] ${
                              item.type === 'lab'
                                ? 'text-tertiary'
                                : item.courseTag?.includes('MATH')
                                ? 'text-secondary'
                                : 'text-primary'
                            }`}
                          >
                            person
                          </span>
                          <span className="font-semibold text-on-surface">{item.instructor}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">room</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Pomodoro Box if Focus Block */}
                    {item.pomodoro && (
                      <div className="mt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface">
                            <span>Pomodoro Target:</span>
                            <span className="text-primary font-extrabold">{item.pomodoro.targetSessions} Sessions</span>
                            <span className="text-on-surface-variant font-normal">{item.pomodoro.studyTime}</span>
                          </div>
                          <div className="flex gap-1.5 mt-1.5">
                            <span className="w-5 h-2 rounded bg-primary"></span>
                            <span className="w-5 h-2 rounded bg-primary"></span>
                            <span className="w-5 h-2 rounded bg-outline-variant/50"></span>
                          </div>
                        </div>
                        <button
                          onClick={onOpenPomodoro}
                          className="bg-primary text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-primary-container transition-colors active:scale-95 shadow-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                          <span>Start</span>
                        </button>
                      </div>
                    )}

                    {/* Card Footer: Notes attachment or syllabus link */}
                    {item.attachment && (
                      <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-lg text-[10px] text-primary font-bold">
                          <span className="material-symbols-outlined text-[15px]">attach_file</span>
                          <span>{item.attachment.name}</span>
                        </div>
                        <button
                          onClick={() => alert(`Opening ${item.attachment?.name}...`)}
                          className="text-[11px] text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    )}

                    {item.noteFooter && (
                      <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant flex items-center gap-1 text-[11px]">
                          <span className="material-symbols-outlined text-[15px]">edit_note</span>
                          {item.noteFooter.text}
                        </span>
                        <button
                          onClick={() => alert(`Opening course syllabus...`)}
                          className={`font-bold hover:underline flex items-center gap-0.5 cursor-pointer ${
                            item.type === 'lab' ? 'text-tertiary' : 'text-primary'
                          }`}
                        >
                          {item.noteFooter.linkText}
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Quick Add Schedule Floating Cue */}
        <section className="pt-2 pb-6">
          <div className="bg-primary-fixed/40 border border-primary/20 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">event_note</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Free evening slot (6:00 PM+)</p>
                <p className="text-[11px] text-on-surface-variant">Schedule homework or review flashcards</p>
              </div>
            </div>
            <button
              onClick={() => onOpenAddClass(selectedDay)}
              className="text-primary font-bold text-xs bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-surface-container transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              + Plan
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
