"use client";

import { useEffect, useState } from "react";
import { axiosbaseurl } from "../axios/axios";

export default function AddQuestion() {
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    subject_id: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axiosbaseurl.get("/admin/subjects");

      if (Array.isArray(res.data)) {
        setSubjects(res.data);
      } else if (Array.isArray(res.data.subjects)) {
        setSubjects(res.data.subjects);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Fetch Subjects Error:", error);
      setSubjects([]);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.question.trim() ||
      !formData.answer.trim() ||
      !formData.subject_id
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosbaseurl.post("/admin/addquestion", {
        question: formData.question,
        answer: formData.answer,
        subject_id: Number(formData.subject_id),
      });

      alert(res.data.message || "Question added successfully 🎉");

      setFormData({
        question: "",
        answer: "",
        subject_id: "",
      });
    } catch (error) {
      console.error("Add Question Error:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-[28px] border border-border bg-card/70 p-8 shadow-xl backdrop-blur-xl animate-enter">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Add Question
        </h2>
        <p className="mt-2 text-muted-foreground">
          Add knowledge to your flashcard galaxy 🚀
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Select Subject
          </label>

          <select
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="">Choose subject</option>

            {subjects.map((subject) => (
              <option
                key={subject.subject_id}
                value={subject.subject_id}
              >
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Question
          </label>

          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={4}
            placeholder="Write the question..."
            required
            disabled={loading}
            className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Answer
          </label>

          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={4}
            placeholder="Write the answer..."
            required
            disabled={loading}
            className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Question"}
        </button>
      </form>
    </div>
  );
}