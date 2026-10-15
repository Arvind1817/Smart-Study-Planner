import React, { useState } from 'react';
import { examFlashcards } from '../mockData';

interface StudyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyPlanModal: React.FC<StudyPlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cards, setCards] = useState(examFlashcards);
  const [activeTab, setActiveTab] = useState<'deck' | 'roadmap'>('deck');

  if (!isOpen) return null;

  const currentCard = cards[currentCardIndex];

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const toggleMastery = () => {
    setCards((prev) =>
      prev.map((c, i) =>
        i === currentCardIndex ? { ...c, mastered: !c.mastered } : c
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-primary-container text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary-fixed">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>CS 240 • MIDTERM PREP</span>
            </div>
            <h2 className="text-base font-bold mt-0.5">Data Structures & Algorithms</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-outline-variant/20 bg-surface">
          <button
            onClick={() => setActiveTab('deck')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'deck'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Review Flashcard Deck ({currentCardIndex + 1}/{cards.length})
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'roadmap'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Study Plan & Topics (14/17)
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 overflow-y-auto flex-1">
          {activeTab === 'deck' ? (
            <div className="space-y-4">
              {/* Flashcard container */}
              <div
                onClick={() => setShowAnswer(!showAnswer)}
                className={`min-h-[200px] p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs select-none ${
                  showAnswer
                    ? 'bg-primary-fixed/20 border-primary/40'
                    : 'bg-surface-container-low border-outline-variant/40 hover:border-primary/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant mb-3">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">
                      {currentCard.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        currentCard.mastered
                          ? 'bg-tertiary-fixed text-tertiary font-bold'
                          : 'bg-surface-container-highest text-outline'
                      }`}
                    >
                      {currentCard.mastered ? '✓ Mastered' : 'Needs Review'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-on-surface leading-snug">
                    {currentCard.question}
                  </p>
                </div>

                {showAnswer ? (
                  <div className="mt-4 pt-3 border-t border-primary/20 text-xs text-on-surface bg-white/60 p-3 rounded-xl">
                    <strong className="block text-primary mb-1">Answer:</strong>
                    {currentCard.answer}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-center text-xs text-primary font-semibold">
                    <span className="material-symbols-outlined text-[16px] mr-1">touch_app</span>
                    Tap to reveal explanation
                  </div>
                )}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handlePrevCard}
                  className="px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-semibold text-on-surface hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  <span>Previous</span>
                </button>
                <button
                  onClick={toggleMastery}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold active:scale-95 transition-all flex items-center gap-1 ${
                    currentCard.mastered
                      ? 'bg-tertiary/10 border-tertiary/30 text-tertiary'
                      : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {currentCard.mastered ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span>{currentCard.mastered ? 'Mastered' : 'Mark Mastered'}</span>
                </button>
                <button
                  onClick={handleNextCard}
                  className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>Next</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-on-surface block">Overall Exam Readiness</span>
                  <span className="text-[11px] text-on-surface-variant">Exam is on Thu, Nov 14 in Science Hall 204</span>
                </div>
                <span className="text-base font-extrabold text-tertiary">78%</span>
              </div>

              <div className="divide-y divide-outline-variant/15 text-xs">
                {[
                  { topic: 'Binary Search Trees & Traversal', status: 'done' },
                  { topic: 'AVL Tree Self-Balancing Rotations', status: 'done' },
                  { topic: 'Red-Black Tree Properties & Invariants', status: 'done' },
                  { topic: 'B-Trees & Multiway Disk Indexing', status: 'done' },
                  { topic: 'Heap Data Structures & Priority Queues', status: 'done' },
                  { topic: 'Dijkstra & Prim Algorithm Correctness', status: 'done' },
                  { topic: 'Graph Traversal: BFS / DFS & Cycle Detection', status: 'pending' },
                  { topic: 'Bellman-Ford & Negative Weight Cycles', status: 'pending' },
                  { topic: 'Dynamic Programming: Knapsack & Edit Distance', status: 'pending' },
                ].map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className={`font-medium ${item.status === 'done' ? 'text-on-surface' : 'text-secondary font-semibold'}`}>
                      {item.topic}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'done'
                          ? 'bg-tertiary-fixed text-tertiary'
                          : 'bg-secondary-fixed text-secondary'
                      }`}
                    >
                      {item.status === 'done' ? 'Mastered' : 'Priority Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
