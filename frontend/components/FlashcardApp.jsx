"use client";

import { useEffect, useState } from "react";
import { axiosbaseurl } from "../axios/axios";

export default function FlashcardApp() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch Subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axiosbaseurl.get("/user/getsubjects");

        const subjectsData = Array.isArray(res.data)
          ? res.data
          : res.data.subjects || [];

        setSubjects(subjectsData);

        if (subjectsData.length > 0) {
          setSelectedSubject(
            subjectsData[0].subject_id || subjectsData[0].id
          );
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch Questions
  useEffect(() => {
    if (!selectedSubject) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const response = await axiosbaseurl.get(
          `/user/getquestion?subject_id=${selectedSubject}`
        );

        const questionsData = Array.isArray(response.data)
          ? response.data
          : response.data.questions || [];

        setFlashcards(questionsData);
        setCurrent(0);
        setFlipped(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedSubject]);

  const nextCard = () => {
    if (current < flashcards.length - 1) {
      setCurrent((prev) => prev + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setFlipped(false);
    }
  };

  const card = flashcards[current] || {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-sm lg:hidden"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <h2 className="text-lg font-bold">Subjects</h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition hover:bg-sidebar-accent lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Subject List */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto p-3">
          <div className="space-y-2">
            {subjects.length === 0 ? (
              <div className="py-6 text-center text-muted-foreground">
                No subjects found
              </div>
            ) : (
              subjects.map((subject) => {
                const id = subject.subject_id || subject.id;

                return (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedSubject(id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                      selectedSubject === id
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent"
                    }`}
                  >
                    {subject.name || subject.subject_name}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:ml-72">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
          {loading ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
              Loading...
            </div>
          ) : flashcards.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                No Questions Found
              </h2>
              <p className="text-muted-foreground">
                This subject doesn't have any flashcards yet.
              </p>
            </div>
          ) : (
            <>
              {/* Counter */}
              <div className="mb-6 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
                <span className="text-sm font-medium">
                  {current + 1} / {flashcards.length}
                </span>
              </div>

              {/* Flashcard */}
              <div
                onClick={() => setFlipped((prev) => !prev)}
                className="perspective-1400 relative h-[320px] w-full max-w-3xl cursor-pointer"
              >
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    flipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front */}
                  <div className="animate-enter absolute inset-0 flex flex-col justify-center rounded-4xl border border-border bg-card p-8 shadow-sm [backface-visibility:hidden]">
                    <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Question
                    </span>

                    <h2 className="text-center text-xl font-semibold md:text-2xl">
                      {card.question}
                    </h2>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                      Click the card to reveal the answer
                    </p>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 flex flex-col justify-center rounded-4xl border border-border bg-card p-8 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Answer
                    </span>

                    <p className="text-center text-lg leading-relaxed md:text-xl">
                      {card.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex w-full max-w-3xl items-center justify-between gap-4">
                <button
                  onClick={prevCard}
                  disabled={current === 0}
                  className="rounded-xl border border-border bg-card px-6 py-3 font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={() => setFlipped((prev) => !prev)}
                  className="rounded-xl bg-secondary px-6 py-3 font-medium text-secondary-foreground transition hover:opacity-90"
                >
                  {flipped ? "Show Question" : "Show Answer"}
                </button>

                <button
                  onClick={nextCard}
                  disabled={current === flashcards.length - 1}
                  className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}