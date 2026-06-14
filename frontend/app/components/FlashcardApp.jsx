"use client";

import { useState } from "react";

const flashcards = [
  {
    question: "What is photosynthesis?",
    answer: "The process where plants make food using sunlight.",
    category: "Biology",
  },
  {
    question: "What is Newton's First Law?",
    answer:
      "An object stays at rest or in motion unless acted upon by a force.",
    category: "Physics",
  },
  {
    question: "What is H2O?",
    answer: "The chemical formula for water.",
    category: "Chemistry",
  },
];

export default function FlashcardApp() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[current];

  const nextCard = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setFlipped(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      {/* Counter */}
      <div className="mb-6 text-sm text-muted-foreground">
        {current + 1} of {flashcards.length}
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative h-72 w-full max-w-md cursor-pointer perspective-1400"
      >
        <div
          className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-border bg-card p-6 shadow-sm [backface-visibility:hidden] animate-enter">
            {/* Category */}
            <span className="absolute left-4 top-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {card.category}
            </span>

            <h2 className="text-center text-lg font-semibold">
              {card.question}
            </h2>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-border bg-card p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <span className="absolute left-4 top-4 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
              Answer
            </span>

            <p className="text-center text-base text-muted-foreground">
              {card.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex w-full max-w-md justify-between">
        <button
          onClick={prevCard}
          disabled={current === 0}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={nextCard}
          disabled={current === flashcards.length - 1}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}