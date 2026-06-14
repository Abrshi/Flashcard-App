"use client";

import React, { useState } from "react";
import AddSubject from "@/components/AddSubject";
import AddQuestion from "@/components/AddQuestion";

function Page() {
  const [activeTab, setActiveTab] = useState("subject");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Flashcard Admin
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage subjects and questions
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8 flex w-fit rounded-3xl border border-border bg-card p-2 shadow-sm">
          <button
            onClick={() => setActiveTab("subject")}
            className={`rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === "subject"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Add Subject
          </button>

          <button
            onClick={() => setActiveTab("question")}
            className={`rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === "question"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Add Question
          </button>
        </div>

        {/* Content */}
        <div className="animate-enter">
          {activeTab === "subject" ? (
            <AddSubject />
          ) : (
            <AddQuestion />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;