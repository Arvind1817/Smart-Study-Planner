import React, { useState } from 'react';
import { Assignment } from '../types';

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAssignment: (assignment: Assignment) => void;
}

export const NewAssignmentModal: React.FC<NewAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAddAssignment,
}) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS 330');
  const [dueDateText, setDueDateText] = useState('Due Friday, 11:59 PM');
  const [priority, setPriority] = useState<'High Priority' | 'Medium' | 'In Progress' | 'Not Started'>('High Priority');
  const [gradePercent, setGradePercent] = useState('15');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>(['Review problem constraints', 'Draft preliminary solution']);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, subtaskInput.trim()]);
      setSubtaskInput('');
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      title: title.trim(),
      course,
      priorityLabel: priority,
      priorityType: priority === 'High Priority' ? 'urgent' : priority === 'Medium' ? 'medium' : 'progress',
      dueDateText,
      dueCategory: 'dueSoon',
      gradePercent: Number(gradePercent) || 10,
      subtasks: subtasks.map((st, i) => ({
        id: `st-new-${Date.now()}-${i}`,
        text: st,
        done: false,
      })),
      attachments: [{ name: 'assignment_brief.pdf', type: 'pdf' }],
      timeBadge: 'Due Soon',
      footerTimeLabel: 'Just added',
      isUrgent: priority === 'High Priority',
      isReminderActive: true,
      completed: false,
    };

    onAddAssignment(newAsg);
    setTitle('');
    setSubtasks([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-surface border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">add_task</span>
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">+ New Assignment</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto flex-1">
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Graph Traversal Lab"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="CS 330">CS 330</option>
                <option value="MATH 240">MATH 240</option>
                <option value="PHYS 102">PHYS 102</option>
                <option value="ENG 105">ENG 105</option>
                <option value="CS 240">CS 240</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="High Priority">High Priority</option>
                <option value="Medium">Medium</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Due Date & Time
              </label>
              <input
                type="text"
                value={dueDateText}
                onChange={(e) => setDueDateText(e.target.value)}
                placeholder="Due Sunday, 11:59 PM"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Final Grade %
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={gradePercent}
                onChange={(e) => setGradePercent(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
              Subtasks Checklist
            </label>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                placeholder="Add subtask and press enter..."
                className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-container"
              >
                Add
              </button>
            </div>

            <div className="space-y-1 max-h-24 overflow-y-auto">
              {subtasks.map((st, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-surface-container p-1.5 rounded-lg">
                  <span className="truncate">{st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(i)}
                    className="text-outline hover:text-secondary p-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
