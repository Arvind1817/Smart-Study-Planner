import React, { useState } from 'react';
import { TabType } from '../types';

interface AnalyticsScreenProps {
  onOpenExport: () => void;
  onOpenStudyPlan: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  onOpenExport,
  onOpenStudyPlan,
  onOpenNotifications,
  unreadNotifsCount,
}) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'semester'>('week');

  // Dynamic stats based on period
  const totalHours = period === 'week' ? '24.5' : period === 'month' ? '98.2' : '312.0';
  const asgRatio = period === 'week' ? '8 / 10' : period === 'month' ? '31 / 34' : '84 / 92';
  const completionRate = period === 'week' ? '80%' : period === 'month' ? '91%' : '91%';
  const pomodoroSessions = period === 'week' ? 32 : period === 'month' ? 128 : 412;
  const focusScore = period === 'week' ? 88 : period === 'month' ? 90 : 89;

  return (
    <div className="flex-1 flex flex-col pb-28">
      {/* Top App Bar Navigation */}
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant/30 shadow-xs w-full">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="flex items-center justify-center p-1 rounded-full hover:bg-surface-container active:scale-95 transition-transform duration-150 text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary">school</span>
            </button>
            <span className="text-lg font-bold text-primary tracking-tight">StudyFlow</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={onOpenExport}
              aria-label="Share Analytics"
              className="p-2 rounded-full hover:bg-surface-container active:scale-95 transition-transform duration-150 text-on-surface-variant cursor-pointer"
              title="Export Report"
              type="button"
            >
              <span className="material-symbols-outlined text-on-surface-variant">ios_share</span>
            </button>
            <button
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="relative p-2 rounded-full hover:bg-surface-container active:scale-95 transition-transform duration-150 text-on-surface-variant cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Screen Container */}
      <main className="max-w-md mx-auto px-4 pt-4 pb-6 space-y-6 w-full">
        {/* Screen Title & Filter Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg text-on-surface font-extrabold tracking-tight">Academic Analytics</h1>
              <p className="text-xs text-on-surface-variant">Track study velocity, focus consistency &amp; milestones</p>
            </div>
            <button
              onClick={onOpenExport}
              type="button"
              className="flex items-center space-x-1 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl hover:bg-surface-container active:scale-95 transition-all text-primary text-xs font-bold shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">download</span>
              <span>Export</span>
            </button>
          </div>

          {/* Period Filter Segmented Control */}
          <div className="flex p-1 bg-surface-container rounded-xl gap-1">
            <button
              onClick={() => setPeriod('week')}
              className={`flex-1 py-1.5 px-3 text-center rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                period === 'week'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`flex-1 py-1.5 px-3 text-center rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                period === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setPeriod('semester')}
              className={`flex-1 py-1.5 px-3 text-center rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                period === 'semester'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Semester
            </button>
          </div>
        </div>

        {/* Top Highlight Cards (Bento Metric Layout) */}
        <section aria-label="Key Performance Indicators" className="grid grid-cols-2 gap-3">
          {/* Total Study Time Card */}
          <div className="col-span-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Time</span>
              <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">timer</span>
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-on-surface leading-tight">
                {totalHours}
                <span className="text-base font-normal text-on-surface-variant ml-0.5">h</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-tertiary font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+12% vs last wk</span>
              </div>
            </div>
          </div>

          {/* Assignments Completed Card */}
          <div className="col-span-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Assignments</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">checklist</span>
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-on-surface leading-tight">
                {asgRatio}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-primary font-bold">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span>{completionRate} completion rate</span>
              </div>
            </div>
          </div>

          {/* Streak Banner Card (Full Width) */}
          <div className="col-span-2 bg-gradient-to-r from-surface-container-lowest to-surface-container-low p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary shadow-xs ring-4 ring-secondary-fixed/40">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface">7 Days Streak</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                    HOT
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">You're in the top 5% of dedicated students this week!</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-on-surface-variant font-medium">Daily Goal</span>
              <span className="text-sm font-bold text-primary">100%</span>
            </div>
          </div>
        </section>

        {/* Weekly Study Hours Chart Section */}
        <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-on-surface">Weekly Study Hours</h2>
              <p className="text-xs text-on-surface-variant">Daily commitment vs. 4h target baseline</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-primary"></span>
              <span className="text-[10px] font-semibold text-on-surface-variant">Hours</span>
              <span className="inline-block w-3 h-0.5 border-t border-dashed border-error"></span>
              <span className="text-[10px] font-semibold text-error">4h Goal</span>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="relative pt-6 pb-2">
            {/* 4h Target Line */}
            <div className="absolute left-0 right-0 top-[40%] flex items-center z-10 pointer-events-none">
              <div className="w-full border-t border-dashed border-error/70"></div>
              <span className="absolute right-0 -top-3 text-[10px] font-bold text-error bg-surface-container-lowest px-1 rounded">
                Target 4h
              </span>
            </div>

            {/* Bar Columns */}
            <div className="grid grid-cols-7 gap-2 items-end h-44 px-1">
              {/* Monday */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-on-surface-variant font-medium">3.2h</span>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[46%] transition-all duration-300 group-hover:opacity-90"></div>
                <span className="text-xs text-on-surface-variant font-semibold">Mon</span>
              </div>
              {/* Tuesday (Peak Highlight) */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-primary">5.4h</span>
                <div className="relative w-full bg-primary-container rounded-t-lg h-[82%] shadow-xs ring-2 ring-primary/20 transition-all duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center text-[11px] text-primary">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">Tue</span>
              </div>
              {/* Wednesday */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-on-surface-variant font-medium">2.8h</span>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[38%] transition-all duration-300 group-hover:opacity-90"></div>
                <span className="text-xs text-on-surface-variant font-semibold">Wed</span>
              </div>
              {/* Thursday */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-on-surface-variant font-medium">3.9h</span>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[55%] transition-all duration-300 group-hover:opacity-90"></div>
                <span className="text-xs text-on-surface-variant font-semibold">Thu</span>
              </div>
              {/* Friday (Peak Highlight) */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-primary">5.8h</span>
                <div className="relative w-full bg-primary-container rounded-t-lg h-[92%] shadow-xs ring-2 ring-primary/20 transition-all duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center text-[11px] text-primary">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">Fri</span>
              </div>
              {/* Saturday */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-on-surface-variant font-medium">2.0h</span>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[28%] transition-all duration-300 group-hover:opacity-90"></div>
                <span className="text-xs text-on-surface-variant font-semibold">Sat</span>
              </div>
              {/* Sunday */}
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-on-surface-variant font-medium">1.4h</span>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[20%] transition-all duration-300 group-hover:opacity-90"></div>
                <span className="text-xs text-on-surface-variant font-semibold">Sun</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <p className="text-xs text-on-surface">
              Peak focus windows registered on <strong className="font-bold text-primary">Tuesday &amp; Friday</strong> afternoon sessions.
            </p>
          </div>
        </section>

        {/* Subject Time Breakdown */}
        <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-on-surface">Subject Time Breakdown</h2>
              <p className="text-xs text-on-surface-variant">Distribution across active courses</p>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-md">
              4 Subjects
            </span>
          </div>

          {/* Segmented Multi-Bar Tracker */}
          <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden flex gap-0.5">
            <div className="bg-primary h-full transition-all" style={{ width: '43%' }} title="Computer Science: 43%"></div>
            <div className="bg-[#7c3aed] h-full transition-all" style={{ width: '28%' }} title="Mathematics: 28%"></div>
            <div className="bg-tertiary-container h-full transition-all" style={{ width: '18%' }} title="Physics: 18%"></div>
            <div className="bg-[#d97706] h-full transition-all" style={{ width: '11%' }} title="Literature: 11%"></div>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            {/* Item 1: CS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-on-surface">Computer Science</span>
                  <div className="text-[11px] text-on-surface-variant">Algorithms &amp; System Architecture</div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-on-surface">10.5 hrs</span>
                <span className="block text-[10px] text-primary font-bold">43%</span>
              </div>
            </div>

            {/* Item 2: Mathematics */}
            <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2.5">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#7c3aed] flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-on-surface">Mathematics</span>
                  <div className="text-[11px] text-on-surface-variant">Linear Algebra &amp; Multivariate Calc</div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-on-surface">7.0 hrs</span>
                <span className="block text-[10px] text-[#7c3aed] font-bold">28%</span>
              </div>
            </div>

            {/* Item 3: Physics */}
            <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2.5">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-tertiary-container flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-on-surface">Physics</span>
                  <div className="text-[11px] text-on-surface-variant">Electromagnetism Lab Series</div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-on-surface">4.5 hrs</span>
                <span className="block text-[10px] text-tertiary font-bold">18%</span>
              </div>
            </div>

            {/* Item 4: Literature */}
            <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2.5">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#d97706] flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-on-surface">Literature</span>
                  <div className="text-[11px] text-on-surface-variant">Critical Essay &amp; Modern Rhetoric</div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-on-surface">2.5 hrs</span>
                <span className="block text-[10px] text-[#d97706] font-bold">11%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Productivity & Pomodoro Metrics */}
        <section aria-label="Productivity Metrics" className="grid grid-cols-2 gap-3">
          {/* Focus Score */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Focus Score</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">psychology</span>
            </div>
            <div className="text-2xl font-extrabold text-on-surface">{focusScore}%</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-tertiary font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Optimal Flow State</span>
            </div>
            <p className="text-on-surface-variant mt-2 text-[11px] leading-tight">
              Calculated via deep work intervals &amp; low distraction signals.
            </p>
          </div>

          {/* Pomodoro Sessions */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Pomodoro</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">pace</span>
            </div>
            <div className="text-2xl font-extrabold text-on-surface">{pomodoroSessions}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-on-surface font-semibold">
              <span>Sessions completed</span>
            </div>
            <p className="text-on-surface-variant mt-2 text-[11px] leading-tight">
              25 min sprints (13.3 hrs total disciplined sprint effort).
            </p>
          </div>
        </section>

        {/* Upcoming Exam Readiness Gauge */}
        <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                <h2 className="text-sm font-bold text-on-surface">Exam Readiness Gauge</h2>
              </div>
              <p className="text-xs text-on-surface-variant">CS Midterm Readiness Evaluation</p>
            </div>
            <span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed/30 border border-tertiary-fixed px-2.5 py-1 rounded-full">
              On Track
            </span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            {/* Circular Progress Meter */}
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-primary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="82, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-sm font-extrabold text-on-surface">82%</span>
              </div>
            </div>

            {/* Topics & Metric Description */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-on-surface font-semibold">
                <span>Syllabus Coverage</span>
                <span className="font-bold text-primary">14 / 17 Topics</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
              <p className="text-on-surface-variant text-[11px]">3 modules remaining before midterm simulation test.</p>
            </div>
          </div>

          {/* Actionable Recommendation Chip */}
          <div
            onClick={onOpenStudyPlan}
            className="mt-2 p-2.5 bg-primary-fixed/40 border border-primary-fixed rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary-fixed/60 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
              <span className="text-xs text-on-primary-fixed">
                Recommendation: <strong>Focus on Graph Traversal next</strong>
              </span>
            </div>
            <button
              type="button"
              aria-label="Start module"
              className="text-primary hover:text-on-primary-fixed-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
