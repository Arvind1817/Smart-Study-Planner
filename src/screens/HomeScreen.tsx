import React, { useState, useEffect } from 'react';
import { TabType, Assignment } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenStudyPlan: () => void;
  onOpenPomodoro: () => void;
  onOpenAddTask: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenStudyPlan,
  onOpenPomodoro,
  onOpenAddTask,
  onOpenNotifications,
  unreadNotifsCount,
}) => {
  // Live ticking countdown
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(14);
  const [mins, setMins] = useState(28);

  // Priority tasks state with interactive checkboxes
  const [priorityTasks, setPriorityTasks] = useState([
    {
      id: 'pt-1',
      title: 'AVL Tree Rotation Problem Set',
      due: 'Due in 4h',
      course: 'CS 201',
      details: 'Problems 4.1 – 4.8',
      completed: false,
    },
    {
      id: 'pt-2',
      title: 'Calculus Chapter 7 Quiz Prep',
      due: 'Due Today',
      course: 'MATH 240',
      details: 'Review Vector Integrals',
      completed: false,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMins((prev) => {
        if (prev > 0) return prev - 1;
        setHours((h) => {
          if (h > 0) return h - 1;
          setDays((d) => Math.max(0, d - 1));
          return 23;
        });
        return 59;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id: string) => {
    setPriorityTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const pendingPriorityCount = priorityTasks.filter((t) => !t.completed).length;

  return (
    <div className="flex-1 flex flex-col pb-28">
      {/* TopAppBar Component */}
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant/30 shadow-xs">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">school</span>
            <span className="text-lg font-bold text-primary tracking-tight">StudyFlow</span>
          </div>
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container active:scale-95 transition-transform duration-150 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
            )}
          </button>
        </div>
      </header>

      {/* Student Greeting & Context Banner */}
      <div className="px-4 pt-4 pb-2 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-on-surface tracking-tight">Good morning, Alex 👋</h1>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-xs text-primary">event</span>
              <span>Fall Term 2024 • Week 8</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-sm shadow-sm ring-2 ring-primary/20">
            AL
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="px-4 flex flex-col gap-5 mt-2 max-w-md mx-auto w-full">
        {/* HERO / TOP URGENT ALERT: Exam Countdown Card */}
        <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-4px_rgba(220,44,79,0.12)] ring-1 ring-secondary/20">
          {/* Subtle accent gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-container to-primary"></div>
          <div className="p-4 pt-5">
            {/* Card Header & Urgency Badge */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed border border-secondary/20">
                <span className="material-symbols-outlined text-xs animate-pulse">alarm</span>
                UPCOMING MIDTERM
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                <span className="material-symbols-outlined text-xs">menu_book</span>
                CS 240
              </span>
            </div>

            {/* Subject Title */}
            <h2 className="text-lg font-bold text-on-surface leading-tight">
              Data Structures &amp; Algorithms
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">Midterm Comprehensive Exam</p>

            {/* Countdown Counter Modules */}
            <div className="my-4 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg w-12 py-1.5 border border-outline-variant/20 shadow-xs">
                  <span className="text-2xl text-secondary font-extrabold leading-none">
                    {String(days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase mt-1 font-semibold">
                    Days
                  </span>
                </div>
                <span className="text-xl text-secondary font-bold">:</span>
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg w-12 py-1.5 border border-outline-variant/20 shadow-xs">
                  <span className="text-2xl text-secondary font-extrabold leading-none">
                    {String(hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase mt-1 font-semibold">
                    Hours
                  </span>
                </div>
                <span className="text-xl text-secondary font-bold">:</span>
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg w-12 py-1.5 border border-outline-variant/20 shadow-xs">
                  <span className="text-2xl text-on-surface font-extrabold leading-none">
                    {String(mins).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase mt-1 font-semibold">
                    Mins
                  </span>
                </div>
              </div>

              {/* Readiness Indicator */}
              <div className="text-right">
                <span className="text-[11px] text-on-surface-variant block font-medium">Prep Readiness</span>
                <span className="text-sm font-bold text-tertiary">78% Ready</span>
                <div className="w-16 h-1.5 bg-outline-variant/30 rounded-full mt-1 overflow-hidden">
                  <div className="w-[78%] h-full bg-tertiary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Metadata: Date & Venue */}
            <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant mb-4 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
                <span className="truncate">Thu, Nov 14 @ 09:00 AM</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                <span className="truncate">Science Hall 204</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenStudyPlan}
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <span>View Study Plan &amp; Review Deck</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* QUICK ACTION TILES (Bento 3-Column Grid) */}
        <section className="grid grid-cols-3 gap-2.5">
          <button
            onClick={onOpenAddTask}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:bg-surface-container active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-xl">add_task</span>
            </div>
            <span className="text-xs font-semibold text-on-surface text-center">+ Add Task</span>
          </button>
          <button
            onClick={onOpenPomodoro}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:bg-surface-container active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-xl">timer</span>
            </div>
            <span className="text-xs font-semibold text-on-surface text-center">Pomodoro</span>
          </button>
          <button
            onClick={onOpenNotifications}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:bg-surface-container active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-xl">notifications_active</span>
            </div>
            <span className="text-xs font-semibold text-on-surface text-center">Reminder</span>
          </button>
        </section>

        {/* NEXT CLASS QUICK GLANCE */}
        <section
          onClick={() => onNavigateTab('timetable')}
          className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-4 shadow-xs cursor-pointer hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              <span className="text-xs font-bold text-on-surface-variant">NEXT CLASS UP</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20">
              Starts in 45 min
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Calculus III</h3>
              <p className="text-xs text-on-surface-variant">Prof. Vance • Rm 302 (Math Annex)</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-primary block">11:30 AM</span>
              <span className="text-[11px] text-on-surface-variant">50 Min Lecture</span>
            </div>
          </div>
        </section>

        {/* TODAY'S STUDY SCHEDULE SNIPPET */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-on-surface">Today's Schedule</h3>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer"
            >
              Full Timetable
            </button>
          </div>
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 divide-y divide-outline-variant/20 shadow-xs">
            {/* Item 1 */}
            <div
              onClick={() => onNavigateTab('timetable')}
              className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
            >
              <div className="flex flex-col items-center justify-center min-w-[62px] py-1 px-1.5 rounded-lg bg-surface-container-high text-on-surface">
                <span className="text-xs font-bold">11:30</span>
                <span className="text-[10px] text-on-surface-variant">AM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-on-surface truncate">Calculus III Lecture</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed">
                    MATH 240
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs">location_on</span> Rm 302 • Attendance required
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div
              onClick={() => onNavigateTab('timetable')}
              className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
            >
              <div className="flex flex-col items-center justify-center min-w-[62px] py-1 px-1.5 rounded-lg bg-surface-container text-on-surface">
                <span className="text-xs font-bold">02:00</span>
                <span className="text-[10px] text-on-surface-variant">PM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-on-surface truncate">Library Group Study</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                    Focus
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs">group</span> Main Library • Pod 4B with Maya &amp; Leo
                </p>
              </div>
            </div>
            {/* Item 3 */}
            <div
              onClick={() => onNavigateTab('timetable')}
              className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
            >
              <div className="flex flex-col items-center justify-center min-w-[62px] py-1 px-1.5 rounded-lg bg-surface-container text-on-surface">
                <span className="text-xs font-bold">04:30</span>
                <span className="text-[10px] text-on-surface-variant">PM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-on-surface truncate">AI Assignment Prep</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                    Solo
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs">laptop_mac</span> Student Union Quiet Floor
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRIORITY TASKS DUE TODAY */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-on-surface">Priority Tasks</h3>
              <span className="w-5 h-5 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center font-bold">
                {pendingPriorityCount}
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {priorityTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-start gap-3 shadow-xs transition-colors hover:border-primary/40"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.title} complete`}
                  className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                    task.completed
                      ? 'bg-tertiary-container border-tertiary-container text-white'
                      : 'border-outline hover:border-primary text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">check</span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-semibold text-on-surface ${
                        task.completed ? 'line-through text-outline' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold shrink-0">
                      {task.due}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-primary-fixed text-on-primary-fixed font-bold">
                      {task.course}
                    </span>
                    <span className="text-xs text-on-surface-variant">{task.details}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
