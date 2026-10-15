import React, { useState } from 'react';
import { Assignment } from '../types';

interface TasksScreenProps {
  assignments: Assignment[];
  completedAssignments: Assignment[];
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (assignmentId: string, subtaskId: string) => void;
  onToggleReminder: (id: string) => void;
  onOpenNewAssignment: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  assignments,
  completedAssignments,
  onToggleComplete,
  onToggleSubtask,
  onToggleReminder,
  onOpenNewAssignment,
  onOpenNotifications,
  unreadNotifsCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrgencyTab, setSelectedUrgencyTab] = useState<'dueSoon' | 'overdue' | 'completed' | 'all'>('dueSoon');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [showCompletedAccordion, setShowCompletedAccordion] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter calculations
  const dueSoonCount = assignments.filter((a) => a.dueCategory === 'dueSoon' && !a.completed).length;
  const overdueCount = assignments.filter((a) => a.dueCategory === 'overdue' && !a.completed).length;
  const totalCompletedCount = completedAssignments.length + assignments.filter((a) => a.completed).length;

  const courses = ['All', 'CS 330', 'MATH 240', 'PHYS 102', 'ENG 105'];

  const filteredAssignments = assignments.filter((asg) => {
    // Search query filter
    const matchSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.dueDateText.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    // Course pill filter
    if (selectedCourse !== 'All' && asg.course !== selectedCourse) return false;

    // Urgency tab filter
    if (selectedUrgencyTab === 'dueSoon') return asg.dueCategory === 'dueSoon' && !asg.completed;
    if (selectedUrgencyTab === 'overdue') return asg.dueCategory === 'overdue' && !asg.completed;
    if (selectedUrgencyTab === 'completed') return asg.completed;
    return true; // 'all'
  });

  return (
    <div className="flex-1 flex flex-col pb-28">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>
            <div>
              <span className="text-lg font-bold text-primary tracking-tight">StudyFlow</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full ring-2 ring-primary/20 overflow-hidden bg-primary-container text-white flex items-center justify-center font-bold text-xs">
              JS
            </div>
          </div>
        </div>

        {/* Page Headline & Quick Action Bar */}
        <div className="px-4 pb-3 pt-1 flex items-center justify-between max-w-md mx-auto w-full">
          <div>
            <h1 className="text-lg text-on-surface font-bold tracking-tight">Assignments &amp; Tasks</h1>
            <p className="text-xs text-on-surface-variant">{dueSoonCount} assignments due this week</p>
          </div>
          <button
            onClick={onOpenNewAssignment}
            className="flex items-center space-x-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ New Assignment</span>
          </button>
        </div>

        {/* Assignment Search Bar */}
        <div className="px-4 pb-3 max-w-md mx-auto w-full">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments, topics, course codes..."
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-9 pr-8 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            ) : (
              <button
                type="button"
                className="absolute right-2.5 text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            )}
          </div>
        </div>

        {/* Urgency Segmented Tabs */}
        <div className="px-4 pb-2 border-b border-outline-variant/20 max-w-md mx-auto w-full">
          <div className="flex items-center space-x-1 overflow-x-auto custom-scroll-hide py-1">
            <button
              onClick={() => setSelectedUrgencyTab('dueSoon')}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
                selectedUrgencyTab === 'dueSoon'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container font-medium'
              }`}
            >
              <span>Due Soon</span>
              <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedUrgencyTab === 'dueSoon' ? 'bg-white/20' : 'bg-surface-container-highest text-on-surface-variant'
              }`}>
                {dueSoonCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedUrgencyTab('overdue')}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap active:scale-95 transition-all flex items-center space-x-1 cursor-pointer ${
                selectedUrgencyTab === 'overdue'
                  ? 'bg-secondary text-white font-bold shadow-xs'
                  : 'text-secondary bg-secondary-fixed/50 hover:bg-secondary-fixed font-semibold'
              }`}
            >
              <span>Overdue</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-secondary text-white text-[10px] font-bold">
                {overdueCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedUrgencyTab('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap active:scale-95 transition-all flex items-center space-x-1 cursor-pointer ${
                selectedUrgencyTab === 'completed'
                  ? 'bg-tertiary-container text-white font-bold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container font-medium'
              }`}
            >
              <span>Completed</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px]">
                {totalCompletedCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedUrgencyTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                selectedUrgencyTab === 'all'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container font-medium'
              }`}
            >
              <span>All</span>
            </button>
          </div>
        </div>

        {/* Course Filter Horizontal Pills */}
        <div className="px-4 py-2.5 bg-surface-container-low/60 flex items-center space-x-2 overflow-x-auto custom-scroll-hide max-w-md mx-auto w-full">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Course:</span>
          {courses.map((course) => {
            const isSelected = selectedCourse === course;
            return (
              <button
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-on-surface text-white'
                    : 'bg-surface-container-highest/60 text-on-surface-variant border border-outline-variant/40 hover:bg-surface-container-high'
                }`}
              >
                {course}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 px-4 pt-4 space-y-4 max-w-md mx-auto w-full">
        {filteredAssignments.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-xs text-on-surface-variant">
            No assignments match the selected filters.
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const doneSubtasksCount = assignment.subtasks.filter((st) => st.done).length;
            const totalSubtasks = assignment.subtasks.length;
            const progressPercent = totalSubtasks > 0 ? Math.round((doneSubtasksCount / totalSubtasks) * 100) : 0;
            const isDone = assignment.completed;

            return (
              <article
                key={assignment.id}
                className={`bg-surface-container-lowest border rounded-2xl p-4 shadow-xs relative overflow-hidden transition-all hover:border-outline ${
                  assignment.isUrgent
                    ? 'border-secondary-container/40 shadow-[0_2px_12px_-2px_rgba(220,44,79,0.12)] hover:border-secondary-container'
                    : 'border-outline-variant/50'
                }`}
              >
                {/* Urgent Accent Strip */}
                {assignment.isUrgent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
                )}

                {/* Header row */}
                <div className={`flex items-start justify-between gap-2 mb-2.5 ${assignment.isUrgent ? 'pt-1' : ''}`}>
                  <div className="flex items-center space-x-2">
                    {/* Custom Squircle Checkbox Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleComplete(assignment.id)}
                      aria-label={`Mark ${assignment.title} as complete`}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                        isDone
                          ? 'bg-tertiary-container border-tertiary-container text-white'
                          : assignment.isUrgent
                          ? 'border-secondary-container/80 hover:bg-secondary-fixed/30'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      {isDone && (
                        <span
                          className="material-symbols-outlined text-[16px] text-white"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      )}
                    </button>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary-fixed text-primary">
                      {assignment.course}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        assignment.priorityLabel === 'High Priority'
                          ? 'bg-error-container text-error'
                          : assignment.priorityLabel === 'Medium'
                          ? 'bg-surface-container text-on-surface-variant'
                          : assignment.priorityLabel === 'In Progress'
                          ? 'bg-surface-container text-on-surface-variant'
                          : 'bg-surface-container-low text-outline'
                      }`}
                    >
                      {assignment.priorityLabel}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 relative">
                    {/* Reminder toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleReminder(assignment.id)}
                      aria-label="Notification alert toggle"
                      className={`p-0.5 transition-opacity cursor-pointer ${
                        assignment.isReminderActive ? 'text-secondary hover:opacity-80' : 'text-outline hover:text-primary'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[19px]"
                        style={assignment.isReminderActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {assignment.isReminderActive ? 'notifications_active' : 'notifications'}
                      </span>
                    </button>

                    {/* More options menu */}
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === assignment.id ? null : assignment.id)}
                      aria-label="Card menu"
                      className="text-outline hover:text-on-surface p-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[19px]">more_vert</span>
                    </button>

                    {activeMenuId === assignment.id && (
                      <div className="absolute right-0 top-6 z-20 w-36 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-lg p-1 text-xs">
                        <button
                          onClick={() => {
                            onToggleComplete(assignment.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-2 py-1.5 hover:bg-surface-container rounded-lg font-medium"
                        >
                          {isDone ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button
                          onClick={() => {
                            onToggleReminder(assignment.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-2 py-1.5 hover:bg-surface-container rounded-lg font-medium"
                        >
                          {assignment.isReminderActive ? 'Turn off Reminder' : 'Set Reminder'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Task Title */}
                <h2
                  className={`text-sm font-bold tracking-tight mb-2 ${
                    isDone ? 'line-through text-outline' : 'text-on-surface'
                  }`}
                >
                  {assignment.title}
                </h2>

                {/* Urgency Pill & Time Warning */}
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      assignment.isUrgent
                        ? 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold'
                        : assignment.timeBadge === 'Due Tomorrow'
                        ? 'bg-surface-container-high text-on-surface border border-outline-variant/40'
                        : 'bg-surface-container text-on-primary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {assignment.isUrgent ? 'alarm' : assignment.timeBadge === 'Due Tomorrow' ? 'schedule' : 'event'}
                    </span>
                    <span>{assignment.dueDateText}</span>
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {assignment.gradePercent}% of Final Grade
                  </span>
                </div>

                {/* Progress Bar and Subtasks Checklist Indicator */}
                <div className="bg-surface-container-low rounded-xl p-3 mb-3 border border-outline-variant/30">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-on-surface flex items-center space-x-1">
                      <span className="material-symbols-outlined text-tertiary-container text-[16px]">checklist</span>
                      <span>
                        Subtasks ({doneSubtasksCount}/{totalSubtasks} done)
                      </span>
                    </span>
                    <span className="text-primary font-bold">{progressPercent}%</span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary-container h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  {/* Subtasks inline preview / toggles */}
                  {assignment.subtasks.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {assignment.subtasks.slice(0, 3).map((st) => (
                        <div
                          key={st.id}
                          onClick={() => onToggleSubtask(assignment.id, st.id)}
                          className="text-[11px] flex items-center justify-between cursor-pointer hover:bg-surface-container p-1 rounded-md transition-colors"
                        >
                          <span className={`flex items-center gap-1.5 ${st.done ? 'line-through text-outline' : 'text-on-surface'}`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {st.done ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span>{st.text}</span>
                          </span>
                          <span className={`text-[10px] font-bold ${st.done ? 'text-outline' : 'text-secondary-container'}`}>
                            {st.done ? 'Done' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-xs text-on-surface-variant">
                  <div className="flex items-center space-x-3">
                    {assignment.attachments.map((att, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center space-x-1 text-on-surface-variant hover:text-primary cursor-pointer"
                        title={att.name}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {att.type === 'pdf'
                            ? 'picture_as_pdf'
                            : att.type === 'terminal'
                            ? 'terminal'
                            : att.type === 'csv'
                            ? 'insert_drive_file'
                            : 'link'}
                        </span>
                        <span>{att.name}</span>
                      </span>
                    ))}
                  </div>
                  <span className={`font-semibold ${assignment.isUrgent ? 'text-secondary font-bold' : 'text-outline'}`}>
                    {assignment.footerTimeLabel}
                  </span>
                </div>
              </article>
            );
          })
        )}

        {/* Completed Accordion Preview */}
        <section
          onClick={() => setShowCompletedAccordion(!showCompletedAccordion)}
          className="bg-surface-container-low rounded-2xl p-3.5 border border-outline-variant/30 flex flex-col cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-on-surface">Completed Assignments</h3>
                <p className="text-[11px] text-on-surface-variant">{totalCompletedCount} tasks completed this semester</p>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                showCompletedAccordion ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>

          {/* Expanded completed items list */}
          {showCompletedAccordion && (
            <div className="mt-3 pt-3 border-t border-outline-variant/20 space-y-2 text-xs">
              {completedAssignments.map((cmp) => (
                <div key={cmp.id} className="p-2.5 bg-surface-container-lowest rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-on-surface line-through">{cmp.title}</span>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-on-surface-variant">
                      <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed text-tertiary font-bold">{cmp.course}</span>
                      <span>{cmp.dueDateText}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-tertiary">{cmp.timeBadge}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
