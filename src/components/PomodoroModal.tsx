import React, { useState, useEffect } from 'react';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete?: () => void;
}

export const PomodoroModal: React.FC<PomodoroModalProps> = ({
  isOpen,
  onClose,
  onSessionComplete,
}) => {
  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedToday, setCompletedToday] = useState(4);

  const getModeDuration = (m: 'study' | 'shortBreak' | 'longBreak') => {
    if (m === 'study') return 25 * 60;
    if (m === 'shortBreak') return 5 * 60;
    return 15 * 60;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'study') {
        setCompletedToday((prev) => prev + 1);
        if (onSessionComplete) onSessionComplete();
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsLeft, mode, onSessionComplete]);

  if (!isOpen) return null;

  const totalTime = getModeDuration(mode);
  const progressPercent = Math.round(((totalTime - secondsLeft) / totalTime) * 100);

  const switchMode = (newMode: 'study' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setSecondsLeft(getModeDuration(newMode));
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden p-5 flex flex-col text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">timer</span>
            <span>Pomodoro Focus Sprint</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-surface-container rounded-xl p-1 mb-6 text-xs font-semibold">
          <button
            onClick={() => switchMode('study')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'study'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Study (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'shortBreak'
                ? 'bg-tertiary-container text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'longBreak'
                ? 'bg-secondary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Circular Dial / Digital Display */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-2">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-surface-container"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`transition-all duration-300 ${
                mode === 'study'
                  ? 'text-primary'
                  : mode === 'shortBreak'
                  ? 'text-tertiary'
                  : 'text-secondary'
              }`}
              strokeWidth="6"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progressPercent) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold tracking-tight text-on-surface font-mono">
              {formattedTime}
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant mt-1 uppercase tracking-wider">
              {isRunning ? (mode === 'study' ? 'Deep Focus' : 'Recharging') : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(getModeDuration(mode));
            }}
            title="Reset Timer"
            className="w-11 h-11 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 h-12 rounded-xl text-white font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all ${
              isRunning
                ? 'bg-secondary-container hover:bg-secondary'
                : 'bg-primary hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>

        {/* Daily Stats Pill */}
        <div className="mt-6 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <span>Today's Sessions</span>
          <span className="font-bold text-primary">{completedToday} Sprints Completed (1.7 hrs)</span>
        </div>
      </div>
    </div>
  );
};
